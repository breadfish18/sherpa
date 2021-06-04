export interface BackpackItem {
    appid: number;
    classid: string;
    instanceid: string;
    assetid: string;
    contextid: string;
    tradable: number;
    marketable: number;

    icon_url: string;
    descriptions: {
        value: string,
        color?: string,
        type?: string
    }[];
    actions: {
        link: string,
        name: string
    }[];

    name: string;
    market_hash_name: string;
    name_color: string;
    type: string;
    background_color: string;

    commodity: number;
    market_tradable_restriction: number;
    market_marketable_restriction: number;

    tags: {
        category: string;
        internal_name: string;
        localized_category_name: string;
        localized_tag_name: string;
        color?: string;
    }[];

    [others: string]: any;
}