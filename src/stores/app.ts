import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IData } from '@/types/app'

export const useAppStore = defineStore('app', {
  state: () => ({
    data: {
      otp: '',
      text: '',
      files: []
    } as IData
  }),
  actions: {
    saveData(payload: IData) {
      this.data = payload
      console.log(payload, '<-- Data saved')
    }
  }
})
