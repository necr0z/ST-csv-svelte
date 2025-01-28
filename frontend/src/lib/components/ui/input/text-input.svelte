<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import type { WithElementRef } from "bits-ui";
  import { cn } from "$lib/utils.js";
  import { createEventDispatcher } from "svelte";

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    ...restProps
  }: WithElementRef<HTMLInputAttributes> = $props();

  // EventDispatched named "input" that carries the text
  const dispatch = createEventDispatcher<{ input: { value: string } }>();

  function forwardInput(e: Event) {
    const inputElem = e.target as HTMLInputElement;
    // dispatch the new text value
    dispatch('input', { value: inputElem.value });
  }
</script>

<input
  bind:this={ref}
  class={cn(
    "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    className
  )}
  bind:value
  {...restProps}
  on:input={forwardInput}
/>
