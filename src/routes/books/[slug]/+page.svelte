<script>
  import { page } from '$app/stores';
  import booksData from '$lib/data/books.json';
  import PaywallButton from '$lib/components/PaywallButton.svelte';

  let book = booksData.find(b => b.slug === $page.params.slug);
</script>

<svelte:head>
  {#if book}
    <title>{book.title} - Narrow Road Books</title>
  {:else}
    <title>Narrow Road Books</title>
  {/if}
</svelte:head>

{#if book}
  <section class="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
    <div class="max-w-3xl">
      <h1 class="text-5xl font-bold mb-6">{book.title}</h1>
      <img src={book.cover} alt={book.title} class="w-full mb-6 rounded-2xl shadow-2xl" />
      <p class="mb-6">{book.description || 'No description available.'}</p>
      <PaywallButton text="Purchase & Read" page={`/checkout?book={$page.params.slug}`} />
    </div>
  </section>
{:else}
  <div class="p-8 text-center text-white">Book not found</div>
{/if}