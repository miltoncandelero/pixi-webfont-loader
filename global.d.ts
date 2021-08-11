declare namespace GlobalMixins {
	interface IResourceMetadata {
		font?: {
			family? :string;
			display?: string;
			featureSettings?: string;
			stretch?: string;
			style?: string;
			unicodeRange?: string;
			variant?: string;
			weight?: string;
			testString?:string,
			timeout?:number;
		}
	}
	interface LoaderResource {
		styles: Partial<import('@pixi/text').ITextStyle>[]
	}
}
