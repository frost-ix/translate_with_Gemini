<script lang="ts">
/*** TODO
 * - Get Data from Parent Component (Ok)
 * - Show Chat Log from ChatBox Map (Not working)
 */
export default {
  props: {
    message: String
  },
  data(): {
    inputMessage: string
    chatBox: Map<number, string>
    index: number
  } {
    return {
      inputMessage: '',
      chatBox: new Map<number, string>(),
      index: 0
    }
  },
  methods: {
    chatLog(isClean: boolean) {
      if (isClean) {
        this.chatBox.clear()
        this.index = 0
        return
      } else {
        const message = this.message as string
        this.chatBox.set(this.index, message)
        this.index++
      }
    }
  }
}
</script>
<template>
  <div id="chatBox">
    <div v-for="item in chatBox" :key="item[0]">{{ item[0] }}: {{ item[1] }}</div>
  </div>
  <form @submit.prevent="chatLog(false)">
    <input v-model="inputMessage" type="text" />
    <button type="submit">Send</button>
  </form>
</template>

<style scoped>
@import '../assets/css/chatbox.css';
</style>
