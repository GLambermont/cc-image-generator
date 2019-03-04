<template>
  <ul class="cc-item-grid">
    <CCItem
      v-for="(item, index) in $store.state.CCItems"
      :key="index"
      :name="item.name"
      :color="item.color"
      :image="item.image"
    />
  </ul>
</template>

<script>
import CCItem from '@/components/CCItem.vue';

export default {
  name: 'ConversionItemGrid',
  components: {
    CCItem
  }
};
</script>

<style lang="scss" scoped>
.cc-item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(98px, 1fr));
  grid-gap: 24px;
  justify-items: start;
  margin: 0;
  padding: 0;
}
</style>
