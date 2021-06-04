import { toFullSKU, EconItem } from '@automatedtf/catalog';

export class ItemInstance {
    
    appid: number;
    assetid: string;
    instanceid: string;
    classid: string;

    icon_url: string;
    sku: string;
    
    constructor(econItem: EconItem) {
        this.appid = econItem.appid;
        this.assetid = econItem.assetid;
        this.instanceid = econItem.instanceid;
        this.classid = econItem.classid;

        this.icon_url = econItem.icon_url;
        this.sku = toFullSKU(econItem);
    }
}