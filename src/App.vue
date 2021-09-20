<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
});
</script>
<style>
@font-face {
  font-family: "Oxygen";
  src: local("Oxygen"), url(./fonts/Oxygen-Regular.ttf) format("truetype");
}
</style>