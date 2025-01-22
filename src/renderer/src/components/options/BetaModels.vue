<script lang="ts">
import { data } from '@renderer/types/interfaces'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Models',
  props: {
    data: {
      type: Object as () => data,
      required: true
    }
  },
  emits: ['select-value'],
  data() {
    return {
      selectedValue: ''
    }
  }
})
</script>
<template>
  <select id="selectModel" v-model="selectedValue" @change="$emit('select-value', selectedValue)">
    <option disabled value="">모델을 선택 해주세요 !</option>
    <option value="10">Gemini-1.5-flash-8b-exp-0827</option>
    <option value="11">gemini-exp-1206</option>
    <option value="20">gemini-2.0-flash-exp</option>
    <option value="30">learnlm-1.5-pro-experimental</option>
  </select>
</template>
