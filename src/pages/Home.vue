<template>
  <ion-page>
  <ion-toolbar>
    <Toolbar title-text = "Home"/>
  </ion-toolbar>
    <ion-content :fullscreen="true">
      <div class="filterButton">
        <ion-button button @click="handleClick(PurchaseStatus.PENDING)">Pending</ion-button>
        <ion-button button @click="handleClick(PurchaseStatus.APPROVED)">Approve</ion-button>
        <ion-button button @click="handleClick(PurchaseStatus.DECLINED)">Declined</ion-button>
        <ion-button button @click="handleClick(PurchaseStatus.CLOSE)">Closed</ion-button>
      </div>
      <ion-grid class="tableTitle">
        <ion-row>
          <ion-col> PO Number </ion-col>
          <ion-col> Supplier </ion-col>
          <ion-col> PO Description </ion-col>
          <ion-col> Request Date </ion-col>
          <ion-col> Status </ion-col>
        </ion-row>
      </ion-grid>
      <order-list :orders = "orders" :status= "status"/>
      <list-jerry :user = "user"/>
      <ion-button id="addButton" href="/create">add Icon</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import PurchaseStatus from '@/core/enums/status.enum';
import { IonContent, IonPage, IonToolbar, IonGrid, IonRow, IonButton } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import IPurchaseOrder from '@/core/interfaces/purchase-order.interface';
import IName from '@/core/interfaces/name.interface';
import OrderList from '@/shared/components/OrderList.vue';
import Toolbar from '@/shared/components/Toolbar.vue';


export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonPage,
    IonToolbar,
    IonGrid,
    IonRow,
    IonButton,
    OrderList,
    Toolbar
  },
  setup() {

    const orders = ref<IPurchaseOrder[]>([
      { id: 'PO-001', supplier: 'supplier one', description: 'description one', date: new Date(), status: PurchaseStatus.PENDING },
      { id: 'PO-002', supplier: 'supplier two', description: 'description two', date: new Date(), status: PurchaseStatus.APPROVED },
      { id: 'PO-003', supplier: 'supplier two', description: 'description three', date: new Date(), status: PurchaseStatus.DECLINED },
      { id: 'PO-004', supplier: 'supplier two', description: 'description four', date: new Date(), status: PurchaseStatus.CLOSE },
      { id: 'PO-005', supplier: 'supplier two', description: 'description five', date: new Date(), status: PurchaseStatus.CLOSE },
      { id: 'PO-006', supplier: 'supplier two', description: 'description six', date: new Date(), status: PurchaseStatus.DECLINED },
      { id: 'PO-007', supplier: 'supplier two', description: 'description seven', date: new Date(), status: PurchaseStatus.APPROVED },
      { id: 'PO-008', supplier: 'supplier two', description: 'description eight', date: new Date(), status: PurchaseStatus.PENDING },
      { id: 'PO-009', supplier: 'supplier two', description: 'description nine', date: new Date(), status: PurchaseStatus.CLOSE }
      

    ])

    const user = ref<IName>({
      firstName: 'Jerry', lastName: 'Bayoneta', middleName: 'Gutual'
      })

    const status = ref<PurchaseStatus>(PurchaseStatus.PENDING)
    
    const handleClick = (term: PurchaseStatus) => {
      status.value = term
    }

    return {orders, user, handleClick, PurchaseStatus, status}

  }
});
</script>

<style scoped>
  img{
    display: inline-block;
    margin-left: 2%;
 
  }
  ion-title{
    display: inline-block;
    margin-top: 1%;
  }
  .tableTitle{
    background-color: aqua;
    color: black;
    font-weight: bold;
    margin: 5% 0% 3%,
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