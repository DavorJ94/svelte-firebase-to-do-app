<style>
.column {
  width: 30%;
  max-width: 300px;
  min-height: 500px;
  background-color: brown;
  border: 2px solid black;
  box-shadow: 1px 3px 10px 3px black;
}

.column-title {
  text-align: center;
  margin-top: 0.5rem;
  font-size: 1.4em;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  text-shadow: 1px 0px 2px white, -1px 0px 2px white, 0px 1px 2px white,
    0px -1px 2px white;
}

.cards-container {
  margin-top: 1em;
}
</style>

<script context="module">
const titles = {
  todo: "To do",
  "in-progress": "In progress",
  completed: "Completed",
};
</script>

<script>
import { onMount, onDestroy } from "svelte";
import { scale, fly } from "svelte/transition";
import { quintInOut } from "svelte/easing";

import store from "../store";

import Card from "./Card.svelte";

export let type;

let items = [];
let unsubscribe;
let title = "";
let backgroundStyle;

onMount(() => {
  unsubscribe = store.subscribe((storeItems) => (items = storeItems));
});

onDestroy(() => {
  unsubscribe();
});

$: if (type) {
  title = titles[type];
  backgroundStyle =
    title === "To do" ? "brown" : title === "In progress" ? "orange" : "green";
}

const animate = (node, args) => {
  const flyArguments = {
    x: title === "To do" ? -100 : title !== "In progress" && 100,
    y: 0,
    duration: 1000,
    easing: quintInOut,
  };
  const scaleArguments = {
    duration: 1000,
    easing: quintInOut,
  };
  return args.cond ? fly(node, flyArguments) : scale(node, scaleArguments);
};
</script>

<div
  class="column"
  style="{`background-color: ${backgroundStyle};`}"
  transition:animate="{{ cond: title !== 'In progress' }}">
  <div class="column-title">{title}</div>
  <hr />
  <div class="cards-container">
    {#each items as card (card.id)}
      {#if type === card.status}
        <Card text="{card.text}" id="{card.id}" status="{card.status}" />
      {/if}
    {/each}
  </div>
</div>
