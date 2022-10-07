<template>
  <div class="logical">
    <slot :isActive="IsActive" :toggle="toggle" :close="close"></slot>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "~/tools/version-types";
import {Prop} from "vue-property-decorator";
import {canActiveService} from "@shared/services/canActive.service";

@Component({
  name: "CanActiveComponent",
})
export default class CanActiveComponent extends Vue {
  @Prop({default: false}) startValue: boolean;
  @Prop({default: null}) id: string | null;
  @Prop({
    default() {
      return [];
    }
  }) excludeIds: string[];

  isShowInner: boolean = false;

  mounted() {
    this.IsActive = this.startValue;
  }

  toggle() {
    this.IsActive = !this.IsActive;
  }

  close() {
    this.IsActive = false;
  }

  Service = canActiveService;

  get IsActive() {
    if (this.id) {
      return this.Service.state[this.id];
    } else {
      return this.isShowInner;
    }
  }

  set IsActive(value) {
    if (this.id) {
      this.Service.setShow(this.id, value, this.excludeIds);
      console.log('SET', this.Service.state);
    } else {
      this.isShowInner = value;
    }
  }
}
</script>

<style lang="scss" scoped>
.logical {
  display: contents;
}
</style>
