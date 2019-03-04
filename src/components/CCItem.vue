<template>
  <li class="cc-item">
    <div class="thumb">
      <div class="thumb-color" :style="{ backgroundColor: color }"></div>
      <img class="thumb-image" :src="image.src" alt="correction image">
    </div>
    <p class="item-name">{{ name }}</p>
  </li>
</template>

<script>
export default {
  name: 'ConversionItem',
  props: {
    name: { type: String },
    color: { type: String },
    image: { type: Image },
  }
};
</script>

<style lang="scss" scoped>
.cc-item {
  display: inline-block;
  list-style: none;
  text-align: center;
}

.thumb {
  width: 98px;
  height: 98px;
  display: inline-block;
  padding: 8px;
  background: $oc-gray-9;
  border-radius: 8px;
}

.thumb-color {
  height: 50%;
  border-radius: 4px 4px 0 0;
}

.thumb-image {
  height: 50%;
  width: 100%;
  object-fit: cover;
  border-radius: 0 0 4px 4px;
}

.item-name {
  margin: 0;
  margin-top: 16px;
}
</style>

