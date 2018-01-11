import { environment } from '../environments/environment';

// Application Config
export class ApplicationConfig
{
	static get baseUrl(): string
	{
		return environment.remoteUrl;
	}
}