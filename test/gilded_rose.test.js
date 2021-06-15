const {
  Shop,
  Item,

  updateQualityProperty,
  updateSellInPure,
  updateQualityPure,
  updateItemConjured,
  updateAgedBrie,
  updateBackStage,
  updateDefaultItem,

  isItemConjured,
  isItemQualityOutOfBounds,
  isItem

} = require("../src/gilded_rose");

const {
  SULFURAS,
  BACKSTAGE,
  BRIE,
  CONJURED
} = require('../src/const')

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });
  it("should decrease quality by one", function () {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });
  it("should decrease quality by 2", function () {
    const gildedRose = new Shop([new Item("Conjured", 1, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });
  it("should increase quality by one", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(3);
  });

  it("should set to new quality", function () {
    const item = new Item("foo", 1, 13);
    const newItem = updateQualityProperty(item, 14)
    expect(newItem.quality).toEqual(14);
  });

  it("should top to maximum", function () {
    const item = new Item("foo", 1, 50);
    const newItem = updateQualityProperty(item, 52)
    expect(newItem.quality).toEqual(50);
  });

  it("should update items sellIn", function () {
    const items = [new Item("foo", 1, 50)];
    const newItem = updateSellInPure(items)
    expect(newItem[0].sellIn).toEqual(0);
  });

  it("should update items quality", function () {
    const items = [new Item("foo", 1, 28)];
    const newItem = updateQualityPure(items)
    expect(newItem[0].quality).toEqual(27);
  });

  it("should update item conjured quality", function () {
    const item = new Item("foo", 1, 28);
    const newItem = updateItemConjured(item)
    expect(newItem.quality).toEqual(26);
  });

  it("should update item Aged Brie", function () {
    const item = new Item("foo", 1, 28);
    const newItem = updateAgedBrie(item)
    expect(newItem.quality).toEqual(29);
  });

  it("should update item Backstage more than 10 days", function () {
    const item = new Item("foo", 11, 28);
    const newItem = updateBackStage(item)
    expect(newItem.quality).toEqual(29);
  });

  it("should update item Backstage more than 5 days", function () {
    const item = new Item("foo", 6, 28);
    const newItem = updateBackStage(item)
    expect(newItem.quality).toEqual(30);
  });

  it("should update item Backstage more than 0 days", function () {
    const item = new Item("foo", 1, 28);
    const newItem = updateBackStage(item)
    expect(newItem.quality).toEqual(31);
  });

  it("should update default item ", function () {
    const item = new Item("foo", 1, 28);
    const newItem = updateDefaultItem(item)
    expect(newItem.quality).toEqual(27);
  });

  it("shouldn't detect conjured ", function () {
    const item = new Item("foo", 1, 28);
    const is = isItemConjured(item)
    expect(is).toEqual(false);
  });

  it("should detect conjured ", function () {
    const item = new Item(CONJURED + ', something something', 1, 28);
    const is = isItemConjured(item)
    expect(is).toEqual(true);
  });

  it("should detect out of bound item minimum ", function () {
    const item = new Item(CONJURED + ', something something', 1, -1);
    const is = isItemQualityOutOfBounds(item)
    expect(is).toEqual(true);
  });

  it("should detect out of bound item maximum ", function () {
    const item = new Item(CONJURED + ', something something', 1, 51);
    const is = isItemQualityOutOfBounds(item)
    expect(is).toEqual(true);
  });

  it("shouldn't detect out of bound item maximum ", function () {
    const item = new Item(CONJURED + ', something something', 1, 28);
    const is = isItemQualityOutOfBounds(item)
    expect(is).toEqual(false);
  });

  it("should detect Sulfuras ", function () {
    const item = new Item(SULFURAS, 1, 28);
    const is = isItem(SULFURAS)(item)
    expect(is).toEqual(true);
  });

  it("shouldn't detect Sulfuras ", function () {
    const item = new Item(BRIE, 1, 28);
    const is = isItem(SULFURAS)(item)
    expect(is).toEqual(false);
  });
});
