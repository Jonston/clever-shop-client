<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Welcome to Nuxt UI</h1>
    <UButton @click="sendTestEvent">Send Test Event</UButton>
    <UCard class="mt-4">
      <template #header>
        <h3>Card Title</h3>
      </template>
      This is a card with Nuxt UI styles.
      <p>Messages: {{ messages.join(', ') }}</p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const messages = ref<string[]>([])

const echo = useEcho()

onMounted(() => {
  echo.channel('test').listen('.TestEvent', (e: any) => {
    console.log('Received TestEvent:', e.message);
    messages.value.push(e.message)
  })
})

const sendTestEvent = async () => {
  await $fetch('/api/test-event', {
    baseURL: 'http://localhost',
    method: 'POST'
  })
}
</script>