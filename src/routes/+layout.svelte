<script>
  import '../app.css';
  let { children } = $props();
  let mobileMenuOpen = $state(false);
  
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<svelte:head>
  <title>Narrow Road Books</title>
</svelte:head>

<div class="min-h-screen bg-stone-50 text-stone-800 font-sans flex flex-col">
  <nav class="bg-stone-100 border-b-2 border-orange-500 p-4 shadow-sm">
    <div class="container mx-auto">
      <!-- Mobile menu button -->
      <div class="flex justify-between items-center md:hidden">
        <span class="text-emerald-700 font-bold text-lg">Narrow Road Books</span>
        <button
          onclick={toggleMobileMenu}
          class="text-emerald-700 hover:text-orange-600 focus:outline-none focus:text-orange-600 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {#if mobileMenuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            {/if}
          </svg>
        </button>
      </div>
      
      <!-- Desktop navigation -->
      <div class="hidden md:flex space-x-6">
        <a href="/" class="text-emerald-700 hover:text-orange-600 hover:underline transition-colors font-medium">Home</a>
        <a href="/about" class="text-emerald-700 hover:text-orange-600 hover:underline transition-colors font-medium">About</a>
        <a href="/books" class="text-emerald-700 hover:text-orange-600 hover:underline transition-colors font-medium">Books</a>
        <a href="/journals" class="text-emerald-700 hover:text-orange-600 hover:underline transition-colors font-medium">Journals</a>
        <a href="/community" class="text-emerald-700 hover:text-orange-600 hover:underline transition-colors font-medium">Community</a>
        <a href="/demo" class="text-emerald-700 hover:text-orange-600 hover:underline transition-colors font-medium">Demo</a>
      </div>
      
      <!-- Mobile navigation menu -->
      {#if mobileMenuOpen}
        <div class="md:hidden mt-4 pb-4 border-t border-orange-200">
          <div class="flex flex-col space-y-3 pt-4">
            <a 
              href="/" 
              class="text-emerald-700 hover:text-orange-600 hover:underline transition-colors font-medium block px-2 py-1"
              onclick={() => mobileMenuOpen = false}
            >
              Home
            </a>
            <a 
              href="/about" 
              class="text-emerald-700 hover:text-orange-600 hover:underline transition-colors font-medium block px-2 py-1"
              onclick={() => mobileMenuOpen = false}
            >
              About
            </a>
            <a 
              href="/books" 
              class="text-emerald-700 hover:text-orange-600 hover:underline transition-colors font-medium block px-2 py-1"
              onclick={() => mobileMenuOpen = false}
            >
              Books
            </a>
            <a 
              href="/journals" 
              class="text-emerald-700 hover:text-orange-600 hover:underline transition-colors font-medium block px-2 py-1"
              onclick={() => mobileMenuOpen = false}
            >
              Journals
            </a>
            <a 
              href="/community" 
              class="text-emerald-700 hover:text-orange-600 hover:underline transition-colors font-medium block px-2 py-1"
              onclick={() => mobileMenuOpen = false}
            >
              Community
            </a>
            <a 
              href="/demo" 
              class="text-emerald-700 hover:text-orange-600 hover:underline transition-colors font-medium block px-2 py-1"
              onclick={() => mobileMenuOpen = false}
            >
              Demo
            </a>
          </div>
        </div>
      {/if}
    </div>
  </nav>
  <div class="flex-grow">
    {@render children()}
  </div>
  <footer class="py-6 bg-stone-200 border-t-2 border-orange-500 text-center text-emerald-800">
    <p class="text-sm">© 2025 Narrow Road Books. All rights reserved.</p>
  </footer>
</div>