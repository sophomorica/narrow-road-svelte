<script>
  import { fade } from 'svelte/transition';
  let stories = []; // Fetch from DB later
  let newStory = { name: '', tale: '' };
  function submit() {
    stories = [...stories, { ...newStory, likes: 0 }];
    newStory = { name: '', tale: '' }; // Reset
  }
</script>

<section class="py-20 bg-stone-50 min-h-screen">
  <div class="container mx-auto px-6">
    <h2 class="text-4xl font-bold mb-10 text-center text-emerald-800 border-b-2 border-orange-500 pb-4">Campfire Shares: Your Family Tales</h2>
    <p class="text-center mb-8 text-stone-700">Share how our fables inspired love, hard work, or honesty in your home!</p>
    
    <!-- Submission Form -->
    <form on:submit|preventDefault={submit} class="max-w-md mx-auto mb-12 p-6 bg-white rounded-2xl shadow-lg">
      <input bind:value={newStory.name} placeholder="Your Name" required class="w-full mb-4 p-2 border-2 border-orange-300 rounded" />
      <textarea bind:value={newStory.tale} placeholder="Your story..." required class="w-full h-32 p-2 border-2 border-orange-300 rounded" />
      <button type="submit" class="w-full px-6 py-3 bg-orange-600 text-white rounded-full">Share Around the Campfire</button>
    </form>
    
    <!-- Display Stories -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each stories as story}
        <div class="p-6 bg-stone-100 rounded-2xl shadow" transition:fade>
          <h3 class="font-bold mb-2">{story.name}'s Tale</h3>
          <p>{story.tale}</p>
          <button on:click={() => story.likes++} class="mt-2 text-orange-600">❤️ {story.likes}</button>
        </div>
      {/each}
    </div>
  </div>
</section>