<script lang="ts" context="module">
  import type { ComponentType } from 'svelte';

  export interface QuickAction {
    label: string;
    icon: ComponentType;
    href?: string;
    onClick?: () => void;
  }
</script>

<script lang="ts">
  export let actions: QuickAction[] = [];
</script>

<div class="grid grid-cols-2 gap-4 md:grid-cols-5">
   
  {#each actions as action}
    {#if action.href}
      <a
        href={action.href}
        class="flex items-center gap-3 rounded-xl border bg-card p-4 shadow transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <action.icon class="h-6 w-6" />
        <span class="text-sm font-medium">{action.label}</span>
      </a>
    {:else}
      <button
        type="button"
        on:click={action.onClick}
        class="flex items-center gap-3 rounded-xl border bg-card p-4 shadow transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <action.icon class="h-6 w-6" />
        <span class="text-sm font-medium">{action.label}</span>
      </button>
    {/if}
  {/each}
</div>
