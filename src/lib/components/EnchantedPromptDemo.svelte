<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { gsap } from 'gsap';
  import { TextPlugin, SplitText } from 'gsap/all';
  import { browser } from '$app/environment';
  
  gsap.registerPlugin(TextPlugin, SplitText);
  
  export let promptsInView = false;
  
  let showModal = false;
  let userInput = '';
  let response = '';
  let responseElem;
  let currentPrompt = '';
  let introRef;
  let generateProgress = 0;
  let isGenerating = false;
  let typingComplete = false;
  
  // Enhanced prompts with more depth
  const sacredPrompts = [
    "Dear soul, when did you last feel the presence of the Divine in an ordinary moment? Describe that sacred encounter as Jane might have—with gentle observation and profound gratitude.",
    "In the quiet chambers of your heart, what truth have you been avoiding? Write as if confessing to a dear friend who sees your soul with perfect clarity.",
    "If pride were a garden in your heart, what would you need to tend, prune, or plant anew? Let your words bloom like flowers in Austen's countryside.",
    "What sacrifice has shaped your character most deeply? Tell this story as if it were a chapter in Scripture—finding the holy in the human.",
    "When did love surprise you by arriving in unexpected form? Write with the wit of Elizabeth Bennet and the wisdom of the Psalms.",
    "In what ways does your daily routine become a form of prayer? Describe the sacred rhythms that Jane would have recognized in her own quiet days.",
    "What would you tell your younger self about the art of patience? Let your words carry both Austen's gentle humor and Scripture's timeless counsel.",
    "How has forgiveness changed the landscape of your soul? Write as if mapping the before and after of grace in your heart.",
    "What small act of kindness has left the deepest impression on your spirit? Capture it with the delicate precision of Austen's most tender scenes."
  ];
  
  const enchantedResponses = [
    "Your words shimmer with the authenticity Jane cherished—they echo the very heartbeat of sacred storytelling. Continue this divine conversation in our journal.",
    "How beautifully you've woven together the threads of experience and grace! Your reflection belongs in the company of the great contemplatives.",
    "Your soul speaks the language of both parlor and sanctuary. This is exactly the kind of sacred writing our journal was designed to inspire.",
    "Such exquisite honesty! You've captured that rare quality Austen prized: the courage to see oneself clearly while believing in redemption.",
    "Your words carry the fragrance of both ink and incense—the perfect marriage of literary grace and spiritual depth we celebrate.",
    "This reflection reveals a heart that understands the sacred art of paying attention. Your words join the eternal conversation of seekers.",
    "You've discovered what Jane knew: that the most profound truths often hide in the simplest moments. Your writing is a testament to this wisdom.",
    "Your reflection pulses with the rhythm of a heart that has learned to find the holy in the human. This is the essence of our sacred practice."
  ];
  
  function getRandomPrompt() {
    return sacredPrompts[Math.floor(Math.random() * sacredPrompts.length)];
  }
  
  function getRandomResponse() {
    return enchantedResponses[Math.floor(Math.random() * enchantedResponses.length)];
  }
  
  function openModal() {
    currentPrompt = getRandomPrompt();
    showModal = true;
    userInput = '';
    response = '';
    typingComplete = false;
    
    // Animate prompt swirl-in
    setTimeout(() => {
      if (browser) {
        const promptElement = document.querySelector('.prompt-text');
        if (promptElement) {
          const split = new SplitText(promptElement, { type: 'words' });
          gsap.from(split.words, { 
            duration: 1.2, 
            opacity: 0, 
            rotation: 180, 
            scale: 0.5,
            stagger: 0.06, 
            ease: 'back.out(1.7)' 
          });
        }
      }
    }, 100);
  }
  
  function closeModal() {
    showModal = false;
    generateProgress = 0;
    isGenerating = false;
    typingComplete = false;
  }
  
  function generateResponse() {
    if (!userInput.trim() || isGenerating) return;
    
    isGenerating = true;
    generateProgress = 0;
    response = '';
    typingComplete = false;
    
    const selectedResponse = getRandomResponse();
    
    // Progress bar animation
    const progressDuration = 1.5;
    gsap.to({ value: 0 }, {
      value: 100,
      duration: progressDuration,
      ease: 'power2.out',
      onUpdate: function() {
        generateProgress = this.targets()[0].value;
      },
      onComplete: () => {
        // Start typing response
        if (browser && responseElem) {
          gsap.to(responseElem, {
            duration: selectedResponse.length * 0.075,
            text: selectedResponse,
            ease: 'none',
            onUpdate: function() {
              response = this.targets()[0].textContent;
            },
            onComplete: () => {
              typingComplete = true;
              isGenerating = false;
              // Gentle glow effect
              gsap.to(responseElem, {
                duration: 1.5,
                textShadow: '0 0 20px rgba(16, 185, 129, 0.6)',
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
              });
            }
          });
        }
      }
    });
  }
  
  function tryAnotherPrompt() {
    currentPrompt = getRandomPrompt();
    userInput = '';
    response = '';
    generateProgress = 0;
    isGenerating = false;
    typingComplete = false;
    
    // Re-animate the new prompt
    setTimeout(() => {
      if (browser) {
        const promptElement = document.querySelector('.prompt-text');
        if (promptElement) {
          const split = new SplitText(promptElement, { type: 'words' });
          gsap.from(split.words, { 
            duration: 1.2, 
            opacity: 0, 
            rotation: 180, 
            scale: 0.5,
            stagger: 0.06, 
            ease: 'back.out(1.7)' 
          });
        }
      }
    }, 100);
  }
  
  function handleKeydown(e) {
    if (e.key === 'Escape') closeModal();
  }
  
  onMount(() => {
    if (browser) {
      window.addEventListener('keydown', handleKeydown);
    }
  });
  
  onDestroy(() => {
    if (browser) {
      window.removeEventListener('keydown', handleKeydown);
    }
  });
  
  // Auto-trigger when scrolled into view
  $: if (promptsInView && !showModal) {
    setTimeout(() => {
      if (browser) {
        const intro = document.querySelector('.sacred-intro');
        if (intro) {
          gsap.from(intro, {
            duration: 1.5,
            y: 50,
            opacity: 0,
            scale: 0.9,
            ease: 'back.out(1.7)'
          });
        }
      }
    }, 300);
  }
