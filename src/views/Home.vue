<template>
  <ion-page>
  <ion-toolbar>
    <ion-button id="signInButton">Sign In</ion-button>
    <h1>LOGO</h1>
    <ion-title>Purchase Order</ion-title>
  </ion-toolbar>
    <ion-content :fullscreen="true">
      <div class="filterButton">
        <ion-button>Pending</ion-button>
        <ion-button>Approve</ion-button>
        <ion-button>Declined</ion-button>
      </div>
      <ion-grid class="tableTitle">
        <ion-row>
          <ion-col> PO Number </ion-col>
          <ion-col> PO Description </ion-col>
          <ion-col> Request Date </ion-col>
          <ion-col> Status </ion-col>
          <ion-col> Action </ion-col>
        </ion-row>
      </ion-grid>
      <ion-grid>
        <ion-row>
          <ion-col> {{ order[0].purchaseOrderNumber }} </ion-col>
          <ion-col> {{order[0].description}} </ion-col>
          <ion-col> {{order[0].date}} </ion-col>
          <ion-col> {{order[0].status}} </ion-col>
          <ion-col> {{order[0].action}} </ion-col>
        </ion-row>
        <ion-row>
          <ion-col> PO-0001 </ion-col>
          <ion-col> sample Description </ion-col>
          <ion-col> July 22, 2021 </ion-col>
          <ion-col> Pending </ion-col>
          <ion-col> Review </ion-col>
        </ion-row>
        <ion-row>
          <ion-col> PO-0001 </ion-col>
          <ion-col> sample Description </ion-col>
          <ion-col> July 22, 2021 </ion-col>
          <ion-col> Pending </ion-col>
          <ion-col> Review </ion-col>
        </ion-row>
        <ion-row>
          <ion-col> PO-0001 </ion-col>
          <ion-col> sample Description </ion-col>
          <ion-col> July 22, 2021 </ion-col>
          <ion-col> Pending </ion-col>
          <ion-col> Review </ion-col>
        </ion-row>
      </ion-grid>
      <ion-button id="addButton">add Icon</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonButton } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import PurchaseOrder from '../types/purchaseOrder';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
 
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonButton
  },
  setup() {

    const order = ref<PurchaseOrder[]>([
      { purchaseOrderNumber: 'PO-0001', description: 'description one', date: new Date(), status: 'pending', action: 'reviewed' }

    ])

    return {order}

  }
});
</script>

<style scoped>
  h1{
    display: inline-block;
    margin-left: 2%;
 
  }
  ion-title{
    display: inline-block;
  }
  .tableTitle{
    background-color: aqua;
    color: black;
    font-weight: bold;
    margin-left: 5%;
    margin-right: 5%;
  }
  ion-grid{
    text-align: center;
  }
  #signInButton{
    float: right;
    margin-top: 13px;
    margin-right: 2%;
  }
  #addButton{
    float: right;
    vertical-align: top;
    margin-right: 2%;
  }
  .filterButton{
    margin-left: 5%;
  }
</style>