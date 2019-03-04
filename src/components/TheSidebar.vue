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
      <button @click="generateCCImages">Generate correction images</button>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      newCCItemName: '',
      newCCItemColor: '#000000',
      newCCItemImage: null
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
    addCCItem() {
      if (this.newCCItemName && this.newCCItemColor && this.newCCItemImage) {
        this.$store.commit('addCCItem', {
          name: this.newCCItemName,
          color: this.newCCItemColor,
          image: this.newCCItemImage,
        });
      }
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
