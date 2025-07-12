<script>
  export let text;
  export let page;
</script>

<button
  on:click={() => (window.location.href = page)}
  class="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-medium transition-colors shadow-lg hover:shadow-orange-500/25"
>
  {text}
</button>