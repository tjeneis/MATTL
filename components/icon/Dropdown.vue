<template>
  <svg
    class="dropdown"
    viewBox="0 0 7 12"
  >
    <path
      d="M5.536 7.68c.237-.237.617-.62.856-.858l.43-.429a.606.606 0 0 0 0-.857l-.43-.43-.856-.856L1.464.179A.604.604 0 0 0 .607.177l-.43.431a.605.605 0 0 0 .002.856l4.07 4.072a.607.607 0 0 1 0 .857l-4.07 4.07a.604.604 0 0 0-.002.858l.43.43a.607.607 0 0 0 .857 0l4.072-4.072z"
      fill-rule="evenodd"
    />
  </svg>
</template>

<script>
export default {
  name: 'Dropdown'
}
</script>

<style>
.dropdown {
  fill: currentColor;
  transform: rotate(90deg);
  width: 7px;
}
</style>
