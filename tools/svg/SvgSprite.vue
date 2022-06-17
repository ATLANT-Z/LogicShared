<template>
  <svg width="0" height="0" style="display: none;" v-html="$options.svgSprite"/>
</template>
фц
<script lang="ts">
import {Options, Vue} from "vue-class-component";

const svgContext = require.context(
    '!svg-inline-loader?' +
    'removeTags=true' + // remove title tags, etc.
    '&removeSVGTagAttrs=true' + // enable removing attributes
    // '&removingTagAttrs=fill' + // remove fill attributes
    '!@/assets/icons', // search this directory
    true, // search subdirectories
    /\w+\.svg$/i // only include SVG files
)

const symbols = svgContext.keys().map(path => {
  // get SVG file content
  const content = svgContext(path)
  // extract icons id from filename
  const id = path.replace(/^\.\/(.*)\.\w+$/, '$1')
  // replace svg tags with symbol tags and id attribute

  return content
      .replace(/stroke="[^(none)].*?"/g, 'stroke="currentColor"')
      .replace(/fill="[^(none)].*?"/g, 'fill="currentColor"')
      .replace('<svg', `<symbol id="${id}"`).replace('svg>', 'symbol>')
})

// const iconNameList = svgContext.keys().map(el => el.replace(/\.svg|\.\//gm, ''));
// export type IconName = typeof iconNameList extends (infer T)[] ? T : never;

@Options({
  name: 'SvgSprite',
  svgSprite: symbols.join('\n'), // concatenate all symbols into $options.svgSprite
})
export default class VueSpriteComponent extends Vue {}
</script>
