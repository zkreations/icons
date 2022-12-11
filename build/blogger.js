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
      <b:case value='${iconName}'/>${svgContent}`

  return itemTemplate
}

(async () => {
  try {

    const dest = path.join(dir.variants, "svg-includable.xml")
    let includable = `<b:includable id='i:svg'>
  <svg expr:class='"i i-" + data:icon' viewBox='0 0 24 24'>
    <b:class cond='data:class' expr:name='data:class'/>
    <b:attr cond='data:root' expr:value='data:root' name='class'/>
    <b:attr cond='data:viewbox' expr:value='data:viewbox' name='viewBox'/>
    <b:attr expr:value='data:fill' name='fill'/>
    <b:attr expr:value='data:width' name='width'/>
    <b:attr expr:value='data:height' name='height'/>
    <b:switch var='data:icon'>`

    const files = await fs.readdir(dir.icons)
    const items = await Promise.all( files.map(file => processFile(file)) )

    includable += items.join('')
    includable += `
      <b:default/><circle cx="12" cy="12" r="10"/>
    </b:switch>
  </svg>
</b:includable>`

    fs.writeFile(dest, includable, 'utf8')

  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
