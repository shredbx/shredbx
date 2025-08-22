export interface MetadataConfig {
    title: string;
    description: string;
    baseUrl: string;
    siteName: string;
}
export declare function generateMetadata(config: MetadataConfig): {
    title: string;
    description: string;
    openGraph: {
        title: string;
        description: string;
        url: string;
        siteName: string;
        type: string;
        images: {
            url: string;
            width: number;
            height: number;
            alt: string;
        }[];
    };
    twitter: {
        card: string;
        title: string;
        description: string;
        images: string[];
    };
};
export declare const OG_IMAGE_CONFIG: {
    alt: string;
    size: {
        width: number;
        height: number;
    };
    contentType: "image/png";
    runtime: "edge";
};
export declare function generateOpenGraphImage(config: MetadataConfig): {
    alt: string;
    size: {
        width: number;
        height: number;
    };
    contentType: "image/png";
    runtime: "edge";
};
//# sourceMappingURL=metadata.d.ts.map