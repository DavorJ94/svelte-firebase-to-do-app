<style>
.add-todo {
  margin: 1em 0;
  margin-top: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-add-todo,
.input-todo {
  font-family: "Roboto", sans-serif;
  letter-spacing: 1px;
  padding: 0.5em 1em;
  background-color: whitesmoke;
}

.input-todo:focus {
  outline: 1px solid white;
}

.btn-add-todo {
  margin-left: 1em;
  background-color: whitesmoke;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 700;
}

.warning-message {
  color: red;
  text-align: center;
}

.column-container {
  display: flex;
  justify-content: space-around;
  margin-top: 1em;
}
</style>

<script>
import { onMount, onDestroy } from "svelte";
import { scale } from "svelte/transition";
import { quintInOut } from "svelte/easing";

import store from "../store.js";
import { addItemToDatabase, getAllItems } from "../utils/httpRequests.js";

import Column from "../components/Column.svelte";

let toDoText = "";
let warningMessage = "";

onMount(() => {
  document.addEventListener("keydown", handleSubmit);
  getAllDatabaseItems();
});
onDestroy(() => {
  document.removeEventListener("keydown", handleSubmit);
});

async function getAllDatabaseItems() {
  try {
    const items = await getAllItems();
    store.addItems(items);
  } catch (err) {
    warningMessage = "Something went wrong, please try again.";
  }
}

$: if (toDoText) warningMessage = "";

function handleChange(e) {
  toDoText = e.target.value;
}

async function handleSubmit(e) {
  if (toDoText === "") {
    if (e.keyCode === 13 || e.target.getAttribute("data-clicked")) {
      warningMessage = "You cannot add an empty to do item.";
    }
    return;
  }
  if (e.keyCode === 13 || e.target.getAttribute("data-clicked")) {
    let addItem;
    try {
      addItem = await addItemToDatabase(toDoText);
      store.addItem({ text: toDoText, id: addItem.name });
      toDoText = "";
    } catch (err) {
      warningMessage = "Something went wrong, please try again.";
    }
  }
}
</script>

<div class="App">
  <div
    class="add-todo"
    transition:scale="{{ duration: 1000, easing: quintInOut }}">
    <input value="{toDoText}" on:input="{handleChange}" class="input-todo" />
    <button
      class="btn-add-todo"
      data-clicked="{true}"
      on:click="{handleSubmit}">
      Add to do item
    </button>
  </div>
  {#if warningMessage}
    <div class="warning-message">{warningMessage}</div>
  {/if}
  <div class="column-container">
    <Column type="todo" />
    <Column type="in-progress" />
    <Column type="completed" />
  </div>
</div>
