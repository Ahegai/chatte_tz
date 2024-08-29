<template>
  <section class="container" v-if="!isLoading">
    <h2>Второй этап</h2>
    <div>
      <h4>OTP:</h4>
      <span>{{ store.data.otp }}</span>
    </div>
    <div>
      <h4>Текст:</h4>
      <span>{{ store.data.text }}</span>
    </div>
    <div>
      <h4>Файлы:</h4>
      <div class="list">
        <span class="list-item" v-for="item in store.data.files" :key="item.name">
          {{ item.name.substring(0, 5) + '....' + item.name.split('.').pop() }}
        </span>
      </div>
    </div>
    <div class="map" id="map">
      <GoogleMap :api-key="apiKey" style="width: 100%; height: 500px" :center="center" :zoom="15">
        <Marker :options="{ position: center }" />
        <CustomControl position="BOTTOM_CENTER">
          <button class="map-btn" @click="setUserLocation">📍</button>
        </CustomControl>
      </GoogleMap>
    </div>
  </section>
  <section v-else class="container">
    <AppLoader></AppLoader>
  </section>
</template>
<script setup lang="ts">
import { Capacitor } from '@capacitor/core'
import { Geolocation } from '@capacitor/geolocation'
import { GoogleMap, Marker, CustomControl } from 'vue3-google-map'
import { onMounted, ref } from 'vue'
import AppLoader from '@/components/UI/AppLoader.vue'
import { useAppStore } from '@/stores/app'
import { useRouter } from 'vue-router'

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY
const center = ref<{
  lat: number
  lng: number
}>({ lat: 40.689247, lng: -74.044502 })
const isLoading = ref<boolean>(false)
const store = useAppStore()
const router = useRouter()

const setUserLocation = async () => {
  isLoading.value = true
  if (Capacitor.getPlatform() === "web") {
    await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    }).then((res: any) => {
      center.value.lng = res.coords.longitude
      center.value.lat = res.coords.latitude
    })
  } else {
    const coord = await Geolocation.getCurrentPosition();
    center.value.lng = coord.coords.longitude
    center.value.lat = coord.coords.latitude
  }
  isLoading.value = false
}

onMounted(async () => {
  isLoading.value = true
  if (store.data.text.length <= 0) {
    await router.push('/')
  }
  await setUserLocation()
  setTimeout(() => {
    console.log('loading')
    isLoading.value = false
  }, 2000)
})
</script>
<style lang="scss" scoped>
.map {
  &-btn {
    box-sizing: border-box;
    background: white;
    height: 40px;
    width: 40px;
    border-radius: 2px;
    border: 0px;
    margin: 10px;
    padding: 0px;
    font-size: 1.25rem;
    text-transform: none;
    appearance: none;
    cursor: pointer;
    user-select: none;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
    overflow: hidden;
  }
}
.list {
  display: flex;
  width: 100%;
  overflow-x: auto;
  &-item {
    margin-right: 8px;
    border: 1px solid #616161;
    border-radius: 6px;
    color: white;
    padding: 4px 8px;
    height: max-content;
    width: max-content;
  }
}
</style>
