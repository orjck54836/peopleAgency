export function useBrandLine() {
  const route = useRoute()
  const currentLine = computed<'study' | 'work'>(() =>
    String(route.name).includes('work') ? 'work' : 'study'
  )
  return { currentLine }
}