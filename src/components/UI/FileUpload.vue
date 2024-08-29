<template>
  <div
    :class="['drop', isDrag ? 'drop-active' : '']"
    @drop="drop"
    @click="activateInput"
    @dragover="dragover"
    @dragleave="dragleave"
  >
    <input
      ref="fileInput"
      class="drop-input"
      :id
      type="file"
      multiple
      @change="change($event)"
      accept="image/*, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .csv"
    />
    <label class="drop-label" :for="id" @click="$event.preventDefault()"
      ><u>Выберите файл</u> или перетащите его</label
    >
  </div>
  <div class="drop-list">
    <transition-group>
      <div class="drop-list__item" v-for="(item, i) in files" :key="item.name">
        {{ item.name.substring(0, 5) + '....' + item.name.split('.').pop() }}
        <button class="drop-list__item-button" @click="removeFile(i)" />
      </div>
    </transition-group>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['update:files'])

const files = ref<Array<File>>([])
const id = ref<string>('file_' + Date.now())
const fileInput = ref<null | { click: () => null }>(null)
const isDrag = ref<boolean>(false)
const sizeLimit = 21000000 // ~20mb

const drop = (event: DragEvent) => {
  event.preventDefault()
  const filesEvent = event.dataTransfer?.files
  Array.from(filesEvent as FileList).forEach((fileItem: File) => {
    if (
      fileItem.type.indexOf('image/') !== 0 ||
      fileItem.type.indexOf('.csv') !== 0 ||
      fileItem.type.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') !==
        0
    ) {
      if (fileItem.size < sizeLimit) {
        files.value.push(fileItem)
      }
    }
  })
  emit('update:files', files.value)
}

const change = (event: Event) => {
  const el = event.target as HTMLInputElement
  Array.from(el.files as FileList).forEach((fileItem: File) => {
    if (fileItem.size < sizeLimit) {
      files.value.push(fileItem)
    }
  })
  emit('update:files', files.value)
}

const dragover = (event: Event) => {
  event.preventDefault()
  isDrag.value = true
}

const dragleave = () => {
  isDrag.value = false
}

const activateInput = () => {
  fileInput.value?.click()
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
  emit('update:files', files.value)
}
</script>
<style lang="scss" scoped>
.drop {
  padding: 20px;
  border-radius: 8px;
  border: 2px dashed #616161;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  transition: all 0.3s ease;
  flex-direction: column;
  gap: 12px;
  &-active {
    border: 2px dashed #4527a0;
  }
  &-input {
    display: none;
  }
  &-label {
    & u {
      font-weight: bold;
    }
  }
  &-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: #616161;
    height: 300px;
    overflow-y: auto;
    &__item {
      padding: 20px;
      border: 1px solid #616161;
      border-radius: 6px;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      &-button {
        outline: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        border: 1px solid #4527a0;
        color: white;
        border-radius: 100%;
        height: 30px;
        width: 30px;
        background-color: transparent;
        background-image: url('@/assets/icons/close.svg');
        background-size: 14px 14px;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
