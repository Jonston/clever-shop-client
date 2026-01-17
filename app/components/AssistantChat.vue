<template>
  <UModal v-model="isOpen" :ui="{ content: 'sm:max-w-3xl sm:h-[36rem]' }">
    <template #content>
      <UChatPalette>
        <UChatMessages
          :messages="messages"
          :status="status"
          :user="{ side: 'right', variant: 'solid', color: 'primary' }"
          :assistant="{ side: 'left', icon: 'i-lucide-bot', color: 'gray' }"
        >
          <template #content="{ message }">
            <template v-for="(part, index) in message.parts" :key="`${message.id}-${part.type}-${index}`">
              <p v-if="part.type === 'text'" class="whitespace-pre-wrap">
                {{ part.text }}
              </p>
            </template>
          </template>
        </UChatMessages>

        <template #prompt>
          <UChatPrompt
            v-model="input"
            icon="i-lucide-sparkles"
            placeholder="Ask me about products..."
            :disabled="status === 'loading'"
            @submit="onSubmit"
          />
        </template>
      </UChatPalette>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const isOpen = defineModel<boolean>({ default: false })

interface Message {
  id: string
  role: 'user' | 'assistant'
  parts: Array<{ type: 'text'; text: string }>
}

const messages = ref<Message[]>([])
const input = ref('')
const status = ref<'idle' | 'loading' | 'error'>('idle')
const config = useRuntimeConfig()
const echo = useEcho()

let messageIdCounter = 0

onMounted(() => {
  // Listen to assistant events
  echo.channel('assistant')
    .listen('.assistant.processing', (e: any) => {
      addAssistantMessage(`⏳ ${e.message}`)
    })
    .listen('.AssistantMessage', (e: any) => {
      updateLastAssistantMessage(e.message)
      status.value = 'idle'
    })
    .listen('.product.created', (e: any) => {
      addAssistantMessage(`✅ Product created: ${e.name} ($${e.price})`)
    })
    .listen('.product.updated', (e: any) => {
      addAssistantMessage(`✏️ Product updated: ${e.name}`)
    })
    .listen('.product.deleted', (e: any) => {
      addAssistantMessage(`🗑️ Product deleted (ID: ${e.id})`)
    })
    .listen('.products.listed', (e: any) => {
      const category = e.category ? ` in ${e.category}` : ''
      addAssistantMessage(`📋 Found ${e.count} product(s)${category}`)
    })
})

onBeforeUnmount(() => {
  echo.leaveChannel('assistant')
})

function addAssistantMessage(text: string) {
  messages.value.push({
    id: `assistant-${messageIdCounter++}`,
    role: 'assistant',
    parts: [{ type: 'text', text }]
  })
}

function updateLastAssistantMessage(text: string) {
  const lastMessage = messages.value[messages.value.length - 1]
  if (lastMessage && lastMessage.role === 'assistant') {
    lastMessage.parts = [{ type: 'text', text }]
  } else {
    addAssistantMessage(text)
  }
}

async function onSubmit() {
  if (!input.value.trim()) return

  const userMessage: Message = {
    id: `user-${messageIdCounter++}`,
    role: 'user',
    parts: [{ type: 'text', text: input.value }]
  }
  
  messages.value.push(userMessage)
  const prompt = input.value
  input.value = ''
  status.value = 'loading'

  try {
    await $fetch('/api/assistant', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: { prompt }
    })
  } catch (error) {
    console.error('Error sending message:', error)
    status.value = 'error'
    addAssistantMessage('❌ Error processing your request')
  }
}
</script>
