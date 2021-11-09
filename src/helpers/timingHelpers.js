export function delayPromise(delay = 500, callback = () => {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(callback())
    }, delay)
  })
}