const list = new List('js-icons', {
  valueNames: [ 'icon-name', 'icon-tags' ]
})

const loadScript = (src) => new Promise((resolve, reject) => {
  let script = document.createElement('script')
  script.src = src
  script.onload = resolve
  script.onerror = reject
  document.head.appendChild(script)
})

const copied = (button) => {
  let restore = button.innerText

  button.innerText = "Copied!"
  setTimeout(function () {
    button.innerText = restore
  }, 2000);
}

const copyCode =  (clipboard, blocks) => {
  blocks.forEach(function (el) {
    const button = el.querySelector(".copy-name")
    const buttonSvg = el.querySelector(".copy-svg")
    const name = el.querySelector(".icon-name")
    const content = el.querySelector("svg.i")

    if(name) {
      button.onclick = () => {
        clipboard.writeText(name.innerText).then(function () {
          copied(button)
        });
      }
      buttonSvg.onclick = () => {
        const svg = `<svg class="i i-${name.innerText}" viewBox="0 0 24 24">${content.innerHTML}</svg>`
        clipboard.writeText(svg).then(function () {
          copied(buttonSvg)
        });
      }
    } else {
      
      const targetCode = document.getElementById("npm")
      const buttonCode = document.getElementById("copyNpm")

      buttonCode.onclick = () => {
        clipboard.writeText(targetCode.innerText).then(function () {
          buttonCode.setAttribute('aria-label', 'Copied!');
          setTimeout(function () {
            buttonCode.setAttribute('aria-label', 'Copy');
          }, 2000);
        });
      }
    }

  });
}


const blocks = document.querySelectorAll(".copy-block")

if (navigator && navigator.clipboard) {
  copyCode(navigator.clipboard, blocks)
} else {
  loadScript('https://cdn.jsdelivr.net/npm/clipboard-polyfill@3/dist/main/clipboard-polyfill.min.js')
    .then(() => {
      copyCode(clipboard, blocks)
    })
    .catch(console.error)
}