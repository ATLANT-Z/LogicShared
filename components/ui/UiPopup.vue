<template>
  <!--       @click.self='close'-->
  <div class="popup-block"
       :class="{active: isActive}"
       :id="id + '-pop'"
       ref="popup"
  >
    <slot :parent="this">This should have been content</slot>
    <ToTopBtn v-if="$refs.popup" :watchElement="$refs.popup"/>
  </div>
</template>

<script lang="ts">
import {popupService} from "@/_shared/services/popup.service";
import {Options, Vue} from "vue-class-component";
import {Prop, Watch} from "vue-property-decorator";
import ToTopBtn from "@/_shared/components/ui/ToTopBtn.vue";
import {PopupName} from "@shared/helpers/popup.helper";

@Options({
  components: {ToTopBtn},
  emits: ['onShow', 'onClose'],
})
export default class UiPopup extends Vue {
  @Prop({required: true}) id: PopupName;

  @Watch('isActive')
  activeUpdate(currVal: boolean) {
    if (currVal) this.$emit('onShow');
    else this.$emit('onClose');
  }

  close(value: boolean = false) {
    const callbacks = popupService.getCallbacks(this.id);
    callbacks && callbacks.resolve(value);
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
