import store from "../store.js";
import { changeItemStatus } from "./changeItemStatus.js";

const URL =
  "https://svelte-to-do-app-fec8f-default-rtdb.europe-west1.firebasedatabase.app/";

export async function getAllItems() {
  const items = await fetch(URL + "todos.json", {
    headers: {
      Accept: "application/json",
    },
  });
  if (items.ok) {
    const res = await items.json();
    return res;
  } else return "Something went wrong. Please try again.";
}

export async function addItemToDatabase(toDoText) {
  const addedItem = await fetch(URL + "todos.json", {
    method: "POST",
    body: JSON.stringify({ text: toDoText, status: "todo" }),
    headers: {
      Accept: "application/json",
    },
  });
  if (addedItem.ok) {
    const res = await addedItem.json();
    return res;
  } else return "Something went wrong. Please try again.";
}

export async function removeItemFromDatabase(id) {
  const removedItem = await fetch(URL + `/todos/${id}.json`, {
    method: "DELETE",
  });
  if (removedItem.ok) return removedItem;
  else throw new Error("Something went wrong. Please try again.");
}

export async function updateTodoStatus(id, arrowType) {
  let currentItem;
  const unsubscribe = store.subscribe((items) => {
    currentItem = items.find((item) => item.id === id);
  });
  unsubscribe();
  const newStatus = changeItemStatus(currentItem, arrowType);

  const updatedItem = await fetch(URL + `/todos/${id}.json`, {
    method: "PATCH",
    body: JSON.stringify({ ...currentItem, status: newStatus }),
    headers: {
      Accept: "application/json",
    },
  });

  if (updatedItem.ok) {
    const res = await updatedItem.json();
    return res;
  } else throw new Error("Something went wrong. Please try again.");
}
