export interface IOperation
{
	type: string;
	content: any;
};

export interface IOperationResult
{
	id: string;
	block_num: number;
	trx_num: number;
	expired: boolean;
	ref_block_num: number;
	ref_block_prefix: number;
	expiration: string;
	operations: any[];
	extensions: any[];
	signatures: string[];
};