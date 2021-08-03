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
        <ion-row v-for="order in orders" :key="order.purchaseOrderNumber">
          <ion-col> {{ order.purchaseOrderNumber }} </ion-col>
          <ion-col> {{ order.description }} </ion-col>
          <ion-col> {{ order.date }} </ion-col>
          <ion-col> {{ order.status }} </ion-col>
          <ion-col> {{ order.action }} </ion-col>
        </ion-row>
      </ion-grid>
      <ion-button id="addButton">add Icon</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import PurchaseAction from '@/core/enums/action.enum';
import PurchaseStatus from '@/core/enums/status.enum';
import { IonContent, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonButton } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import IPurchaseOrder from '../core/interfaces/purchase-order';

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

    const orders = ref<IPurchaseOrder[]>([
      { purchaseOrderNumber: 'PO-0001', description: 'description one', date: new Date(), status: PurchaseStatus.PENDING, action: PurchaseAction.REVIEWED },

      { purchaseOrderNumber: 'PO-0002', description: 'description two', date: new Date(), status: PurchaseStatus.APPROVED, action: PurchaseAction.REVIEWED }

    ])

    return {orders}

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