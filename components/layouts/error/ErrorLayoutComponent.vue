<template>
  <div class="error-layout-component">
    <div class="error-layout-component__list">
      <ErrorItem v-for="(error, index) in service.errors"
                 :key="error.id"
                 :error="error"
                 :posY="calcTop(index)"
                 ref="errors"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {errorService} from "@shared/services/error.service";
import ErrorItem from "@shared/components/layouts/error/ErrorItem.vue";
import {Component, Vue} from "@/tools/version-types";

@Component({
  name: "ErrorLayoutComponent",
  components: {ErrorItem},
})
export default class ErrorLayoutComponent extends Vue {
  service = errorService;
  heightList: number[] = [];

  $refs: {
    errors: ErrorItem[];
  }

  calcTop(index: number) {
    if (!this.$refs.errors) return 0;

    const heightList = this.$refs.errors.map(el => {
      return el.$el.getBoundingClientRect().height;
    });
    let top = 0;

    for (let i = 0; i < index; i++) {
      top += heightList[i];
    }

    return top;
  }
}
</script>

<style lang="scss">
.error-layout-component {
  font-weight: 400;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;

  font-size: 14px;

  padding: 96px 4px 16px;

  z-index: 99999;
  pointer-events: none;


  &__list-w {
    width: min-content;
    max-height: 100%;

    margin-left: auto;
    padding: 0 8px;

    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: none;
    @include scrollbarStyle(5px);
  }

  &__list {
    position: relative;
  }

  &__list-item-w {
    --pos-y: 0px;
    --anim-time: .5s;

    position: absolute;
    width: 300px;
    top: var(--pos-y);

    display: flex;
    align-items: center;
    gap: 4px;

    margin-left: auto;
    padding: 4px 0;


    right: -50vw;
    opacity: 0;
    transition: var(--anim-time) cubic-bezier(0.1, 1, 0.45, 1);

    &.active {
      opacity: 1;
      right: 0;
    }

    &.hidden {
      opacity: 0 !important;
    }
  }

  &__list-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 4px;

    padding: 8px 16px;

    color: black;
    background-color: #eeeeee;
    border-right: 5px solid $color-red-dark;
    border-radius: 6px;
    pointer-events: auto;

    &::after {
      content: "!";

      max-width: 24px;
      min-width: 24px;
      max-height: 24px;
      min-height: 24px;

      display: flex;
      justify-content: center;
      align-items: center;

      margin-left: auto;
      color: white;

      background-color: $color-red-dark;
      border-radius: 50%;
    }
  }


  @keyframes showError {
    0% {
      right: -100vw;
      opacity: 1;
    }
    10% {
      right: 0;
    }
    70% {
      opacity: 1;
    }
    99% {
      opacity: 0.02;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>
