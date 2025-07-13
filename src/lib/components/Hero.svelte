<script>
  import { fade, slide } from 'svelte/transition';
  import { onMount } from 'svelte';
  import PaywallButton from '$lib/components/PaywallButton.svelte';
  let audio; // For ambient sound
  onMount(() => { audio = new Audio('/sounds/forest.mp3'); }); // Add sound to static/
</script>

<section class="relative h-screen bg-cover bg-center" style="background-image: url('/images/hero-bg.jpg')">
  <div class="absolute inset-0 bg-stone-100/95 flex flex-col items-center justify-center p-8" transition:fade={{ duration: 1000 }}>
    <img src="/images/fox-logo.svg" alt="Fox Guide" class="w-32 mb-4 animate-walk" transition:slide={{ duration: 800 }} /> <!-- Add CSS: @keyframes walk { ... } -->
    <h1 class="text-6xl font-bold mb-4 text-emerald-800 border-b-4 border-orange-500 pb-2">
      Enter the World of Narrow Road Books
    </h1>
    <p class="text-xl mb-6 text-stone-700" transition:fade={{ delay: 500 }}>Where fox wisdom and forest tales teach love, diligence, and family bonds</p>
    <PaywallButton text="Start Your Journey" page="/books" on:mouseenter={() => audio.play()} />
  </div>
</section>

<style>
  .animate-walk { animation: walk 2s ease-in-out; }
  @keyframes walk { 0% { transform: translateX(-50px); } 100% { transform: translateX(0); } }
</style>