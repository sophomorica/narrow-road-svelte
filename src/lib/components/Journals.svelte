<script>
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { TextPlugin, SplitText } from 'gsap/all';
  import { inview } from 'svelte-inview';
  import { browser } from '$app/environment';
  import journalsData from '$lib/data/journals.json';
  import PaywallButton from '$lib/components/PaywallButton.svelte';
  import EnchantedPromptDemo from '$lib/components/EnchantedPromptDemo.svelte';

  gsap.registerPlugin(TextPlugin, SplitText);
  
  let published = journalsData.filter(j => j.published);
  let upcoming = journalsData.filter(j => !j.published);
  let email = '';
  
  // Animation refs
  let introRef;
  let uniquenessRef;
  let typewriterRef;
  let promptsRef;
  let ctaRef;
  
  // Inview states
  let introInView = false;
  let uniquenessInView = false;
  let typewriterInView = false;
  let promptsInView = false;
  let ctaInView = false;
  
  // Animation states
  let typewriterComplete = false;
  let hasTyped = false;
  
  function handleNotify(event) {
    event.preventDefault();
    alert(`Thanks! We'll notify you at ${email} when it's live.`);
    email = '';
  }
  
  // Swirling intro animation
  function animateIntro() {
    if (browser && introRef) {
      const split = new SplitText(introRef, { type: 'words' });
      gsap.from(split.words, { 
        duration: 1.8, 
        opacity: 0, 
        rotation: 360, 
        scale: 0.3,
        stagger: 0.08, 
        ease: 'back.out(1.7)',
        delay: 0.3
      });
    }
  }
  
  // Typewriter effect for uniqueness text
  function animateTypewriter() {
    if (browser && typewriterRef && !hasTyped) {
      hasTyped = true;
      const text = "Discover 50 thoughtfully crafted writing prompts that bridge the elegance of Jane Austen with the timeless wisdom of Scripture. Each prompt is designed to awaken your soul, deepen your faith, and inspire reflection that transcends the ordinary—creating a contemplative space where literature and spirituality dance together in perfect harmony.";
      
      gsap.to(typewriterRef, {
        duration: text.length * 0.075,
        text: text,
        ease: 'none',
        onComplete: () => {
          typewriterComplete = true;
          // Add a gentle glow effect
          gsap.to(typewriterRef, {
            duration: 0.8,
            textShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
            yoyo: true,
            repeat: 1
          });
        }
      });
    }
  }
  
  // Animate CTA section
  function animateCTA() {
    if (browser && ctaRef) {
      gsap.from(ctaRef.children, {
        duration: 1.2,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
      });
    }
  }
  
  // Reactive statements for scroll triggers
  $: if (introInView) animateIntro();
  $: if (typewriterInView) animateTypewriter();
  $: if (ctaInView) animateCTA();
  
  onMount(() => {
    // Preload some animations
    gsap.set([uniquenessRef, typewriterRef], { opacity: 0, y: 30 });
  });
</script>

