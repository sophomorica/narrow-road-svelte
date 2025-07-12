<script>
  import journalsData from '$lib/data/journals.json';
  import PaywallButton from '$lib/components/PaywallButton.svelte';

  let published = journalsData.filter(j => j.published);
  let upcoming = journalsData.filter(j => !j.published);
  let email = '';
  
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
  </div>
</section>