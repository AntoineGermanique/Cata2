const {
  SULFURAS,
  BACKSTAGE,
  BRIE,
  CONJURED,
  MAX_QUALITY_VALUE,
  MIN_QUALITY_VALUE
} = require('./const');

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items = updateSellInPure(this.items);
    this.items = updateQualityPure(this.items);
    return this.items;
  }
}
const updateSellInPure = (items) =>
  items.map(item => isItemSulfuras(item)
    ? item
    : ({ ...item, ...{ sellIn: --item.sellIn } }));

const updateQualityPure = (items) =>
  items.map(item => {
    if (isItemQualityOutOfBounds(item)) {
      return item;
    }
    if (isItemAgedBrie(item)) {
      return updateAgedBrie(item);
    }
    if (isItemBackstage(item)) {
      return updateBackStage(item);
    }
    if (isItemSulfuras(item)) {
      return item;
    }
    if (isItemConjured(item)) {
      return updateItemConjured(item);
    }
    return updateDefaultItem(item);
  })

const isItemQualityOutOfBounds = (item) => !(item.quality >= MIN_QUALITY_VALUE && item.quality <= MAX_QUALITY_VALUE);
const isItemAgedBrie = (item) => item.name === BRIE;
const updateAgedBrie = (item) => updateQualityProperty(item, ++item.quality);
const isItemBackstage = (item) => item.name === BACKSTAGE;
const updateBackStage = (item) => {
  if (item.sellIn > 10) {
    return updateQualityProperty(item, ++item.quality);
  }
  if (item.sellIn > 5) {
    return updateQualityProperty(item, item.quality + 2);
  }
  if (item.sellIn > 0) {
    return updateQualityProperty(item, item.quality + 3);
  }
  return updateQualityProperty(item, 0);
}
const isItemSulfuras = (item) => item.name === SULFURAS;
const isItemConjured = (item) => item.name.includes(CONJURED);
const updateItemConjured = (item) => updateQualityProperty(item, item.quality - 2);
const updateDefaultItem = (item) => item.sellIn > 0
  ? updateQualityProperty(item, item.quality - 1)
  : updateQualityProperty(item, item.quality - 2);

const updateQualityProperty = (item, quality) => {
  let newQuality = quality;
  if (quality > MAX_QUALITY_VALUE) {
    newQuality = MAX_QUALITY_VALUE;
  }
  if (quality < MIN_QUALITY_VALUE) {
    newQuality = MIN_QUALITY_VALUE;
  }
  return ({ ...item, ...{ quality: newQuality } })
};

module.exports = {
  Item,
  Shop,
  updateQualityProperty,
  updateDefaultItem,
  updateItemConjured,
  updateBackStage,
  updateAgedBrie,
  updateQualityPure,
  updateSellInPure,
  isItemAgedBrie,
  isItemBackstage,
  isItemConjured,
  isItemQualityOutOfBounds,
  isItemSulfuras
}
