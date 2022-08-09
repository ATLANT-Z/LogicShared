<template>
  <div class="error-component">
    <div class="error-component__list">
      <div v-for="error in service.errors" :key="error.id" class="error-component__list-item">
       {{ error.msg }}
      </div>
    </div>
  </div>
</template>

<script>
import {errorService} from "@/_shared/services/error.service";

export default {
  name: "ErrorComponent",
  data() {
    return {
      service: errorService
    }
  }
}
</script>

<style lang="scss" scoped>
.error-component {
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


  &__list {
    width:min-content;
    max-height: 100%;

    margin-left: auto;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px;

    pointer-events: auto;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: none;
    @include scrollbarStyle(5px);
  }

  &__list-item {
    position: relative;
    right: 0;

    width: 300px;

    display: flex;
    align-items: center;
    gap: 4px;

    margin-left: auto;
    padding: 8px 16px;

    color: black;
    background-color: #eeeeee;
    border-right: 5px solid $color-red-dark;
    border-radius: 6px;

    animation-name: showError;
    animation-duration: 7s;
    animation-fill-mode: forwards;
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
