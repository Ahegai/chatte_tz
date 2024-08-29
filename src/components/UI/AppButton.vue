<template>
  <button class="button">
    <slot></slot>
  </button>
</template>
<style lang="scss">
.button {
  outline: none;
  border: 1px solid #4527a0;
  border-radius: 6px;
  height: 70px;
  width: 100%;
  background: #181818;
  color: white;
  transition: all 0.4s ease;
  &:hover {
    background: #4527a0;
  }
}
</style>
