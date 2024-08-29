<template>
  <section class="container">
    <h2>Первый этап</h2>
    <TextField
      v-model:value="data.otp"
      placeholder="Введите пароль"
      label="One Time Password"
      type="text"
      :maxlength="4"
    ></TextField>
    <TextArea
      v-model:value="data.text"
      placeholder="Введите текст"
      label="Текстовое поле"
    ></TextArea>
    <FileUpload @update:files="data.files = $event"></FileUpload>
    <AppButton class="bottom-button" @click="onSave">Отправить</AppButton>
  </section>
</template>
<script setup lang="ts">
import TextArea from '@/components/UI/TextArea.vue'
import { ref } from 'vue'
import TextField from '@/components/UI/TextField.vue'
import FileUpload from '@/components/UI/FileUpload.vue'
import AppButton from '@/components/UI/AppButton.vue'
import type { IData } from '@/types/app'
import { useAppStore } from '@/stores/app'
import { useRouter } from 'vue-router'

const data = ref<IData>({
  otp: '',
  text: '',
  files: []
})
const store = useAppStore()
const router = useRouter()

const isValidValue = (str: string) => {
  return !/^(.)\1+$/.test(str)
}

const onSave = async () => {
  if (!isValidValue(data.value.otp)) return
  if (data.value.otp.length <= 3) return
  if (!/^\d+$/.test(data.value.otp)) return
  if (data.value.text.length === 0) return
  if (data.value.files.length === 0) return

  await store.saveData(data.value)
  router.push('/geo')
}
</script>
<style lang="scss" scoped>
.bottom-button {
  position: absolute;
  bottom: 0;
}
</style>
