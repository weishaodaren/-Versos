<template>
  <div
    class="button-container"
    :style="{ background: backgroundColor, color: textColor }"
    @click="onClick"
  >
    {{ name }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'versos-button',
  props: ['name', 'onClick', 'backgroundColor', 'textColor'],
  setup(props) {
    const { name, onClick, backgroundColor, textColor } = props;

    return {
      name,
      onClick,
      backgroundColor,
      textColor,
    };
  },
});
</script>

<style lang="stylus" scoped>
.button-container
  display block
  width 100px
  height 100%
  padding 5px 20px
  border: 1px solid red
  user-select none
  border-radius 4px
  overflow hidden
  text-overflow ellipsis
  /:hover
    cursor: pointer
</style>
