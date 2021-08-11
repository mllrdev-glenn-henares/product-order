<template>
  <ion-page>
    <Toolbar title-text="Home" />

    <ion-content :fullscreen="true"> </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import Toolbar from "@/components/shared/Toolbar.vue";
import { onMounted } from "vue";
export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
    Toolbar,
  },
  setup() {
    onMounted(async () => {
      await fetch("api-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      });
    });
  },
});
</script>

<style scoped>
</style>