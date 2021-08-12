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
      <div class="mainDetail">
        <!-- <ion-grid class="tableTitle">
          <ion-row>
            <ion-col>#</ion-col>
            <ion-col>Quantity</ion-col>
            <ion-col>Description</ion-col>
            <ion-col>Unit Price</ion-col>
            <ion-col>subtotal</ion-col>
          </ion-row>
        </ion-grid> -->
        <ion-grid>
          <ion-row>
            <ion-col>1</ion-col>
            <ion-input type="text" autofocus name="Quantity" placeholder="Quantity"></ion-input>
            <ion-input type="text" autofocus name="unitDescription" placeholder="Description"></ion-input>
            <ion-input type="text" autofocus name="UnitPrice" placeholder="Price"></ion-input>
            <ion-input type="text" autofocus name="subTotal" placeholder="Total Price"></ion-input>
          </ion-row>
        </ion-grid>
        <ion-grid>
          <ion-row>
            <ion-col>2</ion-col>
            <ion-col>2</ion-col>
            <ion-col>Boxes of Coffee</ion-col>
            <ion-col>650.00</ion-col>
            <ion-col>1,300.00</ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </div>
  </ion-content>
</template>

<script lang="ts">
import { IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import Header from '@/core/components/Header.vue';

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
    },
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
  h1 {
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
    padding: 10px;
    border-bottom: grey solid;
    opacity: 50%;
  }
  .tableTitle {
    background-color: aqua;
    color: black;
    font-weight: bold;
    margin-top: 1%;
  }

</style>