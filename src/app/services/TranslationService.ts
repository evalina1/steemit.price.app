import { Injectable } from '@angular/core';

@Injectable()
export class TranslationService
{
	currentLanguage: string = "enUS";
	get language(): string
	{
		return this.currentLanguage;
	}

	langaugeConfigurations: {[key:string]: any} = {};
	constructor()
	{
	}

	setLanguage(language: string)
	{
		this.currentLanguage = language;
	}
	
	addLanguageConfig(langaugeName: string, languageConfiguration: any)
	{
		this.langaugeConfigurations[langaugeName] = languageConfiguration;
	}

	getPhrase(phrase: string): string
	{
		return this.langaugeConfigurations[this.currentLanguage][phrase];
	}
}
