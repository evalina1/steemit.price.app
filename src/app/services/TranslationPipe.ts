import { Pipe, PipeTransform } from '@angular/core';

import { TranslationService } from "./TranslationService";

@Pipe({name: 'translate'})
export class TranslationPipe implements PipeTransform
{
	constructor(public translate: TranslationService)
	{
	}

	transform(value: string, exponent: string): string
	{
		let phrase = this.translate.getPhrase(value);
		if(!phrase)
		{
			return value;
		}
		return phrase;
	}
}