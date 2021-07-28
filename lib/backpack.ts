import { toBaseName } from "@automatedtf/catalog";
import { getBackpackFromAPI } from "./adapter";
import { ItemInstance, CItemInstance } from './ItemInstance';

export class Backpack {
    total_inventory_count: number;
    items: {
        [assetid: string]: ItemInstance
    };

    constructor({ assets, descriptions, total_inventory_count }) {
        if (assets == null) assets = [];
        if (descriptions == null) descriptions = [];

        let itemDesc = {};
        descriptions.map(desc => { itemDesc[desc.classid] = desc; });

        this.total_inventory_count = total_inventory_count;
        this.items = {};

        assets.map(asset => {
            this.items[asset.assetid] = new CItemInstance({ ...asset, ...(itemDesc[asset.classid]) }).toItemInstance();
        });
    }

    getUsedSlots(): number {
        return this.total_inventory_count;
    }

    getItemByAssetId(assetid: string): ItemInstance {
        return this.items[assetid];
    }

    getInstances(itemName: string): ItemInstance[] {
        let instances: ItemInstance[] = [];
        for (let assetid in this.items) {
            let item = this.items[assetid];
            if (toBaseName(item.sku) == itemName) instances.push(item);
        }
        return instances;
    }

    ownsItem(assetid: string): boolean {
        return (this.getItemByAssetId(assetid) != null);
    }
}

export async function getTF2Backpack(steamid): Promise<Backpack> {
    let contents = await getBackpackFromAPI(steamid, 440);
    return Promise.resolve(new Backpack(contents));
}