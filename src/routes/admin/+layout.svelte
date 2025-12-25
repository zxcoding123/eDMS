<script lang="ts">
  import { LayoutDashboard, Folder, Users, Clock, Settings, LogOut } from 'lucide-svelte';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';

  let isCollapsed = false;
  const currentPath = derived(page, $page => $page.url.pathname);

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { label: 'Documents', icon: Folder, href: '/admin/documents' },
    { label: 'Users', icon: Users, href: '/admin/users' },
    { label: 'Workflow', icon: Clock, href: '/admin/workflow' },
    { label: 'Settings', icon: Settings, href: '/admin/settings' },
  ];
</script>

<div class="flex min-h-screen">
  <!-- Sidebar -->
  <aside class={`transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-56'} bg-black text-white flex flex-col border-r border-gray-800`}>
    <div class="flex items-center gap-4 border-b border-gray-800 p-4">
      <LayoutDashboard class="h-8 w-8" />
      {#if !isCollapsed}
        <span class="text-xl font-semibold">rDMS Admin</span>
      {/if}
    </div>

    <nav class="flex-1 space-y-1 p-2 text-sm">
      {#each navItems as item}
        <a
          href={item.href}
          class="flex items-center gap-4 rounded-md px-4 py-3 hover:bg-gray-800"
          class:bg-gray-900={$currentPath === item.href}
        >
          <item.icon class="h-6 w-6" />
          {#if !isCollapsed}<span>{item.label}</span>{/if}
        </a>
      {/each}
    </nav>

    <div class="border-t border-gray-800 p-2">
      <button
        class="flex w-full items-center gap-4 rounded-md px-4 py-3 hover:bg-gray-800"
        on:click={() => isCollapsed = !isCollapsed}
      >
        <LayoutDashboard class="h-6 w-6" />
        {#if !isCollapsed}<span>Collapse</span>{/if}
      </button>

      <button class="mt-1 flex w-full items-center gap-4 rounded-md px-4 py-3 text-red-500 hover:bg-gray-800">
        <LogOut class="h-6 w-6" />
        {#if !isCollapsed}<span>Logout</span>{/if}
      </button>
    </div>
  </aside>

  <!-- Page Content -->
  <main class="flex-1 bg-muted p-6 overflow-y-auto">
    <!-- Header -->
    <header class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold">
          {#if $currentPath === '/admin'}Dashboard{/if}
          {#if $currentPath === '/admin/documents'}Documents{/if}
          <!-- {#if $currentPath === '/admin/users'}Users{/if}
          {#if $currentPath === '/admin/workflow'}Workflow{/if}
          {#if $currentPath === '/admin/settings'}Settings{/if} -->
        </h1>
        <p class="text-sm text-muted-foreground">
          {#if $currentPath === '/admin'}Enterprise Document Management Overview{/if}
          {#if $currentPath === '/admin/documents'}Manage all uploaded documents{/if}
          <!-- {#if $currentPath === '/admin/users'}User management and roles{/if}
          {#if $currentPath === '/admin/workflow'}Workflow overview and approvals{/if}
          {#if $currentPath === '/admin/settings'}System and account settings{/if} -->
        </p>
      </div>
      <!-- Optional action button -->
      <button class="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90">
        {#if $currentPath === '/admin/documents'}Upload Document{:else}New Item{/if}
      </button>
    </header>

    <!-- Slot for route-specific content -->
    <slot />
  </main>
</div>
