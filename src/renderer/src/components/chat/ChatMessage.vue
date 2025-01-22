<template>
  <div :class="{ 'message-left': isLeft, 'message-right': !isLeft }">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatMessage',
  props: {
    message: {
      type: String,
      required: true
    },
    isLeft: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped>
.message-left {
  /* 왼쪽 정렬 스타일 */
  float: left;
  background-color: #ccc;
}

.message-right {
  /* 오른쪽 정렬 스타일 */
  float: right;
  background-color: #f0f0f0;
}
</style>
