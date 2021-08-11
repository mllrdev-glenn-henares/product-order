<template>
  <Header/>
  <ion-content>
    <div class="createHeader">
      <ion-item>
        <ion-label>Supplier</ion-label>
        <ion-input type="text"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>PO description</ion-label>
        <ion-input type="text"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Purchase Date</ion-label>
        <ion-input type="text"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Requestor</ion-label>
        <ion-input type="text"></ion-input>
      </ion-item>
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
*{
  outline: solid yellow 1px;
}
  h1{
    display: inline-block;
    margin-left: 2%;
 
  }
  .createHeader{
    width: 70%;
    margin: 3% 15% 3%;
    color: grey;
    background-color: white;

  }
  p{
    color: white;
  }
  ion-label {
    width: 40%;
    padding: 2%;
    margin-left: 2%;
  }
  ion-input {
    min-width: 10%;
    margin: 0% 2%;
  }
  ion-item {
    display: block;
  }

</style>