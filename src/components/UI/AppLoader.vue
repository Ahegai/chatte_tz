<template>
  <div class="loader"></div>
</template>
<style lang="scss" scoped>
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid;
  border-color: white #0000;
  animation: l1 1s infinite;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@keyframes l1 {
  to {
    transform: rotate(0.5turn);
  }
}
</style>
