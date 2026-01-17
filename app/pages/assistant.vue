<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">AI Product Assistant</h1>
      <UButton
        icon="i-lucide-message-circle"
        size="lg"
        @click="isOpen = true"
      >
        Open Chat
      </UButton>
    </div>

    <div class="grid gap-4">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">About the Assistant</h2>
        </template>
        <p class="mb-4">
          This AI assistant helps you manage products in your store using natural language.
        </p>
        <div class="space-y-2">
          <h3 class="font-semibold">What can it do?</h3>
          <ul class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
            <li>List all products or filter by category</li>
            <li>Get details about specific products</li>
            <li>Create new products</li>
            <li>Update existing products</li>
            <li>Delete products</li>
          </ul>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">Example Commands</h2>
        </template>
        <div class="space-y-2">
          <UBadge color="blue" variant="subtle" class="mb-2">💡 Try these prompts:</UBadge>
          <div class="space-y-2">
            <code class="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
              "Show me all products in the electronics category"
            </code>
            <code class="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
              "Create a new product: MacBook Pro for $2499 in electronics"
            </code>
            <code class="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
              "Update product with id 1 to price $1999"
            </code>
            <code class="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
              "Delete product with id 5"
            </code>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">Real-time Updates</h2>
        </template>
        <p class="mb-4">
          The assistant uses WebSockets (Laravel Reverb) to provide real-time feedback about each action.
        </p>
        <div class="space-y-1 text-sm">
          <div class="flex items-center gap-2">
            <span>⏳</span>
            <span>Processing indicators</span>
          </div>
          <div class="flex items-center gap-2">
            <span>✅</span>
            <span>Product created events</span>
          </div>
          <div class="flex items-center gap-2">
            <span>✏️</span>
            <span>Product updated events</span>
          </div>
          <div class="flex items-center gap-2">
            <span>🗑️</span>
            <span>Product deleted events</span>
          </div>
          <div class="flex items-center gap-2">
            <span>📋</span>
            <span>Products listed events</span>
          </div>
        </div>
      </UCard>
    </div>

    <AssistantChat v-model="isOpen" />
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
</script>
