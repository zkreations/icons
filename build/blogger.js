const fs = require('fs').promises
const path = require('path')
const cheerio = require('cheerio')

const dir = {
  icons: path.join(__dirname, '../icons/'),
  variants: path.join(__dirname, '../variants/')
}

async function processSvgFile (file) {
  const filePath = path.join(dir.icons, file)
  const iconName = path.basename(file, path.extname(file))
  const svg = await fs.readFile(filePath, 'utf8')

  const $ = cheerio.load(svg, { xml: { xmlMode: true } })
  const svgContent = $('svg').children().toString()
  // add whitespace to make the output more readable
  const itemTemplate = `\n      <b:case value='${iconName}'/>${svgContent}`

  return itemTemplate
}

(async function generateSvgIncludableFile () {
  try {
    const files = await fs.readdir(dir.icons)
    const items = await Promise.all(files.map(file => processSvgFile(file)))
    const distDir = path.join(dir.variants, 'svg-includable.xml')

    let includable = `<b:includable id='i:meteor'>
  <svg expr:class='"i i-" + data:icon' viewBox='0 0 24 24'>
    <b:class cond='data:class' expr:name='data:class'/>
    <b:attr cond='data:root' expr:value='data:root' name='class'/>
    <b:attr cond='data:viewbox' expr:value='data:viewbox' name='viewBox'/>
    <b:attr expr:value='data:fill' name='fill'/>
    <b:attr expr:value='data:width' name='width'/>
    <b:attr expr:value='data:height' name='height'/>
    <b:switch var='data:icon'>`

    includable += items.join('')
    includable += `
      <b:default/><circle cx="12" cy="12" r="10"/>
    </b:switch>
  </svg>
</b:includable>`

    await fs.writeFile(distDir, includable, 'utf8')
    console.log('Blogger includable file generated')
  } catch (error) {
    console.error(`An error occurred while generating the Blogger includable file: ${error.message}`)
    process.exit(1)
  }
})()
