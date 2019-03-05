<template>
  <aside class="sidebar">
    <div class="sidebar-section new-item-settings">
      <div class="input-group">
        <label for="new-cc-item-name">Name</label>
        <input type="text" id="new-cc-item-name" class="cc-item-name" v-model="newCCItemName">
      </div>

      <div class="input-group">
        <label for="new-cc-item-color">Reference color</label>
        <input type="text" class="item-ref-color-hex" v-model="newCCItemColor">
        <input type="color" id="new-cc-item-color" class="cc-item-color" v-model="newCCItemColor">
      </div>

      <div class="input-group">
        <label for="new-cc-item-image"></label>
        <input type="file" accept="image/*" id="new-cc-item-image" @change="setNewCCItemImage">
      </div>

      <button @click="addCCItem">Add item</button>
    </div>

    <div class="sidebar-section export">
      <button @click="handleExport">Generate correction images</button>
    </div>
  </aside>
</template>

<script>
import getAverageColor from 'get-average-color'
import * as chroma from 'chroma-js';
import { generateCheckerImage } from '../js/helpers';

export default {
  name: 'Sidebar',
  data() {
    return {
      newCCItemName: '',
      newCCItemColor: '#000000',
      newCCItemImage: null,
    }
  },
  methods: {
    setNewCCItemImage(e) {
      const reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);
      reader.onload = e => {
        this.newCCItemImage = new Image();
        this.newCCItemImage.src = e.target.result;
      };
    },
    async addCCItem() {
      if (this.newCCItemName && this.newCCItemColor && this.newCCItemImage) {
        // Get the average color of the uploaded image and correct it's lightness based on the reference image
        const correctionColorRGB = await getAverageColor(this.newCCItemImage.src);
        const referenceColorLAB = chroma(this.newCCItemColor).lab();
        const correctionColorLAB = chroma(correctionColorRGB).lab();
        const correctionColorCorrectedLAB = [referenceColorLAB[0], correctionColorLAB[1], correctionColorLAB[2]];
        const correctionColorCorrectedHex = chroma.lab(correctionColorCorrectedLAB).hex();

        // Add the new item to the store
        this.$store.commit('addCCItem', {
          name: this.newCCItemName,
          referenceColor: this.newCCItemColor,
          correctionColor: correctionColorCorrectedHex,
          image: this.newCCItemImage
        });               
      }
    },
    async handleExport() {
      const CCItems = this.$store.state.CCItems;

      // Generate checker image for reference colors
      generateCheckerImage({
        colors: CCItems.map(item => item.referenceColor),
        fileName: 'referenceColors'
      });

      // Generate checker image for correction images
      generateCheckerImage({
        colors: CCItems.map(item => item.correctionColor),
        fileName: 'correctionColors'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  background: $oc-gray-9;
  height: 100%;
  padding: 24px;
}
</style>
