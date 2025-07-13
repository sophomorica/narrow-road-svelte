<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { gsap } from 'gsap';
  
  let showModal = $state(false);
  let userInput = $state('');
  let response = $state('');
  let currentPrompt = $state('');
  
  const prompts = [
    "What would Jane say about finding courage in uncertainty?",
    "How does love manifest in the small, everyday moments of your life?",
    "What sacrifices have shaped your character, dear reader?",
    "If pride were a garden, what would you need to prune today?",
    "What prejudices have you overcome on your journey of growth?",
    "How do you show compassion when your heart feels guarded?",
    "What does true friendship mean in times of trial?",
    "How has patience been your teacher in life's delays?",
    "What wisdom would you pass to someone facing your past struggles?"
  ];
  
  function getRandomPrompt() {
    return prompts[Math.floor(Math.random() * prompts.length)];
  }
  
  function openModal() {
    currentPrompt = getRandomPrompt();
    showModal = true;
  }
  
  function generate() {
    const responses = [
      "Your words echo Austen's elegance—explore more in the journal!",
      "Such thoughtful reflection! Jane would admire your introspection.",
      "Your insights mirror the wisdom found in our devotional pages.",
      "Beautiful! This is exactly the kind of reflection our journal inspires.",
      "Your heart's honesty shines through—continue this journey with us.",
      "Profound thoughts! You're ready for deeper exploration in our journal.",
      "Your words carry the spirit of timeless wisdom—keep writing!",
      "This reflection captures the essence of what our prompts unlock."
    ];
    response = responses[Math.floor(Math.random() * responses.length)];
  }
  
  onMount(() => {
    if (showModal) {
      gsap.from('.prompt-text', { 
        duration: 1.5, 
        opacity: 0, 
        x: -50, 
        rotation: -180, 
        stagger: 0.1,
        ease: 'back.out(1.7)'
      });
    }
  });
  
  // Trigger animation when modal opens
  $effect(() => {
    if (showModal) {
      setTimeout(() => {
        gsap.from('.prompt-text', { 
          duration: 1.5, 
          opacity: 0, 
          x: -50, 
          rotation: -180, 
          stagger: 0.1,
          ease: 'back.out(1.7)'
        });
      }, 100);
    }
  });
</script>

<button 
  onclick={openModal} 
  class="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-medium transition-colors shadow-lg hover:shadow-orange-500/25"
>
  Begin Your Reflection
</button>

{#if showModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" transition:fade>
    <div class="bg-white p-8 rounded-xl max-w-lg w-full mx-4 shadow-2xl">
      <div class="text-center mb-6">
        <h3 class="text-2xl font-semibold mb-2 text-emerald-800">Dear Reader,</h3>
        <div class="prompt-text text-lg text-stone-600 italic leading-relaxed">
          {currentPrompt}
        </div>
      </div>
      
      <div class="mb-6">
        <textarea 
          bind:value={userInput} 
          placeholder="Share your heartfelt thoughts here..."
          class="w-full h-32 p-4 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none text-stone-700 leading-relaxed"
        ></textarea>
      </div>
      
      <div class="flex gap-4 mb-4">
        <button 
          onclick={generate}
          disabled={!userInput.trim()}
          class="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
        >
          Share Your Reflection
        </button>
        <button 
          onclick={() => {showModal = false; response = ''; userInput = '';}}
          class="px-6 py-3 bg-stone-300 hover:bg-stone-400 text-stone-700 rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
      
      {#if response}
        <div class="p-4 bg-gradient-to-r from-emerald-50 to-orange-50 border-l-4 border-emerald-500 rounded-lg">
          <p class="text-emerald-700 font-medium text-center italic">
            {response}
          </p>
          <div class="mt-3 text-center">
            <button 
              onclick={() => {currentPrompt = getRandomPrompt(); response = ''; userInput = '';}}
              class="text-orange-600 hover:text-orange-700 font-medium text-sm underline"
            >
              Try Another Prompt
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}