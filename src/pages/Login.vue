<template>
  <ion-page>
    <Toolbar title-text="Login" />

    <ion-content :fullscreen="true">
      <form v-on:submit.prevent="login">
        <div id="container">
          <ion-item>
            <ion-input
              placeholder="Email"
              type="email"
              v-model="data.email"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
              placeholder="Password"
              type="password"
              v-model="data.password"
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
import Toolbar from "@/shared/components/Toolbar.vue";
import { reactive } from "vue";
import { loginUser } from "@/core/services/user.service";
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
    const data = reactive({
      email: "",
      password: "",
    });
    const router = useRouter();
    const login = async () => {
      if (await loginUser(data.email, data.password)) {
        router.push("/home")
      } else {
        router.push("/login")
      }
      data.email = "";
      data.password = "";
    };
    return { data, login };
  },
});
</script>

<style scoped>
#container {
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
