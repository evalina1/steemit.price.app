import { Injectable } from "@angular/core";
import { Observer, Observable, Subject } from "rxjs";
import {
	IVote,
	IPost,
	IComment,
	IFollowCount,
	IFollower,
	IOperation,
	IOperationResult
} from "./Steem";
import * as steem from "steem";


@Injectable()
export class SteemService
{
	wif: null;
	lastVote: number = Date.now();
	lastComment: number = Date.now();
	lastPost: number = Date.now();
	username: string;

	constructor()
	{
	}

	setUsername(username: string)
	{
		this.username = username;
	}

	comment(author:string, permalink:string, respondTo: string, message:string): Promise<IOperationResult>
	{
		if(this.lastComment > Date.now() - (20*1000))
			return Promise.reject("You can only comment every 20 seconds");
		this.lastComment = Date.now();
		return new Promise((resolve, reject) => {
		
			steem.broadcast.comment(
				// WIF
				this.wif,
				// parentAuthor
				author, // none for a new post
				// parentPermlink or main category
				permalink,
				// 'steem-dev',
				// author
				this.username,
				// permlink
				respondTo ? respondTo : steem.formatter.commentPermlink(author, permalink),
				// title
				"",
				// body
				message,
				// json_metadata
				JSON.stringify({}),

				(error, result) => {
					if(error)
					{
						return reject(error);
					}
					resolve(result);
				}
			);
		});
	}

	post(title:string, message:string, tags:string[] = []): Promise<IOperationResult>
	{
		if(this.lastPost > Date.now() - (5*60*1000))
			return Promise.reject("You can only post every 20 seconds");
		this.lastPost = Date.now();

		if(!tags.length)
			return Promise.reject("No tags specified");

		return new Promise((resolve, reject) => {
		
			steem.broadcast.comment(
				this.wif,
				"",
				tags[0],
				this.username,
				new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase() + '-post',
				title,
				message,
				JSON.stringify({
					"tags": tags,
					"app":"steemit/0.1"
				}),

				(error, result) => {
					if(error)
					{
						return reject(error);
					}
					resolve(result);
				}
			);
		})
	}

	upvote(author: string, permlink: string, weight: number = 1): Promise<IOperationResult>
	{
		if(this.lastVote > Date.now() - (3*1000))
			return Promise.reject("You can only vote every 3 seconds");
		this.lastVote = Date.now();
		
		return steem.broadcast.voteAsync(
			this.wif,
			this.username,
			author,
			permlink,
			weight,
		);
	}
	
	getFollowers(user: string, start: number = 0, limit: number = 100): Promise<IFollower[]>
	{
		return new Promise((resolve, reject) => {
			steem.api.getFollowers(user, start, 'blog', limit, (error, result) => {
				if(error)
				{
					return reject( error );
				}
				resolve(result);
			});
		});
		
	}

	getFollowCount(account: string): Promise<IFollowCount>
	{
		return new Promise((resolve, reject) => {
			steem.api.getFollowCount(account, (error, result) =>
			{
				if(error)
				{
					return reject( error );
				}
				resolve(result);
			});
		})
	}
	

	getFollowing(user:string, start: number=0, limit: number=100): Promise<IFollower[]>
	{
		return new Promise((resolve, reject) => {
			steem.api.getFollowing(user, start, 'blog', limit, (error, result) => {
				if(error)
				{
					return reject( error );
				}
				resolve(result);
			});
		});
	}

	getDiscussions(author:string, before: Date = new Date()): Promise<IPost[]>
	{
		var dateString = before.toJSON().substr(0, 19);
		return new Promise((resolve, reject) => {
			steem.api.getDiscussionsByAuthorBeforeDate(author, null, dateString, 100, function(err, result)
			{
				if(err)
				{
					return reject(err);
				}
				resolve(result);
			});
		});
	}

	getPostRewards(author: string): Promise<number>
	{
		return this.getDiscussions(author, new Date()).then( discussions => {
			let totalRewards: number = 0;
			for(let discussion of discussions)
			{
				let postReward = (parseFloat(discussion.pending_payout_value.substring(0, 4) )) + parseFloat(discussion.total_payout_value.substring(0, 4));
				totalRewards += postReward;
			}
			return totalRewards;
		});
	}

	getPendingPostRewards(author: string)
	{
		return this.getDiscussions(author, new Date()).then( discussions => {
			let totalRewards: number = 0;
			for(let discussion of discussions)
			{
				totalRewards += (parseFloat(discussion.pending_payout_value.substring(0, 4) ));
			}
			return totalRewards;
		});
	}

	getPost(author: string, permlink: string): Promise<IPost>
	{
		return steem.api.getContentAsync(author, permlink);
	}

	getComments(author: string, permlink: string): Promise<IComment>
	{
		return new Promise((resolve, reject) => {
			steem.api.getContentReplies(author, permlink, function(err, result) {
					console.log(err, result);
			});
		});
	}

	followAuthor(author: string): Promise<IOperationResult>
	{
		return new Promise((resolve, reject) => {
			steem.broadcast.customJson(
				this.wif,
				[],
				[this.username],
				'follow',
				JSON.stringify(
					['follow', {
						follower: this.username,
						following: author,
						what: ['blog']
					}]
				),
				(error, result) => {
					if(error)
					{
						return reject( error );
					}
					resolve(result);
			});
		});
	}

	unfollowAuthor(author: string): Promise<IOperationResult>
	{
		return new Promise((resolve, reject) => {
			steem.broadcast.customJson(
				this.wif,
				[],
				[this.username],
				'follow',
				JSON.stringify(
					['follow', {
						follower: this.username,
						following: author,
						what: []
					}]
				),
				(error, result) => {
					if(error)
					{
						return reject( error );
					}
					resolve(result);
			});
		});
	}

	OpStreamSubject: Subject<IOperation> = null;
	streamOperations(filtercb?: ( op: IOperation ) => boolean): Observable<IOperation>
	{
		if(!this.OpStreamSubject)
		{
			this.OpStreamSubject = new Subject<IOperation>();
			steem.api.streamOperations((err, result) =>
			{
				if(err)
				{
					this.OpStreamSubject.error(err);
					return;
				}
				let op = { type: result[0], content: result[1] };
				if(filtercb && !filtercb(op))
				{
					return;
				}
				this.OpStreamSubject.next(op);
			});
		}
		return this.OpStreamSubject.asObservable();
	}
};