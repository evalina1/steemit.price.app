export interface IVote
{
	voter: string;
	weight: number;
	rshares: number;
	percent: number;
	reputation: number;
	time: string;
};

export interface IComment
{

};

export interface IPost
{
	id: number;
    author: string;
    permlink: string;
    category: string;
    parent_author: string;
    parent_permlink: string;
    title: string;
    body: string;
    json_metadata: string;
    last_update: string;
    created: string;
    active: string;
    last_payout: string;
    depth: number;
    children: number;
    net_rshares: number;
    abs_rshares: number;
    vote_rshares: number;
    children_abs_rshares: number;
    cashout_time:  string;
    max_cashout_time:  string;
    total_vote_weight: number;
    reward_weight: number;
    total_payout_value: string;
    curator_payout_value: string;
    author_rewards: number;
    net_votes: number;
    root_comment: number;
    max_accepted_payout:  string;
    percent_steem_dollars: number;
    allow_replies: true,
    allow_votes: true,
    allow_curation_rewards: true,
    beneficiaries: any[],
    url: string;
    root_title:  string;
    pending_payout_value:  string;
    total_pending_payout_value:  string;
    active_votes: IVote[];
    replies: object[],
    author_reputation:  string;
    promoted:  string;
    body_length: number;
    reblogged_by: object[];
};

