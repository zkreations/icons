// eslint-disable-next-line no-unused-vars, no-undef
const list = new List('js-icons', {
  valueNames: ['icon-name', 'icon-tags']
})

const loadScript = (src) => new Promise((resolve, reject) => {
  const script = document.createElement('script')
  script.src = src
  script.onload = resolve
  script.onerror = reject
  document.head.appendChild(script)
})

const copied = (content, message) => {
  const text = content.querySelector('.icon-name')

  if (!text) {
    return
  }

  content.classList.add('copied')
  text.innerText = message.action

  // Cancelar el temporizador anterior (si existe)
  if (content.timeoutId) {
    clearTimeout(content.timeoutId)
  }

  // Crear un nuevo temporizador
  content.timeoutId = setTimeout(function () {
    content.classList.remove('copied')
    text.innerText = message.original
    content.timeoutId = null // Limpiar el id del temporizador
  }, 2000)
}

const copyCode = (clipboard, blocks) => {
  fetch('/assets/svg-sprite.svg')
    .then(response => response.text())
    .then(svgData => {
      const svg = document.createElement('div')
      svg.innerHTML = svgData

      blocks.forEach(function (el) {
        const button = el.querySelector('.copy-name')
        const buttonSvg = el.querySelector('.copy-svg')
        const buttonDownload = el.querySelector('.action-download')
        const name = el.querySelector('.icon-name')
        const iconId = name.innerText

        button.onclick = () => {
          clipboard.writeText(iconId).then(function () {
            copied(el, {
              action: 'Copied name!',
              original: iconId
            })
          })
        }

        buttonSvg.onclick = () => {
          const content = svg.querySelector(`#${iconId}`)
          const cleanSvg = `<svg class="i i-${iconId}" viewBox="0 0 24 24">${content.innerHTML}</svg>`
          clipboard.writeText(cleanSvg).then(function () {
            copied(el, {
              action: 'Copied code!',
              original: iconId
            })
          })
        }
        buttonDownload.onclick = () => {
          copied(el, {
            action: 'Downloaded!',
            original: iconId
          })
        }
      })
    })
    .catch(error => {
      console.error(error)
    })
}

const blocks = document.querySelectorAll('.copy-block')

if (navigator && navigator.clipboard) {
  copyCode(navigator.clipboard, blocks)
} else {
  loadScript('https://cdn.jsdelivr.net/npm/clipboard-polyfill@3/dist/main/clipboard-polyfill.min.js')
    .then(() => {
      // eslint-disable-next-line no-undef
      copyCode(clipboard, blocks)
    })
    .catch(console.error)
}

const toggleMode = () => {
  const mode = localStorage.getItem('mode')
  const isDark = mode === 'dark'

  if (isDark) {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('mode', 'light')
  } else {
    document.documentElement.classList.add('dark')
    localStorage.setItem('mode', 'dark')
  }
}

const toggleButton = document.querySelector('.toggle-mode')
toggleButton.addEventListener('click', toggleMode)
