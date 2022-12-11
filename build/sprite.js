'use strict';

const SVGSpriter = require('svg-sprite');

const path = require('path');
const glob = require('glob');
const fs = require('fs');

const cwd = path.join(__dirname, '../icons');
const files = glob.sync('*.svg', { cwd });

const spriter = new SVGSpriter({
  svg: {
    namespaceClassnames: false,
    xmlDeclaration: false,
    transform: [
      function(svg) {
        return svg.replace(/<(symbol).*?id="([^"]*?)".*?>/g, '<symbol viewBox="0 0 24 24" id="$2">');
      }
    ]
  },
});

function addFixtureFiles(spriter, files) {
  files.forEach(file => {
    spriter.add(
      path.resolve(path.join(cwd, file)),
      file,
      fs.readFileSync(path.join(cwd, file), 'utf-8')
    );
  });
  return spriter;
}

addFixtureFiles(spriter, files).compile({
  symbol: {
    dest: "./variants/",
    sprite: "svg-sprite.svg"
  }
}, (error, result) => {
  for (const type in result.symbol) {
    if (Object.prototype.hasOwnProperty.call(result.symbol, type)) {
      fs.mkdirSync(path.dirname(result.symbol[type].path), { recursive: true });
      fs.writeFileSync(result.symbol[type].path, result.symbol[type].contents);
    }
  }
});