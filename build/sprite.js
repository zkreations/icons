const SVGSpriter = require('svg-sprite')
const path = require('path')
const glob = require('glob')
const fs = require('fs')

const cwd = path.join(__dirname, '../icons')
const files = glob.sync('*.svg', { cwd })

const spriter = new SVGSpriter({
  svg: {
    namespaceClassnames: false,
    xmlDeclaration: false,
    transform: [
      function (svg) {
        return svg.replace(/<(symbol).*?id="([^"]*?)".*?>/g, '<symbol viewBox="0 0 24 24" id="$2">')
      }
    ]
  }
})

function addIconsToSpriter (spriter, cwd, files) {
  files.forEach(file => {
    const filePath = path.join(cwd, file)
    spriter.add(filePath, file, fs.readFileSync(filePath, 'utf-8'))
  })
  return spriter
}

function writeSprites (sprites) {
  for (const type in sprites.symbol) {
    if (Object.prototype.hasOwnProperty.call(sprites.symbol, type)) {
      const spritePath = sprites.symbol[type].path
      fs.mkdirSync(path.dirname(spritePath), { recursive: true })
      fs.writeFileSync(spritePath, sprites.symbol[type].contents)
    }
  }
}

function generateSprites () {
  const spritesOutput = {
    symbol: {
      dest: './variants/',
      sprite: 'svg-sprite.svg'
    }
  }

  addIconsToSpriter(spriter, cwd, files).compile(spritesOutput, (error, result) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }
    writeSprites(result)
  })
}

generateSprites()
