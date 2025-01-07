<script lang="ts">
/*** TODO
 * - Get Data from Parent Component
 * - Show Chat Log from ChatBox Map
 */
export default {
  props: {
    message: String
  },
  data() {
    return {
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
</template>

<style scoped>
#chatBox {
  height: 200px;
  width: 300px;
  overflow-y: scroll;
  background-color: white;
  border: 1px solid white;
}
</style>
