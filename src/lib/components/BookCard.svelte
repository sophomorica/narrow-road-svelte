<script>
  import { scale } from 'svelte/transition';
  import PaywallButton from './PaywallButton.svelte';
  export let title;
  export let cover;
  export let slug;
  export let delay = 0;
</script>

<div
  class="rounded-2xl overflow-hidden shadow-2xl bg-stone-50 text-stone-800 hover:shadow-orange-600/50 border-2 border-orange-200"
  transition:scale={{ duration: 300, delay }}
  style="transition: transform 0.2s;"
  on:mouseenter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
  on:mouseleave={(e) => e.currentTarget.style.transform = 'scale(1)'}
  role="region"
>
  <img src={cover} alt={title} class="w-full h-64 object-cover" />
  <div class="p-6">
    <h3 class="text-2xl font-semibold mb-4 text-emerald-800">{title}</h3>
    <PaywallButton text="Read Now" page={`/checkout?book=${slug}`} />
  </div>
</div>