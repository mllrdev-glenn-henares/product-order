<template>
  <ion-page>
    <Toolbar title-text="Login" />

    <ion-content :fullscreen="true">
      <form>
        // @submit.prevent="login"
        <div id="login">
          <ion-item>
            <ion-input
              placeholder="Email"
              type="email"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
              placeholder="Password"
              type="password"
            ></ion-input>
          </ion-item>
          <ion-button type="submit">Login</ion-button>
          <ion-button @click="$router.push('/register')">Register</ion-button>
        </div>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonInput, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Toolbar from "@/components/shared/Toolbar.vue";
export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
    IonInput,
    Toolbar,
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
ion-button {
  width: 7em;
  height: 2.5em;
  margin-top: 10px;
}
</style>
