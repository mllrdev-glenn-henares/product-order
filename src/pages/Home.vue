<template>
  <ion-page>
    <ion-toolbar>
      <Toolbar title-text="Home" />
    </ion-toolbar>
    <ion-content :fullscreen="true">
      <div class="filterButton">
        <ion-button button @click="handleClick(PurchaseStatus.PENDING)"
          >Pending</ion-button
        >
        <ion-button button @click="handleClick(PurchaseStatus.APPROVED)"
          >Approve</ion-button
        >
        <ion-button button @click="handleClick(PurchaseStatus.DENIED)"
          >Declined</ion-button
        >
        <ion-button button @click="handleClick(PurchaseStatus.CLOSED)"
          >Closed</ion-button
        >
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
      <order-list :orders="orders" :status="status" />
      <ion-button id="addButton" href="/create" v-if="role === UserRole.REQUESTOR">add Icon</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import PurchaseStatus from "@/core/enums/status.enum";
import {
  IonContent,
  IonPage,
  IonToolbar,
  IonGrid,
  IonRow,
  IonButton,
} from "@ionic/vue";
import {
  defineComponent,
  onUpdated,
  ref,
} from "vue";
import OrderList from "@/shared/components/OrderList.vue";
import Toolbar from "@/shared/components/Toolbar.vue";
import { orderService } from "@/core/services/order.service";
import IPurchaseOrderResponse from "@/core/interfaces/purchase-order/purchase-order-response.interface";
import UserRole from "@/core/enums/user-role.enum";
import getTokenProperties from "@/core/services/jwt.service";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
    IonToolbar,
    IonGrid,
    IonRow,
    IonButton,
    OrderList,
    Toolbar,
  },
  setup() {
    const orders = ref<IPurchaseOrderResponse['simple'][]>([]);

    const status = ref<PurchaseStatus>(PurchaseStatus.PENDING);

    const handleClick = (term: PurchaseStatus) => {
      status.value = term;
    };

    const role = ref<UserRole>()

    onUpdated(() => {
      role.value = getTokenProperties().role;
      switch(role.value) {
        case UserRole.REQUESTOR:
          orderService.requestor.getAllByUser().then((value: IPurchaseOrderResponse['simple'][]) => {
            orders.value = value || [];
          });
          break;
          
        case UserRole.APPROVER:
          orderService.approver.getAll().then((value: IPurchaseOrderResponse['simple'][]) => {
            orders.value = value || [];          
          });
          break;

      }
    });
    return {
      orders,
      handleClick,
      PurchaseStatus,
      status,
      role,
      UserRole,
      nested: {
        orders
      }
    };
  },
});
</script>

<style scoped>
img {
  display: inline-block;
  margin-left: 2%;
}
ion-title {
  display: inline-block;
  margin-top: 1%;
}
.tableTitle {
  background-color: aqua;
  color: black;
  font-weight: bold;
  margin: 1% 0% 1%;
}
ion-grid {
  text-align: center;
}
#signInButton {
  float: right;
  margin-top: 13px;
  margin-right: 2%;
}
#addButton {
  float: right;
  vertical-align: top;
  margin-right: 2%;
}
.filterButton {
  margin-left: 5%;
}
h1 {
  color:black
}
</style>