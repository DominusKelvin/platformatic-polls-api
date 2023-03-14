/**
 * PollOption
 * A PollOption
 */
declare interface PollOption {
    id?: number;
    pollId?: number | null;
    title: string;
    voteCounts?: number | null;
    createdAt?: string | null;
}

export { PollOption };
