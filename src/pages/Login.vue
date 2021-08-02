<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Purchase Order</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">  
      <div id="login">
        <ion-item>
          <ion-input placeholder="Username"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input placeholder="Password" type="password"></ion-input>
        </ion-item>
        <ion-button>Login</ion-button>
        <ion-button>Register</ion-button>
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
  width: 3in;
}
ion-button {
  width: 7em;
  height: 2.5em;
  margin-top: 10px;
}
</style>