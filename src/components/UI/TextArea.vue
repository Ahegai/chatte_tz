<template>
  <div class="textarea">
    <label class="textarea-label" :for="id">{{ label }}</label>
    <textarea :id class="textarea-body" v-model="model" :placeholder="placeholder" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const model = defineModel('value', {
  type: String
})

defineProps<{
  placeholder: string
  label: string
}>()

const id = ref<string>('textarea_' + Date.now())
</script>
<style lang="scss" scoped>
.textarea {
  &-label {
    display: block;
    color: white;
    margin-bottom: 12px;
    font-size: 14px;
    padding-left: 6px;
  }
  &-body {
    color: #616161;
    outline: none;
    border: 2px solid #4527a0;
    border-radius: 4px;
    background-color: #181818;
    min-height: 80px;
    width: 100%;
    box-sizing: border-box;
    transition: all 0.3s ease;
    padding: 8px;
    resize: none;
    &:focus {
      border: 2px solid #5e35b1;
      background: #212121;
      color: white;
    }
  }
}
</style>
