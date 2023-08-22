const { optimize } = require('svgo')
const svgoConfig = require('../svgo.config.json')
const fs = require('fs').promises
const path = require('path')
const cheerio = require('cheerio')

const svgAttr = {
  class: '',
  viewBox: '0 0 24 24',
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round'
}

const dir = {
  icons: path.join(__dirname, '../icons/'),
  variants: path.join(__dirname, '../variants/')
}

async function processFile (file) {
  const filepath = path.join(dir.icons, file)
  const rawSvg = await fs.readFile(filepath, 'utf8')

  const optimizedSvg = await optimize(rawSvg, svgoConfig)

  const $ = await cheerio.load(optimizedSvg.data, {
    xml: { xmlMode: true }
  })

  const svgFile = $('svg')
  const iconName = path.basename(file, '.svg')

  for (const [attr, value] of Object.entries(svgAttr)) {
    svgFile.removeAttr(attr)
    svgFile.attr(
      attr,
      attr === 'class' ? `i i-${iconName}` : value
    )
  }

  const resultSvg = svgFile.toString()
  const resultSvgContent = svgFile.children()
  const resultSvgContentString = resultSvgContent.toString()

  if (resultSvg !== rawSvg) {
    await fs.writeFile(filepath, resultSvg, 'utf8')
  }

  return {
    [iconName]: resultSvgContentString
  }
}

(async () => {
  try {
    const files = await fs.readdir(dir.icons)
    const iconData = await Promise.all(files.map(file => processFile(file)))
    const iconMap = Object.assign({}, ...iconData)

    await fs.writeFile(
      path.join(dir.variants, 'icons.json'),
      JSON.stringify(iconMap), 'utf8')

    console.log('SVG files processed and icons.json generated')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
