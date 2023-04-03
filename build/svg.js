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
  icons: path.join(__dirname, '../icons/')
}

async function processFile (file) {
  const filepath = path.join(dir.icons, file)
  const rawSvg = await fs.readFile(filepath, 'utf8')

  const optimizedSvg = await optimize(rawSvg, svgoConfig)

  const $ = await cheerio.load(optimizedSvg.data, {
    xml: { xmlMode: true }
  })

  const svgFile = $('svg')

  for (const [attr, value] of Object.entries(svgAttr)) {
    svgFile.removeAttr(attr)
    svgFile.attr(
      attr,
      attr === 'class' ? `i i-${path.basename(file, '.svg')}` : value
    )
  }

  const resultSvg = svgFile.toString()

  if (resultSvg !== rawSvg) {
    await fs.writeFile(filepath, resultSvg, 'utf8')
  }
}

(async () => {
  try {
    const files = await fs.readdir(dir.icons)
    await Promise.all(files.map(file => processFile(file)))
    console.log('SVG files processed')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
