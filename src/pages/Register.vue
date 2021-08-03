<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Registration</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="login">
        <ion-item>
          <ion-input placeholder="First Name"></ion-input>
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
        <ion-button>Complete Registration</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
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