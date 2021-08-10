<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <div id="title-bar" >
        <ion-title>Product Order</ion-title>
        <ion-title id="middle-title">{{titleText}}</ion-title>
        <ion-button color="primary">Login</ion-button>
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
    IonButton,
    IonHeader,
    IonToolbar
  },
  props: ['titleText'],
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
