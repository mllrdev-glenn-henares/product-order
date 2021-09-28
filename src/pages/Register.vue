<template>
  <ion-page>
    <Toolbar title-text="Register" />
    <ion-content :fullscreen="true">
      <form v-on:submit.prevent="onRegister">
        <div id="container">
          <h1>Register</h1>
          <div class="registerDetails">
          <ion-item lines="none">
            <ion-label> First Name</ion-label>
            <ion-input type="string" v-model="data.firstName"></ion-input>
          </ion-item>
          <ion-item lines="none">
            <ion-label>Middle Name</ion-label>
            <ion-input type="string" v-model="data.middleName"></ion-input>
          </ion-item>
          <ion-item lines="none">
            <ion-label>Last Name</ion-label>
            <ion-input type="string" v-model="data.lastName"></ion-input>
          </ion-item>
          <ion-item lines="none">
            <ion-label>Email</ion-label>
            <ion-input type="email" v-model="data.email"></ion-input>
          </ion-item>
          <ion-item lines="none">
            <ion-label>Password</ion-label>
            <ion-input type="password" v-model="data.password"></ion-input>
          </ion-item>
          <ion-item lines="none">
            <ion-label>Role</ion-label>
                <select v-model="data.role">
                  <option v-for="(role, index) in UserRole" :key="index"  :value="role" >{{ role }}</option>
                </select>
          </ion-item>
          <ion-button type="submit">Create Account</ion-button>
          <ion-button class="loginButton">Login</ion-button>
          </div>
        </div>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonInput, IonPage, IonLabel, IonItem, IonButton } from "@ionic/vue";
import Toolbar from "@/shared/components/Toolbar.vue";
import { defineComponent } from "vue";
import { reactive } from "vue";
import { userService } from "@/core/services/api/v1/user.service";
import { useRouter } from "vue-router";
import ISignUpRequest from "@/core/interfaces/signup/sign-up-request.interface";
import RouteName from "@/core/enums/route-name.enum";
import UserRole from "@/core/enums/user-role.enum";

export default defineComponent({
  name: "Register",
  components: {
    IonContent,
    IonPage,
    IonInput,
    Toolbar,
    IonLabel,
    IonItem,
    IonButton,
  },
  setup() {
    const data: ISignUpRequest = reactive({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
    const router = useRouter()
    const onRegister = async () => {
      userService.signUp(data).then((isSuccess: boolean) => {
        if (isSuccess) {
          router.push({
            name: RouteName.LOGIN
          });
        } else {
          router.push({
            name: RouteName.REGISTER
          });
        }
      })
      data.firstName = "";
      data.middleName = "";
      data.lastName = "";
      data.email = "";
      data.password = "";
      data.role = "";
    }
    return { data, onRegister, UserRole };
  },
});
</script>

<style scoped>
/* *{
  outline: solid red 1px;
} */
ion-content {
  --background: #95b7bf;
  color: #2a3132;
}
#container {
  width: 30%;
  min-height: 400px;
  margin-left: 35%;
  margin-top: 5%;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
}
ion-item {
  width: 100%;
}
ion-button {
  min-height: 20px;
  margin-top: 35px;
  --background: #2a3132;
  --border-radius: 20px;
  display: block;
  width: 50%;
  margin-right: auto;
  margin-left: auto;
}
ion-input {
  border-radius: 10px;
  background-color: #27213225;
  margin-left: 10px;
  width: 90%;
  height: 37px;
}
ion-label {
  width: 25%;
  text-align: left;
  margin-right: auto;
  margin-left: auto;
}
h1 {
  text-align: center;
  color: #2a3132;
  font-weight: bold;
  margin-bottom: 20px;
}
.loginButton {
  --background: none;
  --box-shadow: none;
  color: #95b7bf;
  font-weight: bold;
  font-size: 11px;
  margin-top: 3px;
}
select {
  color: #2a3132;
  border-radius: 10px;
  height: 37px;
  background-color: #27213225;
  margin-left: 10px;
  text-align: left;
  max-width: 72% !important;
  width: 100% !important;
  padding-left: 3px!important;
  font-size: 13px;
}
option {
  color: #2a3132;
}
.registerDetails {
  margin-top: 25px;
  padding: 5px;
}
</style>