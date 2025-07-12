<script>
  import { page } from '$app/stores';
  import journalsData from '$lib/data/journals.json';
  import PaywallButton from '$lib/components/PaywallButton.svelte';

  let journal = journalsData.find(j => j.slug === $page.params.slug);
</script>

{#if journal}
  <section class="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
    <div class="max-w-3xl">
      <h1 class="text-5xl font-bold mb-6">{journal.title}</h1>
      <img src={journal.cover} alt={journal.title} class="w-full mb-6 rounded-2xl shadow-2xl" />
      <p class="mb-6">{journal.description || 'No description available.'}</p>
      <PaywallButton text="Purchase & Read" page={`/checkout?journal={$page.params.slug}`} />
    </div>
  </section>
{:else}
  <div class="p-8 text-center text-white">Journal not found</div>
{/if}