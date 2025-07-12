<script>
  import { fade } from 'svelte/transition';
  export let standalone = false;

  $: classes = standalone
    ? 'min-h-screen flex items-center justify-center bg-gray-900 text-white'
    : 'py-20 bg-gray-800 text-white';
</script>

<section class={classes}>
  <div class="container mx-auto px-6 text-center">
    <h2
      class="text-4xl font-bold mb-4"
      transition:fade={{ duration: 800 }}
    >
      About the Road
    </h2>
    <p
      class="text-lg max-w-2xl mx-auto"
      transition:fade={{ duration: 800, delay: 500 }}
    >
      Every fable you read here is a spark of an ancient campfire, rekindled for the modern mind. Explore tales that blend magic, wisdom, and wonder.
    </p>
  </div>
</section>