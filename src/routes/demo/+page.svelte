<script>
  import Quiz from '$lib/components/Quiz.svelte';
</script>

<svelte:head>
  <title>Demo - Narrow Road Books</title>
</svelte:head>

<section class="min-h-screen bg-stone-50 py-20">
  <div class="container mx-auto px-6">
    <div class="max-w-2xl mx-auto text-center mb-12">
      <h1 class="text-4xl font-bold mb-6 text-emerald-800">
        Demo Page
      </h1>
      <p class="text-stone-600 mb-8">
        Interactive components and features showcase
      </p>
    </div>
    
    <div class="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 border-2 border-orange-200">
      <Quiz />
    </div>
  </div>
</section>
