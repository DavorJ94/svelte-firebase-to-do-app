export function convertItems(items) {
  let storeItems = [];
  for (let id in items) {
    storeItems.push({ ...items[id], id });
  }

  return storeItems;
}
