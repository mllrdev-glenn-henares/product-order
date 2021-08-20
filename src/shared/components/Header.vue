<template>
  <ion-page>
    <ion-toolbar>    
      <img  alt="Logo">
      <ion-title>Purchase Order</ion-title>
      <ion-button id="signInButton">Sign In</ion-button>
    </ion-toolbar>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Header'
})
</script>

<style scoped>
  *{
    outline: 1px solid yellow;
  }
  img{
    display: inline-block;
    margin-left: 2%;
 
  }
  ion-title{
    display: inline-block;
  }
  #signInButton{
    float: right;
    margin-top: 15px;

  }
</style>