<style>
.card-component {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-bottom: 0.5em;
  align-items: center;
}

.card-text {
  width: 70%;
  margin: 0 auto;
  background-color: white;
  padding: 0.5em 0;
  text-align: center;
  font-size: 0.9rem;
  letter-spacing: 1px;
  border: 1px solid black;
  box-shadow: 0px 0px 6px 1px black;
}
</style>

<script>
import { scale } from "svelte/transition";

import store from "../store";
import {
  removeItemFromDatabase,
  updateTodoStatus,
} from "../utils/httpRequests";

export let text;
export let status;
export let id;

async function removeItem(id) {
  try {
    await removeItemFromDatabase(id);
    store.removeItem(id);
  } catch (err) {
    alert("Something went wrong, please try again.");
  }
}

async function updateItem(id, arrowType) {
  try {
    await updateTodoStatus(id, arrowType);
    store.updateTodoStatus(id, arrowType);
  } catch (err) {
    alert("Something went wrong, please try again.");
  }
}
</script>

<div class="card-component" transition:scale>
  {#if status === "todo"}
    <div class="trashCan" on:click="{() => removeItem(id)}"></div>
  {/if}
  {#if status === "in-progress" || status === "completed"}
    <div class="leftCircle" on:click="{() => updateItem(id, 'left')}"></div>
  {/if}
  <p class="card-text">{text}</p>
  {#if status === "completed"}
    <div class="trashCan" on:click="{() => removeItem(id)}"></div>
  {/if}
  {#if status === "in-progress" || status === "todo"}
    <div class="rightCircle" on:click="{() => updateItem(id, 'right')}"></div>
  {/if}
</div>
