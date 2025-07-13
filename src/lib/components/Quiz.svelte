<script>
  import { writable } from 'svelte/store';
  import { fade } from 'svelte/transition';
  import PaywallButton from './PaywallButton.svelte';
  let step = writable(0);
  let answers = writable([]);
  let result = writable('');
  const questions = [
    { q: 'Your virtue?', options: ['Love', 'Diligence'] },
    { q: 'Your challenge?', options: ['Patience', 'Courage'] }
  ];
  function next(ans) { 
    answers.update(a => [...a, ans]); 
    step.update(s => s + 1); 
    if ($step === questions.length) calculate(); 
  }
  function calculate() { 
    result.set('You embody honesty! Try "The Arrow" for family tales.'); 
  }
</script>

{#if !$result}
  <h2>Discover Your Moral Path</h2>
  <p>{questions[$step].q}</p>
  {#each questions[$step].options as opt}
    <button onclick={() => next(opt)}>{opt}</button>
  {/each}
{:else}
  <p transition:fade>{result} <PaywallButton text="Get the Book" page="/books/the-arrow" /></p>
{/if}