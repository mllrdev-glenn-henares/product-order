<template>
  <ion-page>
    <Toolbar title-text="Login" />
    <ion-content :fullscreen="true">
      <form v-on:submit.prevent="onLogin">
        <div id="container">
          <h1>Login</h1>
          <div class="loginDetails">
            <ion-item lines="none">
              <ion-label>Email</ion-label>
              <ion-input type="email" v-model="data.email"></ion-input>
            </ion-item>
            <ion-item lines="none">
              <ion-label>Password</ion-label>
              <ion-input type="password" v-model="data.password"></ion-input>
            </ion-item>
          </div>
          <div class="buttons">
            <ion-button type="submit">Login</ion-button>
            <ion-button
              class="registerButton"
              @click="$router.push('/register')"
              >Create Account</ion-button
            >
          </div>
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
import RouteName from "@/core/enums/route-name.enum";

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
            name: RouteName.HOME,
          });
        } else {
          router.push({
            name: RouteName.LOGIN,
          });
        }
      });
      data.email = "";
      data.password = "";
    };
    return { data, onLogin, RouteName };
  },
});
</script>

<style scoped>
ion-content {
  --background: #95b7bf;
  color: #2a3132;
}
#container {
  width: 25%;
  height: 370px;
  margin-left: 37.5%;
  margin-top: 5%;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
}
ion-button {
  min-height: 20px;
  margin-top: 15px;
  --background: #2a3132;
  --border-radius: 20px;
  display: block;
  width: 50%;
  margin-right: auto;
  margin-left: auto;
}
ion-item {
  background-color: white;
  height: 55px;
  width: 100%;
}
ion-label {
  width: 25%;
  text-align: left;
}
ion-input {
  border-radius: 10px;
  background-color: #27213225;
  margin-left: 10px;
  width: 100%;
  height: 35px;
}
h1 {
  text-align: center;
  color: #2a3132;
  font-weight: bold;
}
.buttons {
  margin-top: 30px;
}
.loginDetails {
  margin-top: 25px;
  padding: 5px;
}
.registerButton {
  --background: none;
  --box-shadow: none;
  color: #95b7bf;
  font-weight: bold;
  font-size: 11px;
}
</style>