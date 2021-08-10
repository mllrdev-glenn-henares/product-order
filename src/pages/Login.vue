<template>
  <ion-page>
     <Toolbar title-text="Login"/>

    <ion-content :fullscreen="true">
      <ion-form @submit.prevent="handleSubmit">
        <div id="login">
          <ion-item>
            <ion-input
              placeholder="Email"
              type="email"
              ion-model="email"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
              placeholder="Password"
              type="password"
              ion-model="password"
            ></ion-input>
          </ion-item>
          <ion-button type="submit">Login</ion-button>
          <ion-button @click="$router.push('/register')">Register</ion-button>
        </div>
      </ion-form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonInput,
  IonPage
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Toolbar from '@/components/Toolbar.vue'

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
    IonInput,
    Toolbar
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      const response = await axios.post("login", {
        email: this.email,
        password: this.password,
      });
    },
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