<script lang="ts">
  import  Input  from '$lib/components/ui/input/input.svelte';
  import  Button  from '$lib/components/ui/button/button.svelte';
  import { login } from '$lib/auth/store';
  import { mockLogin } from '$lib/auth/mock';
  import { goto } from '$app/navigation';

  let username = '';
  let password = '';
  let loading = false;
  let error: string | null = null;

  async function handleLogin() {
    error = null;
    loading = true;
    try {
      const user = await mockLogin(username, password);
      login(user);
      goto('/documents');
    } catch (e) {
      error = (e as Error).message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-white-800 via-white-700 to-gray-800 animate-gradient-x">
  <div class="w-full max-w-md p-10 space-y-6 bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700">
    
    <!-- Logo / Title -->
    <div class="flex flex-col items-center">
      <div class="w-16 h-16 mb-4 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold text-xl animate-bounce">
        eD
      </div>
      <h1 class="text-3xl font-bold text-white text-center">Welcome to your Enterprise Document Management System</h1>
      <p class="text-gray-300 mt-1 text-sm mt-5">Please sign in to continue</p>
    </div>

    <!-- Login Form -->
    <form class="space-y-4" on:submit|preventDefault={handleLogin}>
      <Input label="Username" bind:value={username} required placeholder="Enter your username" />
      <Input type="password" label="Password" bind:value={password} required placeholder="Enter your password" />

      {#if error}
        <p class="text-red-500 text-sm">{error}</p>
      {/if}

      <Button type="submit" variant="primary" class="w-full transition-transform transform hover:scale-105 bg-gray-600 text-white">
        {loading ? 'Signing in…' : 'Login'}
      </Button>
    </form>

    <!-- Footer -->
    <p class="text-gray-400 text-xs text-center mt-4">
      &copy; {new Date().getFullYear()} eDMS. All rights reserved.
    </p>
  </div>
</div>

<style>
  /* subtle animated gradient */
  @keyframes gradient-x {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 10s ease infinite;
  }
</style>
