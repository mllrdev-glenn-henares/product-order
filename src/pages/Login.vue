<template>
  <ion-page>
    <Toolbar title-text="Login" />

    <ion-content :fullscreen="true">
      <form v-on:submit.prevent="onLogin">
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
<<<<<<< HEAD
=======
import { reactive } from "vue";
import { login } from "@/core/services/user.service";
import { useRouter } from "vue-router";
import ILoginDetails from "@/core/interfaces/login-details.interface";

>>>>>>> origin/develop
export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
    IonInput,
    Toolbar,
  },
  setup() {
    const data: ILoginDetails = reactive({
      email: "",
      password: "",
    });
    const router = useRouter();
    const onLogin = async () => {
      login(data).then((isSuccess: boolean) => {
        if (isSuccess) {
          router.push("/home");
        } else {
          router.push("/login");
        }
      });
      data.email = "";
      data.password = "";
    };
    return { data, onLogin };
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
