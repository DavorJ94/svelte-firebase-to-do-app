<style>
.logos_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: white;
  margin: 1em auto;
}

.message {
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 1.5rem;
}

.logos {
  width: 100%;
}
</style>

<script>
import { fly } from "svelte/transition";
import { quintInOut } from "svelte/easing";

import Home from "./pages/Home.svelte";
</script>

<main>
  <div
    class="logos_wrapper"
    transition:fly="{{ x: 0, y: -100, duration: 1000, easing: quintInOut }}">
    <h1 class="message">Built with</h1>
    <a href="https://svelte.dev/" target="_blank">
      <img class="logos" src="/assets/svelte_logo.png" alt="Svelte logo" />
    </a>
    <a href="https://svelte.dev/" target="_blank">
      <img class="logos" src="/assets/firebase_logo.png" alt="Firebase logo" />
    </a>
  </div>
  <Home />
</main>
