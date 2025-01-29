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
  float: left;
  background-color: #ccc;
}

.message-right {
  float: right;
  background-color: #f0f0f0;
}
</style>
