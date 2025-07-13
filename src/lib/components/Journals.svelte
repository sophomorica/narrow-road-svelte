<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { TextPlugin, SplitText } from 'gsap/all'; // For word splitting
  import { inview } from 'svelte-inview';
  import { typewriter } from '$lib/transitions/typewriter.js';
  import journalsData from '$lib/data/journals.json';
  import PaywallButton from '$lib/components/PaywallButton.svelte';
  import PromptDemo from '$lib/components/PromptDemo.svelte';

  gsap.registerPlugin(TextPlugin, SplitText);
  
  let published = journalsData.filter(j => j.published);
  let upcoming = journalsData.filter(j => !j.published);
  let email = '';
  let textRef;
  let isInView = false;
  
  onMount(() => {
    const split = new SplitText(textRef, { type: 'words' });
    gsap.from(split.words, { duration: 1, opacity: 0, rotation: 360, stagger: 0.05, ease: 'back.out' }); // Swirl in
  });
  
  function handleNotify(event) {
    event.preventDefault();
    // TODO: API integration
    alert(`Thanks! We'll notify you at ${email} when it's live.`);
    email = '';
  }
</script>

<section class="py-20 bg-stone-100">
  <div class="container mx-auto px-6">
    <h2 class="text-4xl font-bold mb-10 text-center text-emerald-800 border-b-2 border-orange-500 pb-4 inline-block w-full">Prompt Journals</h2>
    
    <p bind:this={textRef} class="text-center text-lg text-stone-600 mb-12 max-w-3xl mx-auto italic">
      Within these pages, you are invited to embark on a journey... May your words find their place among the great conversations of the ages.
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each published as j}
        <div class="rounded-2xl overflow-hidden shadow-lg bg-stone-50 border-2 border-orange-200">
          <img src={j.cover} alt={j.title} class="w-full h-80 object-contain bg-white" />
          <div class="p-6">
            <h3 class="text-2xl font-semibold mb-4">{j.title}</h3>
            {#if j.slug === 'creative-morning-pages'}
              <a href="https://www.amazon.com/Verses-Jane-Austen-Creative-Journal/dp/B0FCMZSWQG/ref=cm_cr_arp_d_product_top?ie=UTF8" target="_blank" rel="noopener noreferrer">
                <PaywallButton text="Buy on Amazon" page="#" />
              </a>
            {:else}
              <a href={`/journals/${j.slug}`}>
                <PaywallButton text="Read Now" page="#" />
              </a>
            {/if}
          </div>
        </div>
      {/each}
      {#each upcoming as j}
        <div class="rounded-2xl overflow-hidden shadow-lg bg-stone-50 border-2 border-orange-200 flex flex-col items-center justify-center p-6">
          <h3 class="text-2xl font-semibold mb-4 text-emerald-800">{j.title}</h3>
          <p class="mb-4 text-stone-600">Coming {j.eta}</p>
          <form on:submit|preventDefault={handleNotify} class="flex flex-col items-center w-full">
            <input
              type="email"
              placeholder="Your best email"
              bind:value={email}
              required
              class="w-full mb-4 px-4 py-2 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-stone-50"
            />
            <button type="submit" class="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg hover:shadow-orange-500/25 transition-colors">
              Notify Me
            </button>
          </form>
        </div>
      {/each}
    </div>
    
    <!-- Prompt Demo Section -->
    <div class="mt-16 text-center">
      <h3 class="text-2xl font-semibold mb-6 text-emerald-800">Try Your Own Creative Prompt</h3>
      <p class="text-stone-600 mb-8">Experience the magic of prompt-based journaling with our interactive demo!</p>
      <PromptDemo />
    </div>
    
    <!-- Typewriter Effect Section -->
    <div class="mt-20 text-center">
      <div 
        use:inview={{ unobserveOnEnter: true }} 
        on:change={({ detail }) => isInView = detail.inView}
        class="max-w-4xl mx-auto"
      >
        {#if isInView}
          <p 
            transition:typewriter={{ duration: 2000 }}
            class="text-2xl text-emerald-700 font-medium leading-relaxed"
          >
            Discover 50 thoughtfully crafted writing prompts designed to unlock your creativity, explore deep emotions, and guide you on a transformative journey of self-discovery through the power of words.
          </p>
        {/if}
      </div>
    </div>
  </div>
</section>