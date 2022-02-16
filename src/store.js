import { writable } from "svelte/store";

import { changeItemStatus } from "./utils/changeItemStatus.js";
import { convertItems } from "./utils/convertItems.js";

const todoList = writable([]);

const store = {
  subscribe: todoList.subscribe,
  addItem: (item) => {
    todoList.update((items) => {
      return [...items, { ...item, status: "todo" }];
    });
  },
  removeItem: (id) => {
    todoList.update((items) => {
      return items.filter((item) => {
        return item.id !== id;
      });
    });
  },
  updateTodoStatus: (id, arrowType) => {
    todoList.update((items) => {
      const item = items.find((item) => item.id === id);
      const newStatus = changeItemStatus(item, arrowType);
      const updatedItems = items.map((item) => {
        if (item.id === id) {
          return { ...item, status: newStatus };
        } else return item;
      });
      return updatedItems;
    });
  },
  addItems: (items) => {
    const storeItems = convertItems(items);
    todoList.set(storeItems);
  },
};

export default store;
