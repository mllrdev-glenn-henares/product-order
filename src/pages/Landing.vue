<template>
  <ion-page>
    <ion-content>
      <h1>Miller Solutions Development Inc.</h1>
      <div class="navButton">
        <ion-button href="/login">Login</ion-button>
        <ion-button href="/register">Register</ion-button>
      </div>  
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonButton } from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
  name: "Landing",
  components: {
    IonPage,
    IonContent,
    IonButton,
  }
})

</script>

<style scoped>
*{
  outline: solid red 1px;
}
h1 {
  color:black;
  text-align: center;
  font-size: 50px;
  margin-top: 15%;
}
.navButton {
  display: block;
  width: 20%;
  margin-left: 40%;
}
ion-button {
  display: block;
  margin: 20px;
}

</style>