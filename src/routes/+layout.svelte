<script>
  import '../app.css';
  let { children } = $props();
</script>

<div class="min-h-screen bg-stone-50 text-stone-800 font-sans flex flex-col">
  <nav class="bg-stone-100 border-b-2 border-orange-500 p-4 shadow-sm">
    <div class="container mx-auto flex space-x-4">
      <a href="/" class="text-emerald-700 hover:text-orange-600 hover:underline transition-colors font-medium">Home</a>
      <a href="/about" class="text-emerald-700 hover:text-orange-600 hover:underline transition-colors font-medium">About</a>
      <a href="/books" class="text-emerald-700 hover:text-orange-600 hover:underline transition-colors font-medium">Books</a>
      <a href="/journals" class="text-emerald-700 hover:text-orange-600 hover:underline transition-colors font-medium">Journals</a>
    </div>
  </nav>
  <div class="flex-grow">
    {@render children()}
  </div>
  <footer class="py-6 bg-stone-200 border-t-2 border-orange-500 text-center text-emerald-800">
    <p class="text-sm">© 2025 Narrow Road Books. All rights reserved.</p>
  </footer>
</div>