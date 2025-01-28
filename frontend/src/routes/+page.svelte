<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import * as Table from '$lib/components/ui/table';
  import TextInput from '$lib/components/ui/input/text-input.svelte';

  let file: File | null = null;
  let uploadMessage = '';
  let isUploading = false;

  interface CsvRow {
    csvId: number;
    postId: number | null;
    name: string | null;
    email: string | null;
    body: string | null;
  }

  let data: CsvRow[] = [];
  let totalCount = 0;
  let totalPages = 1;
  let currentPage = 1;
  let searchQuery = '';
  let pageSize = 10;

  async function handleUpload() {
    if (!file) {
      uploadMessage = 'No file selected';
      return;
    }
    uploadMessage = '';
    isUploading = true;

    try {
      const formData = new FormData();
      formData.append('csvFile', file);

      const resp = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!resp.ok) {
        const err = await resp.json();
        uploadMessage = err.error ?? 'Error uploading file';
      } else {
        const result = await resp.json();
        uploadMessage = result.message;

        // Auto-refresh data, immediately after upload
        await fetchData();
      }
    } catch (error) {
      uploadMessage = `Upload failed: ${(error as Error).message}`;
    } finally {
      isUploading = false;
    }
  }

  // This Input is a custom component that dispatches on:change with { files }
  function handleFileChange(e: CustomEvent<{ files: FileList | null }>) {
    const files = e.detail.files;
    if (files && files.length > 0) {
      file = files[0];
    }
  }

  async function fetchData(page = 1, search = '') {
    const url = new URL('http://localhost:3000/api/data');
    url.searchParams.set('page', String(page));
    url.searchParams.set('pageSize', String(pageSize));
    if (search) url.searchParams.set('search', search);

    const resp = await fetch(url.toString());
    if (!resp.ok) {
      console.error('Data fetch error', resp.statusText);
      return;
    }

    const json = await resp.json();
    data = json.data;
    totalCount = json.totalCount;
    totalPages = json.totalPages;
    currentPage = json.currentPage;
  }

  // Real-time text input from a custom <TextInput on:input={...}/>
  function handleTextInput(e: CustomEvent<{ value: string }>) {
    searchQuery = e.detail.value;
    fetchData(1, searchQuery);
  }

  // Manual search button approach
  function handleSearch() {
    fetchData(1, searchQuery);
  }

  function handlePrev() {
    if (currentPage > 1) {
      fetchData(currentPage - 1, searchQuery);
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      fetchData(currentPage + 1, searchQuery);
    }
  }

  onMount(() => {
    fetchData();
  });
</script>

<h1 class="text-2xl font-bold mb-4">CSV Uploader & Data Listing</h1>

<!-- Upload Section -->
<div class="border p-4 mb-6 rounded">
  <h2 class="text-lg font-semibold mb-2">Upload CSV</h2>

  <div class="flex items-center gap-2">
    <!-- Add data-testid so test can find file input -->
    <Input
      data-testid="fileInput"
      type="file"
      on:change={handleFileChange}
    />

    <Button
      data-testid="uploadBtn"
      on:click={handleUpload}
      disabled={isUploading}
    >
      {#if isUploading}
        Uploading...
      {:else}
        Upload
      {/if}
    </Button>
  </div>

  {#if uploadMessage}
    <!-- data-testid for testing "No file selected" etc. -->
    <p data-testid="uploadMessage" class="mt-2 text-sm text-gray-800">
      {uploadMessage}
    </p>
  {/if}
</div>

<!-- Data Listing & Search Section -->
<div class="border p-4 rounded overflow-x-auto">
  <h2 class="text-lg font-semibold mb-2">Data Listing & Search</h2>

  <!-- Manual search approach -->
  <div class="flex gap-2 mb-4">
    <!-- data-testid="searchInput" so test can do fireEvent.input(...) -->
    <Input
      data-testid="searchInput"
      type="text"
      placeholder="Search..."
      bind:value={searchQuery}
    />
    <Button on:click={handleSearch}>Search</Button>
  </div>

  <!-- Real-time search approach via text input -->
  <div class="flex gap-2 mb-4">
    <!-- This <TextInput> dispatches "input" with e.detail.value -->
    <TextInput
      class="font-semibold"
      placeholder="The much cooler LIVE search..."
      on:input={handleTextInput}
    />
  </div>

  <!-- For testing: show the actual searchQuery so we can confirm it's updated -->
  <p
    data-testid="searchDisplay"
    class="text-sm text-blue-500 mb-4"
  >
    Search: {searchQuery}
  </p>

  <!-- Table -->
  <Table.Root class="min-w-[600px] w-full mb-4">
    <Table.Caption>Data from your CSV</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head>CSV ID</Table.Head>
        <Table.Head>Post ID</Table.Head>
        <Table.Head>Name</Table.Head>
        <Table.Head>Email</Table.Head>
        <Table.Head>Body</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each data as row}
        <Table.Row>
          <Table.Cell>{row.csvId}</Table.Cell>
          <Table.Cell>{row.postId}</Table.Cell>
          <Table.Cell>{row.name}</Table.Cell>
          <Table.Cell>{row.email}</Table.Cell>
          <Table.Cell>{row.body}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>

  <!-- Pagination -->
  <div class="flex items-center gap-4">
    <Button variant="outline" on:click={handlePrev} disabled={currentPage <= 1}>
      Prev
    </Button>
    <span class="text-sm">Page {currentPage} of {totalPages}</span>
    <Button variant="outline" on:click={handleNext} disabled={currentPage >= totalPages}>
      Next
    </Button>
  </div>

  <p class="mt-2 text-sm">Total records: {totalCount}</p>
</div>
