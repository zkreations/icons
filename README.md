![cover](https://raw.githubusercontent.com/zkreations/icons/main/.github/cover.png)

<p align="center">Iconos en formato 24x24 diseñados a mano línea por línea, tomando decisiones inteligentes necesarias para obtener el menor código posible.<p>

<p align="center">
  <a href="https://icons.zkreations.com/"><strong> Demo en vivo &rarr;</strong></a>
</p>

<p align="center">
  <a href="https://github.com/zkreations/icons/releases"><img src="https://img.shields.io/npm/v/@zkreations/icons" alt="Release"></a>
  <a href="https://github.com/zkreations/icons/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@zkreations/icons" alt="LICENSE"></a>
</p>


## Sobre estos iconos

Los iconos en SVG son escalables, pesan mucho menos que las imágenes, son editables con CSS y mucho más. Sin embargo, el problema principal (al menos para mí) es su código, el cual suele ser muy grande.

Por esto he diseñado manualmente el código de cada icono con el fin de tomar **decisiones inteligentes** para lograr la menor cantidad de código posible. Esta labor fue más fácil de realizar gracias a la herramienta [svg-path-editor](https://yqnn.github.io/svg-path-editor/). He nombrado este pack "Meteor icons" y es de **código abierto**.

![github-path](https://raw.githubusercontent.com/zkreations/icons/main/.github/github-path.png)


## Empezando

El siguiente código CSS ayuda a mantener la etiqueta SVG más limpia, también te permitirá personalizar rápidamente los iconos:

```css
.i {
  stroke-width: var(--i-stroke,2);
  width: var(--i-size,20px);
  height: var(--i-size,20px);
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
```

Puedes configurar el tamaño y grosor con variables CSS:

| Variable         | Default  
| ---------------- | -------- 
| `--i-stroke`     | `2`      
| `--i-size`       | `20px`   


## SVG inline

Elige cualquier icono de la [página de demostración](https://icons.zkreations.com/), pulsa la opción "**Copy code**" y pega el código en donde lo requieras en tu proyecto, eso es todo. 

## SVG Sprite

Agrega a tu proyecto el archivo [svg-sprite.svg](https://github.com/zkreations/icons/blob/main/variants/svg-sprite.svg). Ahora, en cualquier parte, incluye los iconos usando este código, reemplazando "anchor" por el nombre del icono deseado, que puedes copiar de la [página de demostración](https://icons.zkreations.com/):

```
<svg class="i">
  <use href="svg-sprite.svg#github"/>
</svg>
```
> Reemplaza **github** por el nombre de un icono de la [página de demostración](https://icons.zkreations.com/).

## Pug mixin

Para proyectos creados con [pugjs](https://github.com/pugjs/pug), agrega el archivo [svg-mixin.pug](https://github.com/zkreations/icons/blob/main/variants/svg-mixin.pug) a tu proyecto. Tras incluirlo el mixin pondrás llamarlo de esta manera:

```pug
+svg('github')
```
> Reemplaza **github** por el nombre de un icono de la [página de demostración](https://icons.zkreations.com/).

También cuentas con un segundo parámetro, que te permite reemplazar la clase `i i-icon` por otra, por ejemplo:

```pug
+svg('github', 'mi-clase')
```

También puedes pasar cualquier atributo al icono, por ejemplo:

```pug
+svg('github').foo#foo(data-example='foo')
```

## Blogger

Si tu proyecto es una plantilla de Blogger, agrega la inclusión [svg-includable.xml](https://github.com/zkreations/icons/blob/main/variants/svg-includable.xml). Para incluirlo necesitarás etiquetas `b:defaultmarkups`, por ejemplo:

```xml
<b:defaultmarkups>
  <b:defaultmarkup type="Common">
    <!-- svg-includable.xml aquí -->
  </b:defaultmarkup>
</b:defaultmarkups>
```

Tras la inclusión, podrás llamar a cualquier icono en cualquier parte de la plantilla usando una etiqueta `b:include`, por ejemplo:

```xml
<b:include name='i:svg' data='{ icon: "github" }'/>
```

> Reemplaza **github** por el nombre de un icono de la [página de demostración](https://icons.zkreations.com/).

La inclusión cuenta con algunos parámetros que te permitirán personalizar la etiqueta SVG resultante. Los parámetros disponibles son los siguientes:

| Parámetro      | Descripción 
| -------------- | ------------
| `icon`         | Nombre del icono
| `class`        | Clases adicionales
| `root`         | Reemplaza todas las classes
| `viewbox`      | Atributo `viewbox`
| `fill`         | Atributo `fill`
| `width`        | Atributo `width`
| `height`       | Atributo `height`

Aquí un ejemplo agregando algunos atributos en la inclusión de Blogger:

```xml
<b:include name='i:svg' data='{ icon: "github", width: "50px", height: "50px" }'/>
```

## Contribuir

Todos los iconos son diseñados por [Daniel Abel](https://twitter.com/danieI_abel), pero puedes ayudar a mantener o mejorar este proyecto tomando en cuenta los siguientes puntos:

- Mejorar el diseño y consistencia de los iconos
- Mantener el código SVG lo más pequeño posible
- En caso de solicitar un icono, deja un ejemplo claro
- En caso de aportar un icono, debes ser el autor original

Si lo deseas, también puedes ayudarme para mantener este y más proyectos [invitándome un café](https://ko-fi.com/zkreations) ☕. Te lo agradeceré mucho 👏.

## License

**zkreations icons** is licensed under the MIT License