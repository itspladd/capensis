export function delayAction(callback = () => {}, delay = 500) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(callback())
    }, delay)
  })
}