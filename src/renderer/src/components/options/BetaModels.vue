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
      selectedValue: this.data.sData.selectModel,
      models: [
        { value: 10, text: 'Gemini-1.5-flash-8b-exp-0827' },
        { value: 11, text: 'gemini-exp-1206' },
        { value: 20, text: 'gemini-2.0-flash-exp' },
        { value: 30, text: 'learnlm-1.5-pro-experimental' }
      ]
    }
  },
  watch: {
    'data.sData.selectModel'(val: string) {
      this.selectedValue = val
    }
  },
  methods: {
    emitSelectValue() {
      this.$emit('select-value', this.selectedValue)
    }
  }
})
</script>
<template>
  <select id="selectModel" v-model="selectedValue" @change="emitSelectValue">
    <option disabled value="">모델을 선택 해주세요 !</option>
    <option v-for="model in models" :key="model.value" :model="model.text">
      {{ model.text }}
    </option>
  </select>
</template>
