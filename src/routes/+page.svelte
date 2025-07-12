<script>
  import Hero from '$lib/components/Hero.svelte';
  import About from '$lib/components/About.svelte';
  import Books from '$lib/components/Books.svelte';
  import Journals from '$lib/components/Journals.svelte';
</script>

<Hero />
<About standalone={false} />
<Books />
<Journals />