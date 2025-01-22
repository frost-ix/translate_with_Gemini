<script lang="ts">
/*** TODO
 * - Get Data from Parent Component (Ok)
 * - Show Chat Log from ChatBox Map
 */
import { defineComponent } from 'vue'
import ChatMessage from './ChatMessage.vue'
export default defineComponent({
  name: 'ChatBox',
  components: {
    ChatMessage
  },
  props: {
    messages: {
      type: Array as () => { id: number; message: string; isLeft: boolean }[],
      required: true
    }
  }
})
</script>
<template>
  <!-- 채팅박스 -->
  <div id="chatBoxLayer">
    <div id="chatBox">
      <ChatMessage
        v-for="msg in messages"
        :key="msg.id"
        :message="msg.message"
        :is-left="msg.isLeft"
      />
    </div>
  </div>
  <!-- 구분선 -->
  <div id="cutLine"></div>
</template>

<style scoped>
@import '../../assets/css/chatBox.css';
</style>
