export interface IFollowCount
{
	follower_count: number;
	following_count: number;
};

export interface IFollower
{
	follower: string;
	following: string;
	what: string[];
};