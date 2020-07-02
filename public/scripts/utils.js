export const hasAllFeatures = () => {
  // Basically IE11
  return window.fetch && window.Symbol;
}

export const loadScript = src => {
  return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.onload = resolve
      script.onerror = reject
      script.src = src
      document.head.append(script)
  })
}