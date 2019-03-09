<template>
  <li class="cc-item">
    <div class="thumb">
      <div class="thumb-reference-color" :style="{ backgroundColor: referenceColor }"></div>
      <img class="thumb-image" :src="image.src" alt="correction image">
      <div class="thumb-correction-color" :style="{ backgroundColor: correctionColor }"></div>
    </div>
    <p class="item-name">{{ name }}</p>
  </li>
</template>

<script>
export default {
  name: 'ConversionItem',
  props: {
    name: { type: String },
    referenceColor: { type: String },
    correctionColor: { type: String },
    image: { type: Image }
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

.thumb-reference-color,
.thumb-correction-color,
.thumb-image {
  height: 50%;
}

.thumb-correction-color,
.thumb-image {
  display: inline-block;
  width: 50%;
}

.thumb-reference-color {
  border-radius: 4px 4px 0 0;
}

.thumb-correction-color {
  border-bottom-right-radius: 4px;
}

.thumb-image {
  object-fit: cover;
  border-bottom-left-radius: 4px;
}

.item-name {
  margin: 0;
  margin-top: 8px;
}
</style>

