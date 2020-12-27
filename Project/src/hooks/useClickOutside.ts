import { ref, onMounted, onUnmounted, Ref } from 'vue'
const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false)
  const handleOutSide = (event: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(event.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handleOutSide)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handleOutSide)
  })
  return isClickOutside
}
export default useClickOutside
