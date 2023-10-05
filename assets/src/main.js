// eslint-disable-next-line no-unused-vars, no-undef
const list = new List('js-icons', {
  valueNames: ['icon-name', 'icon-tags']
})

const clipboard = navigator.clipboard
const blocks = document.querySelectorAll('.copy-block')
const toggleButton = document.querySelector('.toggle-mode')
const filter = document.getElementById('search-filter')
const filterList = document.getElementById('js-search-filter')
const filterInput = document.getElementById('js-search-input')

function cloneAndOuterHTML (selector) {
  const element = document.querySelector(selector)
  return element ? element.cloneNode(true).outerHTML : ''
}

const SVG = {
  text: cloneAndOuterHTML('.i-text'),
  svg: cloneAndOuterHTML('.i-copy'),
  html: cloneAndOuterHTML('.i-brackets-angled'),
  download: cloneAndOuterHTML('.i-download')
}

const DefaultTimeout = 2000

const copied = (content, message) => {
  const text = content.querySelector('.icon-name')
  if (!text) return

  content.classList.add('copied')
  text.innerText = message.action

  if (content.timeoutId) {
    clearTimeout(content.timeoutId)
  }

  content.timeoutId = setTimeout(function () {
    content.classList.remove('copied')
    text.innerText = message.original
    content.timeoutId = null
  }, DefaultTimeout)
}

const copyText = (iconId, el) => {
  clipboard.writeText(iconId).then(() => {
    copied(el, {
      action: 'Copied name!',
      original: iconId
    })
  })
}

const copySvg = (iconId, el) => {
  const svg = el.querySelector('.icon-svg svg')
  const cleanSvg = `<svg class="i i-${iconId}" viewBox="0 0 24 24">${svg.innerHTML}</svg>`
  clipboard.writeText(cleanSvg).then(() => {
    copied(el, {
      action: 'Copied svg!',
      original: iconId
    })
  })
}

const copyHtml = (iconId, el) => {
  const html = `<i data-i="${iconId}"></i>`
  clipboard.writeText(html).then(() => {
    copied(el, {
      action: 'Copied html!',
      original: iconId
    })
  })
}

const downloadIcon = (iconId, el) => {
  copied(el, {
    action: 'Downloaded!',
    original: iconId
  })
}

blocks.forEach((el) => {
  const buttonName = el.querySelector('.copy-name')
  const buttonSvg = el.querySelector('.copy-svg')
  const buttonHtml = el.querySelector('.copy-html')
  const buttonDownload = el.querySelector('.action-download')
  const name = el.querySelector('.icon-name')
  const iconId = name.innerText

  buttonName.innerHTML = SVG.text
  buttonSvg.innerHTML = SVG.svg
  buttonHtml.innerHTML = SVG.html
  buttonDownload.innerHTML = SVG.download

  buttonName.onclick = () => copyText(iconId, el)
  buttonSvg.onclick = () => copySvg(iconId, el)
  buttonHtml.onclick = () => copyHtml(iconId, el)
  buttonDownload.onclick = () => downloadIcon(iconId, el)
})

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

toggleButton.addEventListener('click', toggleMode)

function filterMenu (button, target) {
  if (!button || !target) return

  button.addEventListener('click', () => {
    button.classList.toggle('is-active')
    target.classList.toggle('is-active')
  })

  const clickOutside = (event) => {
    if (!target.contains(event.target) && !button.contains(event.target)) {
      button.classList.remove('is-active')
      target.classList.remove('is-active')
    }
  }

  const filterItems = target.querySelectorAll('a')

  filterItems.forEach((item) => {
    item.addEventListener('click', () => {
      const searchValue = item.innerText

      if (searchValue === 'all') {
        filterInput.value = ''
        list.search()
        return
      }

      filterInput.value = searchValue
      list.search(item.innerText)
    })
  })

  document.addEventListener('click', clickOutside)
}

filterMenu(filter, filterList)

window.addEventListener('DOMContentLoaded', (event) => {
  document.body.classList.remove('preload')
})
