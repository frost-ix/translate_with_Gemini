<script lang="ts">
/*** TODO
 * - Get Data from Parent Component (Ok)
 * - Show Chat Log from ChatBox Map
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
        const res = prompt('채팅 기록을 전부 삭제 하시겠습니까? (Y/N)')
        if (res) {
          this.chatBox.clear()
          this.index = 0
          return
        } else {
          return
        }
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
  <!-- 채팅박스 -->
  <div id="chatBoxLayer">
    <div id="chatBox">
      <div v-for="item in chatBox" :key="item[0]">{{ item[0] }}: {{ item[1] }}</div>
    </div>
  </div>
  <!-- 구분선 -->
  <div id="cutLine"></div>
</template>

<style scoped>
@import '../assets/css/chatBox.css';
</style>
