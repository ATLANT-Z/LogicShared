<template>
  <div class="svg-w" :class="{
    'initial-size':initialSize,
    'parent-size': parentSize,
    }">
    <svg class="icon"
         :class="{
            'icon-spin': spin,
         }"
         :style="{'height': height,'width': width}"
    >
      <use :xlink:href="`#${icon}`"/>
    </svg>
  </div>
</template>

<script lang="ts">
import {Icon, projectIcons} from "@/tools/type/icons";
import {Prop} from "vue-property-decorator";
import {Component, Vue} from "@/tools/version-types";

@Component({
  name: 'SvgIcon',
  props: {
    spin: {
      type: Boolean,
      default: false,
    },
    width: Number,
    height: Number,
    initialSize: {
      type: Boolean,
      default: false,
    },
    parentSize: {
      type: Boolean,
      default: false,
    },
  },
})
export default class SvgIconComponent extends Vue {
  @Prop({required: true}) icon: Icon;

  get ErrorMsg() {
    return `Иконки с именем ${this.icon} не сущесвует`;
  }

  mounted() {
    if (!projectIcons[this.icon]) this.error();
  }

  error() {
    if (process.env.NODE_ENV === 'production') {
      console.error(this.ErrorMsg);
    } else {
      throw new Error(this.ErrorMsg);
    }
  }
}
</script>

<style lang="scss">
.svg-w {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 20px;
  width: 20px;

  > .icon {
    height: 100%;
    width: 100%;
  }

  &.parent-size {
    height: 100%;
    width: 100%;
  }

  &.initial-size {
    width: auto;
    height: auto;

    &.icon {
      width: auto;
      height: auto;
    }
  }
}

svg.icon-spin {
  animation: icon-spin 2s infinite linear;
}

@keyframes icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
