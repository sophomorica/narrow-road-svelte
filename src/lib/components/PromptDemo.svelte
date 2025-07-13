<script>
  import { fade } from 'svelte/transition';
  let showModal = false;
  let prompt = 'Describe a family adventure teaching sacrifice...';
  let userInput = '';
  let response = '';
  function generate() { response = `Your tale inspires! Like in our journals, it teaches ${userInput.slice(0,20)}...`; }
</script>

<button on:click={() => showModal=true} class="...">Try a Prompt!</button>
{#if showModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center" transition:fade>
    <div class="bg-white p-8 rounded-xl">
      <p>{prompt}</p>
      <textarea bind:value={userInput} class="w-full h-32"></textarea>
      <button on:click={generate}>Create Magic</button>
      {#if response}<p class="mt-4 text-emerald-700">{response}</p>{/if}
      <button on:click={() => showModal=false}>Close</button>
    </div>
  </div>
{/if}