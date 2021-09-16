<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <div id="title-bar">
      </div>
    </ion-toolbar>
  </ion-header>
</template>

<script language="ts">
import { IonHeader, IonToolbar, } from "@ionic/vue"
import { defineComponent } from "vue"

export default defineComponent({
  name: "Toolbar",
  components: {
    IonHeader,
    IonToolbar,
  },
});
</script>

<style scoped>
#title-bar {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  margin: 5px;
}
#middle-title {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
