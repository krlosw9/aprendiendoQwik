export interface Language {
	name: string;
	url: string;
}

export interface Version {
	name: string;
	url: string;
}

export interface flavorTextEntries {
	flavor_text: string;
	language: Language;
	version: Version;
}