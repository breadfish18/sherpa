import { toFullSKU, EconItem, toBaseSKU } from '@automatedtf/catalog';

export interface ItemInstance {
    appid: number;
    assetid: string;
    instanceid: string;
    classid: string;
    icon_url: string;
    sku: string;
    full_sku: string;
}
export class CItemInstance implements ItemInstance {
    
    appid: number;
    assetid: string;
    instanceid: string;
    classid: string;

    icon_url: string;
    sku: string;
    full_sku: string;
    
    constructor(econItem: EconItem) {
        this.appid = econItem.appid;
        this.assetid = econItem.assetid;
        this.instanceid = econItem.instanceid;
        this.classid = econItem.classid;

        this.icon_url = econItem.icon_url;
        this.sku = toBaseSKU(econItem);
        this.full_sku = toFullSKU(econItem);
    }

    toItemInstance(): ItemInstance {
        return {
            appid: this.appid,
            assetid: this.assetid,
            instanceid: this.instanceid,
            classid: this.classid,
            icon_url: this.icon_url,
            sku: this.sku,
            full_sku: this.full_sku
        };
    }
}