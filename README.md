# Sherpa ⛰️

### 📖 Table of Contents
- [👋 Introduction](#-introduction)
- [🔌 Getting Started](#-getting-started)
    - [ItemInstance](#iteminstance)
    - [Getting a Backpack](#getting-a-backpack)
        - [getUsedSlots](#getusedslots)
        - [getItemByAssetId](#getitembyassetid)
        - [getInstances](#getinstances)
        - [ownsItem](#ownsitem)
- [📚 Helpful Resources](#-helpful-resources)

## 👋 Introduction

Sherpa provides a simplified representation of a player's *Team Fortress 2* backpack, utilising [`@automatedtf/catalog`](https://github.com/automatedtf/catalog) to fully represent items each as compactly as a single SKU string.

## 🔌 Getting Started
You can install this module with npm within your project by running the command:

```bash
npm install @automatedtf/sherpa
```
### ItemInstance
One of the key types within this module is the `ItemInstance` class. This is a data object of which the class constructor extracts the minimum required fields from `EconItem` to represent an instance of an item.

```typescript
class ItemInstance {
    appid: number; // Game id (440 for TF2, 730 for CS:GO)
    assetid: string; // Steam-given id for possession of item
    instanceid: string; // Internal Steam field for item information caching
    classid: string; // Internal Steam field for item information caching
    icon_url: string; // Image url hash to attach onto CDN link for display purposes
    sku: string; // Item SKU generated from `@automatedtf/catalog`
    ...
}
```

### Getting a Backpack
For interacting with the module, `getTF2Backpack` should be your main entry point. You should query for a user's backpack by using their steamid64.

```typescript
const steamid = "76561198081082634";
...
const backpack = await getTF2Backpack(steamid);
```
After resolving and getting a `Backpack` from `getTF2Backpack`, you will have access to a number of methods.

##### getUsedSlots
```typescript

const totalNumberOfItems: number = backpack.getUsedSlots();
```
Gets the total number of item instances recorded within the user's backpack, even if they have gone over their maximum number of inventory slots.

##### getItemByAssetId
```typescript
const assetidOfItemToFind: string = "837141231";
const item: ItemInstance = backpack.getItemByAssetId(assetidOfItemToFind);
```
Gets the specific item instance with that `assetid`. As `assetid` is unique to every item instance, we can return the specific item saved within the dictionary indexed by `assetid`.

##### getInstances
```typescript
// Warning: Case sensitive!
const nameOfItemsToFind: string = "Scream Fortress XII War Paint Case";
const items: ItemInstance[] = backpack.getInstances(nameOfItemsToFind);
```
Gets all instances with that `itemName`.

##### ownsItem

```typescript
const specialAssetid: string = "837141231";
const ownsSpecialItem: boolean = backpack.ownsItem(specialAssetid);
```

Checks if the user owns an item with that `assetid`.


## 📚 Helpful Resources
- [Getting someone's Steam inventory](https://stackoverflow.com/questions/17393099/getting-someones-steam-inventory)
- [@automatedtf/catalog](https://github.com/automatedtf/catalog)