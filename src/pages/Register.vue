<template>
  <ion-page>
    <Toolbar title-text="Register" />

    <ion-content :fullscreen="true">
      <form v-on:submit.prevent="register">
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
          >
        </div>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonInput, IonPage } from "@ionic/vue";
import Toolbar from "@/components/shared/Toolbar.vue";
import { defineComponent } from "vue";
import { reactive } from "vue";
import { signUpUser } from "@/core/services/api.service";

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
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      role:""
    });
    const register = async () => {
      signUpUser(
        data.firstName,
        data.middleName,
        data.lastName,
        data.email,
        data.password,
        data.role
      );
    };
    return { data, register };
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