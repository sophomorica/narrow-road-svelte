<script>
  import { fade } from 'svelte/transition';
  import BookCard from '$lib/components/BookCard.svelte';
  import booksData from '$lib/data/books.json';
</script>

<section class="py-20 bg-stone-50">
  <div class="container mx-auto px-6">
    <h2 class="text-4xl font-bold mb-10 text-center text-emerald-800 border-b-2 border-orange-500 pb-4 inline-block w-full">
      Our Modern Fables
    </h2>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      transition:fade={{ duration: 500 }}
    >
      {#each booksData as book}
        <BookCard { ...book } />
      {/each}
    </div>
  </div>
</section>