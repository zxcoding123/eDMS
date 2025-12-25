<script lang="ts">
  import { onMount } from 'svelte';
import { FileText, Type, Layers, CheckCircle, Calendar, Table, Grid } from 'lucide-svelte';


  type DocumentStatus = 'Draft' | 'Pending' | 'Approved' | 'Rejected';

  interface DocumentItem {
    id: string;
    title: string;
    department: string;
    status: DocumentStatus;
    createdAt: string;
  }

  let documents: DocumentItem[] = [
    { id: 'HR-2024-091', title: 'Employee Handbook Update', department: 'HR', status: 'Approved', createdAt: '2024-12-20' },
    { id: 'FIN-2024-014', title: 'Budget Proposal Q1', department: 'Finance', status: 'Pending', createdAt: '2024-12-22' },
    { id: 'IT-REQ-332', title: 'Server Upgrade Request', department: 'IT', status: 'Rejected', createdAt: '2024-12-18' },
    { id: 'LEGAL-2024-055', title: 'Contract Review', department: 'Legal', status: 'Draft', createdAt: '2024-12-21' },
    { id: 'HR-2024-092', title: 'Holiday Policy Update', department: 'HR', status: 'Pending', createdAt: '2024-12-23' },
  ];

  let search = '';
  let selectedDepartment = 'All';
  let selectedStatus = 'All';
  let viewMode: 'table' | 'cards' = 'table';

  let files: File[] = [];

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      files = Array.from(event.dataTransfer.files);
      console.log('Dropped files:', files);
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  $: filteredDocuments = documents.filter(doc => {
    const matchesSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.id.toLowerCase().includes(search.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || doc.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'All' || doc.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });
</script>

<div class="min-h-screen p-6 space-y-6">
  <!-- Drag-and-Drop Upload -->
  <div
    class="flex h-32 items-center justify-center rounded-xl border-2 border-primary/50 border-dashed text-sm text-muted-foreground hover:border-primary transition cursor-pointer"
    on:drop={handleDrop}
    on:dragover={handleDragOver}
  >
    Drag & drop documents here or click to upload
  </div>

  <!-- Filters + View Toggle -->
  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div class="flex flex-col md:flex-row md:items-center gap-2">
      <input
        type="text"
        placeholder="Search documents..."
        bind:value={search}
        class="rounded-md border px-3 py-2 text-sm"
      />
      <select bind:value={selectedDepartment} class="rounded-md border px-2 py-2 text-sm">
        <option>All</option>
        <option>HR</option>
        <option>Finance</option>
        <option>IT</option>
        <option>Legal</option>
      </select>
      <select bind:value={selectedStatus} class="rounded-md border px-2 py-2 text-sm">
        <option>All</option>
        <option>Draft</option>
        <option>Pending</option>
        <option>Approved</option>
        <option>Rejected</option>
      </select>
    </div>

    <!-- View Mode Buttons -->
  
<div class="flex gap-2">
  <button
    class="flex items-center gap-1 rounded-md border px-3 py-2 text-sm transition"
    class:bg-primary={viewMode === 'table'}
    class:text-white={viewMode === 'table'}
    on:click={() => viewMode = 'table'}
  >
  <Table class="h-4 w-4" />
    Table
  </button>

  <button
    class="flex items-center gap-1 rounded-md border px-3 py-2 text-sm transition"
    class:bg-primary={viewMode === 'cards'}
    class:text-white={viewMode === 'cards'}
    on:click={() => viewMode = 'cards'}
  >
   <Grid class="h-4 w-4" />
    Cards
  </button>
</div>
  </div>

  <!-- Document Display -->
  {#if filteredDocuments.length > 0}
    {#if viewMode === 'table'}
      <div class="overflow-x-auto rounded-xl border bg-card">
        <table class="w-full text-sm text-center">
          <thead class="border-b ">
            <tr>
              <th class="px-4 py-3">ID </th>
              <th class="px-4 py-3">Title</th>
              <th class="px-4 py-3">Department</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredDocuments as doc}
              <tr class="border-b hover:bg-muted">
                <td class="px-4 py-3">{doc.id}</td>
                <td class="px-4 py-3 font-medium">{doc.title}</td>
                <td class="px-4 py-3">{doc.department}</td>
                <td class="px-4 py-3">{doc.status}</td>
                <td class="px-4 py-3">{doc.createdAt}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}

    {#if viewMode === 'cards'}
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        {#each filteredDocuments as doc}
          <div class="rounded-xl border bg-card p-4 shadow hover:shadow-lg transition">
            <h3 class="font-semibold">{doc.title}</h3>
            <p class="text-sm text-muted-foreground">{doc.id}</p>
            <div class="mt-3 flex justify-between text-sm">
              <span>{doc.department}</span>
              <span>{doc.status}</span>
            </div>
            <p class="mt-2 text-xs text-muted-foreground">{doc.createdAt}</p>
          </div>
        {/each}
      </div>
    {/if}
  {:else}
    <div class="text-center text-muted-foreground rounded-xl border bg-card h-100 flex items-center justify-center flex-col align-">
        	<FileText class="h-16 w-16" />
      <h1>No documents found matching your filters.</h1>
    </div>
  {/if}
</div>