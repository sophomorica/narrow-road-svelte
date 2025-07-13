export function typewriter(node, { duration = 1000, delay = 0 }) {
  const text = node.textContent;
  const length = text.length;
  
  return {
    duration,
    delay,
    tick: (t) => {
      const i = Math.trunc(text.length * t);
      node.textContent = text.slice(0, i);
    }
  };
}
