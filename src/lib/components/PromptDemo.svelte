<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { gsap } from 'gsap';
  import { TextPlugin } from 'gsap/TextPlugin';
  import { SplitText } from 'gsap/SplitText';
  import { browser } from '$app/environment';
  
  gsap.registerPlugin(TextPlugin, SplitText);
  let showModal = false;
  let prompt = 'Describe a family adventure teaching sacrifice...';
  let userInput = '';
  let responseElem;
  let response = '';
  let introRef;
  
  function generate() {
    response = `Your tale inspires! Like in our journals, it teaches ${userInput.slice(0,20)}...`;
    if (browser && responseElem) {
      gsap.to(responseElem, { duration: response.length * 0.075, text: response, ease: 'none' }); // Slow typing
    }
  }
  
  function closeModal(e) { 
    if (e.key === 'Escape') showModal = false; 
  }
  
  onMount(() => {
    if (browser) {
      window.addEventListener('keydown', closeModal);
      // Animate the intro text
      if (introRef) {
        const split = new SplitText(introRef, { type: 'words' });
        gsap.from(split.words, { duration: 1.5, opacity: 0, rotation: 180, stagger: 0.05, ease: 'back.out' }); // Swirl
      }
    }
  });
  
  onDestroy(() => {
    if (browser) {
      window.removeEventListener('keydown', closeModal);
    }
  });
</script>

<p bind:this={introRef} class="text-center max-w-2xl mx-auto mb-12 text-lg text-stone-700">
  Within these pages, you are invited to embark on a journey that transcends time—a sacred conversation between your thoughts, Jane Austen's timeless wisdom, and the eternal truths of the Holy Bible...
</p>

<button on:click={() => showModal=true} class="px-6 py-3 bg-emerald-600 text-white rounded-full mx-auto block mt-8">Try a Free Prompt!</button>
{#if showModal}
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    transition:fade
    on:click|self={() => showModal=false}
    tabindex="0"
    role="button"
    aria-label="Close modal"
    on:keydown|self={(e) => { if (e.key === 'Enter' || e.key === ' ') { showModal = false; } }}
  >
    <div class="bg-white p-8 rounded-xl max-w-lg w-full relative">
      <button on:click={() => showModal=false} class="absolute top-2 right-2 text-gray-500" aria-label="Close">×</button>
      <label for="prompt-input" class="block text-sm font-medium mb-2">Your Response to: {prompt}</label>
      <textarea id="prompt-input" bind:value={userInput} class="w-full h-32 p-4 border-2 border-orange-300 rounded-lg focus:ring-orange-500" placeholder="Write here..."></textarea>
      <button on:click={generate} class="mt-4 px-6 py-2 bg-orange-600 text-white rounded-full w-full">Generate Magic</button>
      {#if response}
        <div class="mt-4 relative">
          <div class="h-2 bg-orange-200 rounded-full">
            <div class="h-full bg-orange-600 rounded-full" style="width: {(response.length / response.length) * 100}%"></div> <!-- Progress -->
          </div>
          <p bind:this={responseElem} class="text-stone-700"></p>
        </div>
      {/if}
    </div>
  </div>
{/if}