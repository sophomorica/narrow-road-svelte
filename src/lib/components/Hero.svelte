<script>
  import { fade } from 'svelte/transition';
  import PaywallButton from '$lib/components/PaywallButton.svelte';
</script>

<section
  class="relative h-screen bg-cover bg-center"
  style="background-image: url('/images/hero-bg.jpg')"
>
  <div
    class="absolute inset-0 bg-stone-100/95 flex flex-col items-center justify-center p-8"
    transition:fade={{ duration: 1000 }}
  >
    <h1 class="text-6xl font-bold mb-4 text-emerald-800 border-b-4 border-orange-500 pb-2">
      Enter the World of Narrow Road Books
    </h1>
    <p class="text-xl mb-6 text-stone-700">Where fox wisdom and forest tales intertwine</p>
    <PaywallButton text="Explore the Collection" page="/books" />
  </div>
</section>