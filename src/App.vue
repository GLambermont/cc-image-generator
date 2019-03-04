<template>
  <div id="app" v-on:newConversionItem="() => console.log('test')">
    <Sidebar></Sidebar>

    <main>
      <div class="content-width-l">
        <h1>Correction items</h1>
        <CCItemGrid />
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from '@/components/TheSidebar.vue';
import CCItemGrid from '@/components/CCItemGrid.vue';

export default {
  name: 'app',
  components: {
    Sidebar,
    CCItemGrid
  }
}
</script>

<style lang="scss">
@import './scss/base';
@import './scss/typography';

#app {
  display: flex;
  background: $oc-gray-8;
  height: 100%;
}

main {
  width: 100%;
}

button,
.button {
  background: $oc-indigo-6;
  color: $c-white;
  border: none;
  border-radius: 9999px;
  padding: 8px 16px;
}
</style>
