<template>
  <ion-page>
    <Toolbar title-text = "Register"/>

    <ion-content :fullscreen="true">
      <div id="login">
        <ion-item>
          <ion-input placeholder="First Name"></ion-input>
          <ion-input placeholder="Middle Name"></ion-input>
          <ion-input placeholder="Last Name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input placeholder="Email" type="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input placeholder="Password" type="password"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input placeholder="Confirm Password" type="password"></ion-input>
        </ion-item>
        <ion-button @click="$router.push('/login')">Complete Registration</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonInput,
  IonPage,
} from "@ionic/vue";
import Toolbar from '@/shared/components/Toolbar.vue'
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
    IonInput,
    Toolbar,
  },
   setup() {
    const router = useRouter();
    return { router };
  },
});
</script>

<style scoped>
#login-title {
  text-align: center;
  margin: 15px;
}
#login {
  justify-content: center;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
ion-item {
  width: 5in;
}
ion-button {
  width: auto;
  height: 2.5em;
  margin-top: 10px;
}
</style>