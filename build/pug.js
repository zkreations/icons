'use strict';

const fs = require('fs').promises
const path = require('path')
const cheerio = require('cheerio')

const dir = {
  icons: path.join(__dirname, '../icons/'),
  variants: path.join(__dirname, '../variants/'),
}

async function processFile(file) {
  const filepath = path.join(dir.icons, file)
  const iconName = path.basename(file, path.extname(file))
  const svg = await fs.readFile(filepath, 'utf8')

  const $ = await cheerio.load(svg, {
    xml: { xmlMode: true }
  })

  const svgFile = $('svg').children()

  const svgContent = svgFile.toString()

  const itemTemplate = `
      when "${iconName}"
        ${svgContent}`

  return itemTemplate
}

(async () => {
  try {

    const dest = path.join(dir.variants, "svg-mixin.pug")
    let mixinPug = `//- repo: github.com/zkreations/icons
mixin svg(icon)
  svg(class="i i-" + icon, viewBox='0 0 24 24')&attributes(attributes)
    case icon
      default
        <circle cx="12" cy="12" r="10"/>`

    const files = await fs.readdir(dir.icons)
    const items = await Promise.all( files.map(file => processFile(file)) )

    fs.writeFile(dest, (mixinPug + items.join('')), 'utf8')

  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()