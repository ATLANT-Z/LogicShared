<template>
  <div class="to-top-btn" :class="{active: isActive}" @click.prevent.stop="toTop">
    <img src="../../assets/icons/toTop.svg" alt="">
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {Prop} from "vue-property-decorator";

@Options({
  name: 'ToTopBtn'
})
export default class ToTopBtn extends Vue {
  @Prop() watchElement: HTMLElement;

  isActive: boolean = false;

  toTop() {
    if (this.watchElement)
      this.watchElement.scrollTop = 0;
    else {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }

  calcIsActive() {
    if (this.watchElement)
      this.isActive = this.watchElement.scrollTop > 0;
    else {
      this.isActive = (document.documentElement || document.body).scrollTop > 0;
    }
  }

  mounted() {
    if (this.watchElement) {
      this.watchElement.addEventListener('scroll', this.calcIsActive);
    } else {
      addEventListener('scroll', this.calcIsActive);
    }
    addEventListener('resize', this.calcIsActive);
  }

  unmounted() {
    if (this.watchElement) {
      this.watchElement.removeEventListener('scroll', this.calcIsActive);
    } else {
      removeEventListener('scroll', this.calcIsActive);
    }
    removeEventListener('resize', this.calcIsActive);
  }
}
</script>

<style lang="scss">
.to-top-btn {
  position: fixed;
  right: 16px;
  bottom: 48px;

  height: 40px;
  width: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  background-color: $color-main;

  cursor: pointer;
  z-index: 10;

  @include anim();
  transform: translateY(32px);
  opacity: 0;
  visibility: hidden;

  &.active {
    transform: translateY(0px);
    opacity: 1;
    visibility: visible;
  }
}
</style>
