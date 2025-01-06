<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const test = () => {
      console.log('test')
    }
    return {
      test
    }
  }
})
</script>
<template>
  <div>
    <button @click="test">component test</button>
    <textarea id="cb" name="chatBox"></textarea>
  </div>
</template>