</script>

<div class="relative">
  <!-- Sacred introduction -->
  <div class="sacred-intro mb-8 p-6 bg-gradient-to-r from-emerald-50 to-orange-50 rounded-xl border-2 border-orange-200">
    <p class="text-lg text-stone-700 text-center italic leading-relaxed">
      "The pen is mightier than the sword, but the heart that guides it is mightier still." 
      <br><span class="text-emerald-600 font-medium">— A Sacred Invitation</span>
    </p>
  </div>
  
  <!-- Enchanted button -->
  <button 
    onclick={openModal}
    class="group relative mx-auto block px-12 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl hover:scale-105 active:scale-95"
  >
    <span class="relative z-10 flex items-center gap-3">
      <svg class="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
      </svg>
      Enter the Sacred Dialogue
    </span>
    
    <!-- Magical sparkles -->
    <div class="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-ping"></div>
    <div class="absolute -bottom-1 -left-1 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping" style="animation-delay: 0.2s"></div>
  </button>
</div>

{#if showModal}
  <div 
    class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    transition:fade={{ duration: 300 }}
    onclick={closeModal}
    onkeydown={(e) => e.key === 'Enter' && closeModal()}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    tabindex="0"
  >
    <div 
      class="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border-4 border-orange-200 relative overflow-hidden"
      transition:scale={{ duration: 300 }}
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => e.stopPropagation()}
      role="document"
    >
      <!-- Magical header -->
      <div class="bg-gradient-to-r from-emerald-500 to-orange-500 p-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-orange-400/20 animate-pulse"></div>
        
        <button 
          onclick={closeModal}
          class="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200"
          aria-label="Close modal"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        
        <h2 id="modal-title" class="text-2xl font-bold text-white text-center relative z-10">
          Sacred Conversation
        </h2>
        <p class="text-white/90 text-center mt-2 relative z-10">Let your soul speak through the wisdom of ages</p>
      </div>
      
      <!-- Prompt section -->
      <div class="p-8">
        <div class="mb-8">
          <h3 class="text-lg font-semibold mb-4 text-emerald-800 text-center">Your Sacred Prompt</h3>
          <div class="bg-gradient-to-r from-emerald-50 to-orange-50 rounded-xl p-6 border-2 border-orange-200">
            <p class="prompt-text text-lg text-stone-700 leading-relaxed italic text-center">
              {currentPrompt}
            </p>
          </div>
        </div>
        
        <!-- Input section -->
        <div class="mb-6">
          <label for="sacred-input" class="block text-sm font-medium text-stone-700 mb-2">
            Your Sacred Response
          </label>
          <textarea 
            id="sacred-input"
            bind:value={userInput}
            placeholder="Let your heart speak freely here..."
            class="w-full h-40 p-4 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-stone-700 leading-relaxed transition-all duration-200"
            aria-describedby="input-help"
          ></textarea>
          <p id="input-help" class="text-xs text-stone-500 mt-2">
            Write as if you're having a heartfelt conversation with a dear friend
          </p>
        </div>
        
        <!-- Action buttons -->
        <div class="flex flex-col sm:flex-row gap-4 mb-6">
          <button 
            onclick={generateResponse}
            disabled={!userInput.trim() || isGenerating}
            class="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-lg shadow-lg transform transition-all duration-200 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {#if isGenerating}
              <span class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Weaving Your Sacred Thread...
              </span>
            {:else}
              Weave Your Sacred Thread
            {/if}
          </button>
          
          <button 
            onclick={tryAnotherPrompt}
            class="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg shadow-lg transform transition-all duration-200 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            New Sacred Prompt
          </button>
        </div>
        
        <!-- Progress bar -->
        {#if isGenerating}
          <div class="mb-6">
            <div class="h-2 bg-orange-200 rounded-full overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full transition-all duration-100"
                style="width: {generateProgress}%"
              ></div>
            </div>
            <p class="text-xs text-stone-500 mt-2 text-center">
              The sacred scribes are preparing your response...
            </p>
          </div>
        {/if}
        
        <!-- Response section -->
        {#if response}
          <div class="bg-gradient-to-r from-emerald-50 to-orange-50 rounded-xl p-6 border-2 border-emerald-200">
            <div class="flex items-center gap-2 mb-4">
              <svg class="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <h4 class="font-semibold text-emerald-800">Your Sacred Response</h4>
            </div>
            
            <p 
              bind:this={responseElem}
              class="text-stone-700 leading-relaxed italic text-center"
              aria-live="polite"
            >
              {response}
            </p>
            
            {#if typingComplete}
              <div class="mt-6 text-center">
                <p class="text-sm text-stone-600 mb-4">
                  Ready to continue this sacred journey?
                </p>
                <a href="/journals" class="inline-block">
                  <button class="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg transform transition-all duration-200 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl hover:scale-105 active:scale-95">
                    Claim Your Sacred Journal
                  </button>
                </a>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
