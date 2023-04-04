![cover](https://raw.githubusercontent.com/zkreations/icons/main/.github/cover.png)

<p align="center">Meteor is an open-source icon pack, handcrafted at the code level, to achieve the highest possible optimization.<p>

<p align="center">
  <a href="https://icons.zkreations.com/"><strong> Demo en vivo &rarr;</strong></a>
</p>

<p align="center">
  <a href="https://github.com/zkreations/icons/releases"><img src="https://img.shields.io/npm/v/@zkreations/icons" alt="Release"></a>
  <a href="https://github.com/zkreations/icons/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@zkreations/icons" alt="LICENSE"></a>
</p>


## About these icons

SVG icons are scalable, weigh much less than images, are editable with CSS, and much more. However, the main problem (at least for me) is their code, which tends to be very large.

That's why I manually designed the code for each icon in order to make **smart decisions** to achieve the least amount of code possible. This task was made easier thanks to the [svg-path-editor](https://yqnn.github.io/svg-path-editor/) tool. I have named this pack "Meteor icons" and it is **open source**.

![github-path](https://raw.githubusercontent.com/zkreations/icons/main/.github/github-path.png)

## Installation

```
npm install meteor-icons
```

## Getting Started

The following CSS code helps to keep the SVG tag cleaner, and it will also allow you to quickly customize the icons:

```css
.i {
  stroke-width: var(--i-stroke, 2);
  width: var(--i-size, 20px);
  height: var(--i-size, 20px);
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
```

You can set the size and thickness with CSS variables:

| Variable         | Default  
| ---------------- | -------- 
| `--i-stroke`     | `2`      
| `--i-size`       | `20px`   


## Inline SVG

Choose any icon from the [demo page](https://icons.zkreations.com/), click "**Copy code**", and paste the code wherever you need it in your project, that's it.

## SVG Sprite

Add the [svg-sprite.svg](https://github.com/zkreations/icons/blob/main/variants/svg-sprite.svg) file to your project. Now, anywhere in your project, include the icons using this code:

```xml
<svg class="i i-github">
  <use href="svg-sprite.svg#github"/>
</svg>
```

> Replace **"github"** with the name of an icon from the [demo page](https://icons.zkreations.com/).

## Blogger

If your project is a Blogger template, add the [svg-includable.xml](https://github.com/zkreations/icons/blob/main/variants/svg-includable.xml) inclusion. To include it, you will need `b:defaultmarkups` tags, for example:

```xml
<b:defaultmarkups>
  <b:defaultmarkup type="Common">
    <!-- svg-includable.xml here -->
  </b:defaultmarkup>
</b:defaultmarkups>
```

After including it, you can call any icon anywhere in the template using a `b:include` tag, for example:

```xml
<b:include name='i:meteor' data='{ icon: "github" }'/>
```

> Replace **"github"** with the name of an icon from the [demo page](https://icons.zkreations.com/).

The inclusion has some parameters that allow you to customize the resulting SVG tag. The available parameters are:

| Parameter      | Description 
| -------------- | ------------
| `icon`         | Icon name
| `class`        | Additional classes
| `root`         | Replaces all classes
| `viewbox`      | `viewbox` attribute
| `fill`         | `fill` attribute
| `width`        | `width` attribute
| `height`       | `height` attribute

Here's an example adding some attributes to the Blogger inclusion:

```xml
<b:include name='i:meteor' data='{ icon: "github", width: "50px", height: "50px" }'/>
```

## Contributing

All icons are designed by [Daniel Abel](https://twitter.com/danieI_abel), but you can help maintain or improve this project by considering the following points:

- Improve the design and consistency of the icons
- Keep the SVG code as small as possible
- In case of requesting an icon, leave a clear example
- In case of contributing an icon, you must be the original author

If you want, you can also help me maintain this and more projects by [buying me a coffee](https://ko-fi.com/zkreations) ☕. I will appreciate it very much 👏.

## License

**Meteor icons** is licensed under the MIT License