import { toBaseName } from "@automatedtf/catalog";
import { getBackpackFromAPI } from "./adapter";
import { ItemInstance, CItemInstance } from './ItemInstance';
import * as CustomError from "custom-error-instance";

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
        return Object.values(this.items).filter(item => toBaseName(item.sku) == itemName);
    }

    getInstancesBySKU(sku: string): ItemInstance[] {
        return Object.values(this.items).filter(item => item.sku == sku);
    }

    ownsItem(assetid: string): boolean {
        return (this.getItemByAssetId(assetid) != null);
    }
}

export const PrivateBackpackError = CustomError("PrivateBackpackError", { message: "This backpack is private." });
export const InvalidSteamIdError = CustomError("InvalidSteamIdError", { message: "Invalid steamid given." });

export async function getTF2Backpack(steamid): Promise<Backpack> {
    try {
        let contents = await getBackpackFromAPI(steamid, 440);
        return Promise.resolve(new Backpack(contents));
    } catch (error) {
        if (error.response.status == 403) {
            throw new PrivateBackpackError();
        } else if (error.response.status == 404) {
            throw new InvalidSteamIdError();
        } else {
            throw error;
        }
    }
}