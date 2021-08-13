<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <div id="toolbar-container" >
        <ion-title>Product Order</ion-title>
        <ion-title id="middle-title">{{titleText}}</ion-title>
      </div>
    </ion-toolbar>
  </ion-header>
</template>

<script language="ts">
import {IonTitle, IonButton, IonHeader, IonToolbar} from '@ionic/vue';
import { defineComponent } from "vue";

export default defineComponent({
  name: "Toolbar",
  components: {
    IonTitle,
    IonHeader,
    IonToolbar
  },
  props: {
    titleText: {
      type: String,
      required: true
    },
  },
});
</script>

<style scoped>
#toolbar-container {
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
