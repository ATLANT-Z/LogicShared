<template>
  <div class="popup-block"
       :class="{active: isActive}"
       :id="id + '-pop'"
       @click.self='close'
       ref="popup"
  >
    <slot :parent="this">This should have been content</slot>
    <ToTopBtn v-if="$refs.popup" :watchElement="$refs.popup"/>
  </div>
</template>

<script lang="ts">
import {popupService} from "@/_shared/services/popup.service";
import {Options, Vue} from "vue-class-component";
import {Prop} from "vue-property-decorator";
import ToTopBtn from "@/_shared/components/ui/ToTopBtn.vue";
import {PopupName} from "@shared/helpers/popup.helper";

@Options({
  components: {ToTopBtn},
  // emits: ['mounted'],
  // mounted() {
  //   this.$emit('mounted', this);
  // }
})
export default class UiPopup extends Vue {
  @Prop({required: true}) id: PopupName;

  close() {
    this.isActive = false;
  }

  get isActive() {
    return popupService.isShow(this.id);
  }

  set isActive(value) {
    popupService.setShow(this.id, value);
  }
}
</script>
