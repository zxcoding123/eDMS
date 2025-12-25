<script lang="ts">
  import { documents, addDocument } from '$lib/documents/store';
  import { currentUser, login } from '$lib/auth/store';

  function seed() {
    login({ id: '1', username: 'admin', role: 'admin' });
    addDocument({
      id: crypto.randomUUID(),
      name: 'Sample.pdf',
      size: 102400,
      mime: 'application/pdf',
      ownerId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active'
    });
  }
</script>

<button on:click={seed}>Seed Data</button>

<ul>
  {#each $documents as doc}
    <li>{doc.name} — {doc.status}</li>
  {/each}
</ul>
