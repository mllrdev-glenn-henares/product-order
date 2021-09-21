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
import ILoginRequest from "@/core/interfaces/login/login-request.interface";
import router from "@/router";
import { IonContent, IonInput, IonPage, IonItem, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";
import Toolbar from "@/shared/components/Toolbar.vue";
import { reactive } from "vue";
import { userService } from "@/core/services/api/v1/user.service";
import { useRouter } from "vue-router";
import ILoginDetails from "@/core/interfaces/login/login-request.interface";
import { RouteName } from "@/core/enums/route-name.enum";

export default defineComponent({
  name: "Login",
  components: {
    IonContent,
    IonPage,
    IonInput,
    Toolbar,
    IonItem,
    IonButton,
  },
  setup() {
    const data: ILoginRequest = reactive({
      email: "",
      password: "",
    });
    const onLogin = async () => {
      userService.login(data).then((isSuccess: boolean) => {
        if (isSuccess) {
          router.push({
            name: RouteName.HOME
          });
        } else {
          router.push({
            name: RouteName.LOGIN
          });
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