<template>
  <div class="error-layout-component__list-item-w"
       :class="{
           active: isShow,
           hidden: isHide
       }"
       :style="{
          '--pos-y': posY + 'px'
       }"
       ref="error"
  >
    <div class="error-layout-component__list-item">
      {{ error.msg }}
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {Prop} from "vue-property-decorator";
import {errorService, MyError} from "@shared/services/error.service";

@Options({
  name: "ErrorItemComponent",
})
export default class ErrorItemComponent extends Vue {
  @Prop({required: true}) error: MyError;
  @Prop({required: true}) posY: number;

  $refs: {
    error: HTMLElement
  }

  isShow: boolean = false;
  isHide: boolean = false;

  mounted() {
    const animTimeSecStr = getComputedStyle(this.$refs.error).getPropertyValue('--anim-time');
    const animTimeMs = parseFloat(animTimeSecStr) * 1000;

    this.isShow = true;

    setTimeout(() => {
      this.isHide = true;
    }, errorService.ShowSeconds * 1000 - animTimeMs);
  }

}
</script>

<style lang="scss" scoped>

</style>
