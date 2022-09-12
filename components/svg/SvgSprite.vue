<template>
  <svg width="0" height="0" style="display: none;" v-html="$options.svgSprite"/>
</template>

<script lang="ts">
import {Component, Vue} from "@/tools/version-types";

const svgContexts = [
  require.context(
      '!svg-inline-loader?' +
      'removeTags=true' + // remove title tags, etc.
      '&removeSVGTagAttrs=true' + // enable removing attributes
      // '&removingTagAttrs=fill' + // remove fill attributes
      '!@/assets/icons', // search this directory
      true, // search subdirectories
      /\w+\.svg$/i // only include SVG files
  ),
  require.context(
      '!svg-inline-loader?' +
      'removeTags=true' + // remove title tags, etc.
      '&removeSVGTagAttrs=true' + // enable removing attributes
      // '&removingTagAttrs=fill' + // remove fill attributes
      '!@/_shared/assets/icons', // search this directory
      true, // search subdirectories
      /\w+\.svg$/i // only include SVG files
  )
]

const svgObjectList = svgContexts.map(svgContext => {
  return svgContext.keys().map((path) => {
    // get SVG file content
    const content = svgContext(path)

    return {
      content,
      path
    }
  })
}).flat();

const symbols = svgObjectList.map((el, index, arr) => {
  if (arr.filter(anotherSvgObject => anotherSvgObject.path === el.path).length > 1) {
    throw new Error('Конфликт иконок! В разных папках содержаться иконки с одинаковым именем. Имя: ' + el.path);
  }

  // extract icons id from filename
  const id = el.path.replace(/^\.\/(.*)\.\w+$/, '$1')
  // replace svg tags with symbol tags and id attribute
  return el.content
      .replace(/stroke="[^(none)].*?"/g, 'stroke="currentColor"')
      .replace(/fill="[^(none)].*?"/g, 'fill="currentColor"')
      .replace('<svg', `<symbol id="${id}"`).replace('svg>', 'symbol>')
});


@Component({
  name: 'SvgSprite',
  svgSprite: symbols.join('\n'), // concatenate all symbols into $options.svgSprite
})
export default class VueSpriteComponent extends Vue {
}
</script>
