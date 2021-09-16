<template>
  <ion-page>
    <Toolbar title-text="Register" />

    <ion-content :fullscreen="true">
      <form v-on:submit.prevent="onRegister">
        <div id="container">
          <ion-item>
            <ion-input
              placeholder="First Name"
              type="string"
              v-model="data.firstName"
            ></ion-input>
            <ion-input
              placeholder="Middle Name"
              type="string"
              v-model="data.middleName"
            ></ion-input>
            <ion-input
              placeholder="Last Name"
              type="string"
              v-model="data.lastName"
            ></ion-input>
          </ion-item>
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
          <ion-item>
            <ion-input
              placeholder="Role"
              type="string"
              v-model="data.role"
              oninput="this.value = this.value.toUpperCase()"
            ></ion-input>
          </ion-item>
          <ion-button type="submit">Complete Registration</ion-button>
        </div>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonInput, IonPage } from "@ionic/vue";
import Toolbar from "@/shared/components/Toolbar.vue";
import { defineComponent } from "vue";
import { reactive } from "vue";
import { userService } from "@/core/services/user.service";
import { useRouter } from "vue-router";
import ISignUpRequest from "@/core/interfaces/signup/sign-up-request.interface";
import { RouteName } from "@/core/enums/route-name.enum";

export default defineComponent({
  name: "Register",
  components: {
    IonContent,
    IonPage,
    IonInput,
    Toolbar,
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
    return { data, onRegister };
  },
});
</script>

<style scoped>
#container {
  justify-content: center;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
ion-item {
  width: 600px;
}
ion-button {
  width: auto;
  height: 2.5em;
  margin-top: 10px;
}
</style>