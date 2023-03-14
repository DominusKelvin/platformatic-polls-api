import { Entity } from '@platformatic/sql-mapper';
import graphqlPlugin from '@platformatic/sql-graphql'
import { EntityTypes, Poll,PollOption } from './types'

declare module 'fastify' {
  interface FastifyInstance {
    getSchema<T extends 'Poll' | 'PollOption'>(schemaId: T): {
      '$id': string,
      title: string,
      description: string,
      type: string,
      properties: {
        [x in keyof EntityTypes[T]]: { type: string, nullable?: boolean }
      },
      required: string[]
    };
  }
}

declare module '@platformatic/sql-mapper' {
  interface Entities {
    poll: Entity<Poll>,
    pollOption: Entity<PollOption>,
  }
}
