<template>
  <aside class="sidebar">
    <div class="sidebar-section new-item-settings">
      <h3>New item</h3>
      <div class="input-group">
        <label for="new-cc-item-name">Name</label>
        <input type="text" id="new-cc-item-name" class="cc-item-name" v-model="newCCItemName">
      </div>

      <div class="input-group type-color">
        <label for="new-cc-item-color">Reference color</label>
        <input type="text" class="item-ref-color-hex" v-model="newCCItemColor">

        <div class="color-picker" :style="{ background: newCCItemColor }">
          <input type="color" id="new-cc-item-color" class="cc-item-color" v-model="newCCItemColor">
        </div>
      </div>

      <div class="input-group type-upload">
        <label for="new-cc-item-image"></label>
        <div class="upload-field">
          <div class="preview" :style="{ backgroundImage: `url(${newCCItemImage ? newCCItemImage.src : ''})` }"></div>
          <input type="file" accept="image/*" id="new-cc-item-image" @change="setNewCCItemImage">
        </div>
      </div>

      <button @click="addCCItem">Add item</button>
    </div>

    <div class="sidebar-section export">
      <h3>Export</h3>
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

        // Clear inputs
        this.newCCItemName = '';
        this.newCCItemColor = '#000000';
        this.newCCItemImage = null;
      }
    },
    handleExport() {
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
  width: 400px;
}

.sidebar-section {
  padding: 40px 0;
  border-top: 1px solid rgba(#fff, 0.15);

  &:first-child {
    padding-top: 0;
    border-top: none;
  }
}

h3 {
  margin-top: 0;
  font-weight: 200;
  font-size: 28px;
}

.input-group {
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    border: none;
  }

  input[type='text'] {
    padding: 8px;
    border-radius: 4px;
    background: $oc-gray-7;
    color: $c-copy-light;
    border: 1px solid $oc-gray-6;
  }

  &.type-color {
    input[type='text'] {
      border-radius: 4px 4px 0 0;
      border-bottom: 0;
    }

    input[type='color'] {
      position: relative;
      height: 32px;
      overflow: hidden;
      opacity: 0;
      cursor: pointer;
    }

    .color-picker {
      border-radius: 0 0 4px 4px;
      border: 1px solid $oc-gray-6;
      border-top: 0;
    }
  }

  &.type-upload {
    input[type='file'] {
      height: 64px;
      opacity: 0;
    }

    .upload-field {
      position: relative;
      border-radius: 4px;
      border: 1px dashed rgba(#fff, 0.5);
      z-index: 1;
      cursor: pointer;

      &::after {
        @include overlay;
        content: 'Upload image';
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        z-index: -1;
      }
    }

    .preview {
      @include overlay;
      background-size: cover;
      pointer-events: none;
    }
  }
}

button, .button {
  width: 100%;
}
</style>
