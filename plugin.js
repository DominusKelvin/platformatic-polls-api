/// <reference path="./global.d.ts" />
'use strict'

/** @param {import('fastify').FastifyInstance} app */
module.exports = async function (app) {
  app.graphql.extendSchema(`
    extend type Mutation {
      savePollWithOptions(poll: PollInput!, pollOptions: [PollOptionInput!]!): Poll
      vote(pollId: ID!, optionId: ID!): Int
    }
  `)

  async function savePollWithOptions(poll, pollOptions) {
    const newPoll = await app.platformatic.entities.poll.save({ input: poll })

    if (newPoll) {
        pollOptions.map(async pollOption => {
        const pollOptionToSave = { pollId: newPoll.id, ...pollOption }
        return await app.platformatic.entities.pollOption.save({ input: pollOptionToSave })
      })
    }
    return newPoll
  }

  async function vote(pollId, optionId) {
    const { db, sql } = app.platformatic
    const result = await db.query(sql`
      UPDATE poll_options SET vote_counts = vote_counts + 1 WHERE id=${optionId} AND poll_id=${pollId} RETURNING vote_counts
    `)
    return result[0]?.vote_counts
  }

  app.graphql.defineResolvers({
    Mutation: {
      savePollWithOptions: async (_, { poll, pollOptions }) => await savePollWithOptions(poll, pollOptions),
      vote: async (_, {pollId, optionId}) => vote(pollId, optionId)
    }
  })


  app.post('/polls/new', async function (request, response) {
    return { poll: await savePollWithOptions(request.body.poll, request.body.pollOptions) }
  })

  app.patch('/polls/:id/vote', async function (request, response) {
    return { voteCounts: await vote(request.params.id, request.body.optionId)}
  })
}
