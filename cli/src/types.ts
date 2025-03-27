export interface Feature {
	name: string;
	description: string;
	enabled: boolean;
	unicode: string;
}

export interface FeatureState {
	[key: string]: boolean;
}

export interface SymlinkOperation {
	source: string;
	target: string;
	enabled: boolean;
}
