<template>
  <Header/>
  <ion-content>
    <div class="mainCreate">
      <h1>Purchase Order</h1>
      <h1>PO-0003</h1>
      <div class="headDetail">
        <ion-item>
          <ion-label>Supplier</ion-label>
          <ion-input type="text"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>PO description</ion-label>
          <ion-input type="text"></ion-input>
        </ion-item>
      </div>
      <div class="headDetail">
        <ion-item>
          <ion-label>Purchase Date</ion-label>
          <ion-input type="date"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Requestor</ion-label>
          <ion-input type="text"></ion-input>
        </ion-item>
      </div>
      <hr>
    </div>
  </ion-content>
</template>

<script lang="ts">
import { IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import Header from '../core/components/Header.vue'

export default defineComponent({
  name: 'Add',
  components: {
    Header,
    IonContent,
  },
  props: {
    supplier: {
      required: true,
      type: String
    } ,
    description: {
      required: true,
      type: String
    }
  }


})
</script>

<style scoped>
/* *{
  outline: solid yellow 1px;
} */
  h1{
    display: block;
    margin: 1%;

  }
  .mainCreate {
    padding: 1%;
    width: 70%;
    margin: 3% 15% 3%;
    color: grey;
    background-color: white;

  }
  p {
    color: white;
  }
  ion-label {
    width: 35%;
    padding: 2%;
    margin-left: 2%;
  }
  ion-input {

    --padding-bottom: 8px;
  }
  ion-item {
    display: block;
  }
  .headDetail {
    display: inline-block;
    width: 50%;
  }
  hr {
    margin: 0% -1%;
    border-bottom: grey solid;
    opacity: 50%;
  }

</style>