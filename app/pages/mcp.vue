<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">MCP Products Routes Test</h1>

    <div class="mb-4">
      <button @click="testGet" class="bg-blue-500 text-white px-4 py-2 rounded mr-2">Test GET /mcp/products</button>
      <button @click="testInitialize" class="bg-green-500 text-white px-4 py-2 rounded mr-2">Test Initialize</button>
      <button @click="testToolsList" class="bg-purple-500 text-white px-4 py-2 rounded">Test Tools List</button>
    </div>

    <div v-if="getResponse" class="mb-4">
      <h2 class="text-xl font-semibold">GET Response:</h2>
      <pre class="bg-gray-100 p-2 rounded">{{ getResponse }}</pre>
    </div>

    <div v-if="initResponse" class="mb-4">
      <h2 class="text-xl font-semibold">Initialize Response:</h2>
      <pre class="bg-gray-100 p-2 rounded">{{ JSON.stringify(initResponse, null, 2) }}</pre>
    </div>

    <div v-if="toolsResponse" class="mb-4">
      <h2 class="text-xl font-semibold">Tools List Response:</h2>
      <pre class="bg-gray-100 p-2 rounded">{{ JSON.stringify(toolsResponse, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
const getResponse = ref('')
const initResponse = ref<any>(null)
const toolsResponse = ref<any>(null)
const config = useRuntimeConfig()

const testGet = async () => {
  try {
    const response = await $fetch('/mcp/products', {
      baseURL: config.public.apiBase,
      method: 'GET'
    })
    getResponse.value = JSON.stringify(response, null, 2)
  } catch (error) {
    getResponse.value = `Error: ${(error as Error).message}`
  }
}

const testInitialize = async () => {
  try {
    const response = await $fetch('/mcp/products', {
      baseURL: config.public.apiBase,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
          protocolVersion: '2024-11-05',
          capabilities: {},
          clientInfo: { name: 'nuxt-client', version: '1.0' }
        }
      }
    })
    initResponse.value = response
  } catch (error) {
    initResponse.value = { error: (error as Error).message }
  }
}

const testToolsList = async () => {
  try {
    const response = await $fetch('/mcp/products', {
      baseURL: config.public.apiBase,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        jsonrpc: '2.0',
        id: 2,
        method: 'tools/list',
        params: {}
      }
    })
    toolsResponse.value = response
  } catch (error) {
    toolsResponse.value = { error: (error as Error).message }
  }
}
</script>