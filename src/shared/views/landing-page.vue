<template>
  <ion-page>
    <ion-content>
      <div class="main">
        <img :src="logoImg" alt="logo"/>
        <h1>Miller Solutions Development Inc.</h1>
        <div class="navButton">
          <ion-button id="loginButton" @click="goToLogin()">Login</ion-button>
          <ion-text id="registerButton" @click="goToRegister()">Register</ion-text>
        </div> 
      </div> 
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import UsersRouteName from "@/modules/user/enums/route-name.enum";
import { useRouter } from "vue-router";
import { IonPage, IonContent, IonButton, IonText } from "@ionic/vue";
import { defineComponent, computed } from "@vue/runtime-core";


export default defineComponent({
  name: "Landing",
  components: {
    IonPage,
    IonContent,
    IonButton,
    IonText,
  },
  setup() {
    const router = useRouter();
    
   const logoImg = computed((): string => {
          return require(`@/assets/images/logo.png`)
    })

    const goToRegister = () => {
        router.push({
          name: UsersRouteName.REGISTER
        })
      }
      
    const goToLogin = () => {
        router.push({
          name: UsersRouteName.LOGIN
        })
      }

    return {
      goToRegister,
      goToLogin,
      logoImg
    }
  }
})

</script>

<style scoped>
ion-content {
  --background: #95b7bf;
  align-content: center;
}
.main {
  align-content: center;
}
img {
  background-color: white;
  margin: 10% 0% 0% 44%;
  border-radius: 155px;
  width: 12%;
  height: auto;
}
h1 {
  color:black;
  text-align: center;
  font-size: 40px;
  margin-top: 3%;
}
.navButton {
  display: block;
  width: 20%;
  margin-left: 40%;
}
ion-button {
  margin: 20px;
}
#loginButton {
  --background: #2a3132;
  --border-radius: 20px;
  padding: -5%;
  width: 50%;
  margin-left: 25%;
  
}
#registerButton {
  padding: 5%;
  margin-left: 35%;
}

</style>