<section id="journals" class="relative overflow-hidden py-20 bg-gradient-to-br from-stone-50 to-stone-100">
  <!-- Subtle background texture -->
  <div class="absolute inset-0 opacity-5 bg-[url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;)]"></div>
  
  <div class="container mx-auto px-6 relative z-10">
    
    <!-- Phase 1: Swirling Intro -->
    <div 
      use:inview={{ unobserveOnEnter: true, threshold: 0.3 }}
      on:change={({ detail }) => introInView = detail.inView}
      class="text-center mb-20"
    >
      <h2 class="text-5xl font-bold mb-8 text-emerald-800 relative">
        <span class="relative z-10">Prompt Journals</span>
        <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
      </h2>
      
      <p bind:this={introRef} class="text-xl text-stone-600 max-w-4xl mx-auto leading-relaxed font-light">
        Within these pages, you are invited to embark on a journey that transcends time—a meaningful conversation between your thoughts, Jane Austen's timeless wisdom, and the eternal truths of the Holy Bible. Here, literature becomes prayer, and writing becomes worship.
      </p>
    </div>
    
    <!-- Phase 2: Typewriter Uniqueness -->
    <div 
      use:inview={{ unobserveOnEnter: true, threshold: 0.4 }}
      on:change={({ detail }) => typewriterInView = detail.inView}
      class="mb-20"
    >
      <div class="max-w-4xl mx-auto text-center">
        <h3 class="text-3xl font-semibold mb-8 text-emerald-800">What Makes This Special?</h3>
        <div class="bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-200 relative overflow-hidden">
          <!-- Animated border -->
          <div class="absolute inset-0 bg-gradient-to-r from-orange-400 via-emerald-400 to-orange-400 rounded-2xl opacity-20 animate-pulse"></div>
          
          <p bind:this={typewriterRef} class="text-lg text-stone-700 leading-relaxed relative z-10 min-h-[200px] flex items-center justify-center">
            <!-- Text will be typed here -->
          </p>
          
          <!-- Progress indicator -->
          {#if typewriterInView && !typewriterComplete}
            <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          {/if}
        </div>
      </div>
    </div>
    
    <!-- Phase 3: Journal Showcase -->
    <div class="mb-20">
      <h3 class="text-3xl font-semibold mb-12 text-center text-emerald-800">Timeless Volumes</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {#each published as j, index}
          <div class="flex flex-col items-center group">
            <!-- Magical book container -->
            <div class="relative w-48 h-72 mb-6 perspective-1000">
              <div class="relative w-full h-full bg-gradient-to-br from-stone-200 to-stone-400 rounded-r-lg shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-2 group-hover:shadow-3xl">
                <!-- Enchanted spine -->
                <div class="absolute left-0 top-0 w-3 h-full bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-l-sm shadow-inner"></div>
                
                <!-- Book cover with glow -->
                <div class="relative overflow-hidden rounded-r-lg">
                  <img 
                    src={j.cover} 
                    alt={j.title} 
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <!-- Magical overlay -->
                  <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <!-- Enchanted pages -->
                <div class="absolute -right-1 top-2 w-1 h-68 bg-gradient-to-b from-stone-50 to-stone-200 rounded-r-sm shadow-inner"></div>
                <div class="absolute -right-2 top-4 w-1 h-64 bg-gradient-to-b from-white to-stone-100 rounded-r-sm shadow-inner"></div>
                
                <!-- Floating sparkles -->
                <div class="absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping"></div>
                <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-ping" style="animation-delay: 0.3s"></div>
              </div>
            </div>
            
            <!-- Enchanted title -->
            <h4 class="text-xl font-semibold mb-4 text-center text-emerald-800 max-w-48 group-hover:text-orange-600 transition-colors duration-300">{j.title}</h4>
            
            <!-- Magical button -->
            <div class="relative">
              {#if j.slug === 'creative-morning-pages'}
                <a href="https://www.amazon.com/Verses-Jane-Austen-Creative-Journal/dp/B0FCMZSWQG/ref=cm_cr_arp_d_product_top?ie=UTF8" target="_blank" rel="noopener noreferrer">
                  <button class="relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl shadow-lg transform transition-all duration-200 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:scale-105 active:scale-95 active:shadow-md">
                    <span class="relative z-10">Claim Your Copy</span>
                    <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl"></div>
                    <div class="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </a>
              {:else}
                <a href={`/journals/${j.slug}`}>
                  <button class="relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-xl shadow-lg transform transition-all duration-200 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl hover:scale-105 active:scale-95 active:shadow-md">
                    <span class="relative z-10">Begin the Journey</span>
                    <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl"></div>
                    <div class="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </a>
              {/if}
            </div>
          </div>
        {/each}
        
        <!-- Coming Soon Journals -->
        {#each upcoming as j}
          <div class="flex flex-col items-center group">
            <div class="relative w-48 h-72 mb-6 perspective-1000">
              <div class="relative w-full h-full bg-gradient-to-br from-stone-400 to-stone-600 rounded-r-lg shadow-2xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-105">
                <div class="absolute left-0 top-0 w-3 h-full bg-gradient-to-b from-stone-500 to-stone-700 rounded-l-sm shadow-inner"></div>
                
                <div class="text-center p-6">
                  <h4 class="text-lg font-semibold mb-3 text-white">{j.title}</h4>
                  <p class="text-stone-200 text-sm mb-4">Awakening {j.eta}</p>
                  <div class="w-16 h-16 mx-auto border-4 border-white/30 rounded-full flex items-center justify-center">
                    <div class="w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div class="absolute -right-1 top-2 w-1 h-68 bg-gradient-to-b from-stone-100 to-stone-300 rounded-r-sm shadow-inner"></div>
                <div class="absolute -right-2 top-4 w-1 h-64 bg-gradient-to-b from-white to-stone-200 rounded-r-sm shadow-inner"></div>
              </div>
            </div>
            
            <form on:submit|preventDefault={handleNotify} class="flex flex-col items-center w-full max-w-48">
              <input
                type="email"
                placeholder="Your email address"
                bind:value={email}
                required
                class="w-full mb-4 px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/90 text-sm transition-all duration-200"
              />
              <button type="submit" class="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg shadow-lg transform transition-all duration-200 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:scale-105 active:scale-95 text-sm">
                Await the Revelation
              </button>
            </form>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Phase 4: Interactive Prompt Experience -->
    <div 
      use:inview={{ unobserveOnEnter: true, threshold: 0.3 }}
      on:change={({ detail }) => promptsInView = detail.inView}
      class="mb-20"
    >
      <div class="text-center mb-12">
        <h3 class="text-3xl font-semibold mb-6 text-emerald-800">Experience the Divine Dialogue</h3>
        <p class="text-stone-600 max-w-2xl mx-auto text-lg">
          Step into a moment of divine conversation. Let your soul speak through the wisdom of ages.
        </p>
      </div>
      
      <EnchantedPromptDemo {promptsInView} />
    </div>
    
    <!-- Phase 5: Final CTA -->
    <div 
      use:inview={{ unobserveOnEnter: true, threshold: 0.4 }}
      on:change={({ detail }) => ctaInView = detail.inView}
      bind:this={ctaRef}
      class="text-center"
    >
      <div class="bg-gradient-to-r from-emerald-50 to-orange-50 rounded-3xl p-12 shadow-xl border-2 border-orange-200">
        <h3 class="text-4xl font-bold mb-6 text-emerald-800">Your Spiritual Journey Awaits</h3>
        <p class="text-xl text-stone-600 mb-8 max-w-2xl mx-auto">
          Join thousands who have discovered the transformative power of contemplative writing. 
          Your words will weave into the eternal tapestry of faith and literature.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="/books" class="group">
            <button class="px-10 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg transform transition-all duration-200 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl hover:scale-105 active:scale-95 text-lg">
              <span class="relative z-10">Begin Your Writing Journey</span>
              <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl"></div>
            </button>
          </a>
          
          <a href="/community" class="group">
            <button class="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-lg transform transition-all duration-200 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:scale-105 active:scale-95 text-lg">
              <span class="relative z-10">Share Your Journey</span>
              <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl"></div>
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .h-68 {
    height: 17rem;
  }
  
  .h-64 {
    height: 16rem;
  }
  
  .shadow-3xl {
    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>