<template>
  <ion-page>
    <ion-toolbar>
      <Toolbar title-text="Home" />
    </ion-toolbar>
    <ion-content :fullscreen="true">
      <div class="main">
        <div class="filterButton">
          <ion-title>Product Order List</ion-title>
          <ion-segment value="all">
            <ion-segment-button value="all" @click="handleClick(null)">
              <ion-label>all</ion-label>
            </ion-segment-button>
            <ion-segment-button
              value="null"
              @click="handleClick(PurchaseStatus.PENDING)"
            >
              <ion-label>PENDING</ion-label>
            </ion-segment-button>
            <ion-segment-button
              value="APPROVED"
              @click="handleClick(PurchaseStatus.APPROVED)"
            >
              <ion-label>APPROVED</ion-label>
            </ion-segment-button>
            <ion-segment-button
              value="DENIED"
              @click="handleClick(PurchaseStatus.DENIED)"
            >
              <ion-label>DENIED</ion-label>
            </ion-segment-button>
            <ion-segment-button
              value="CLOSED"
              @click="handleClick(PurchaseStatus.CLOSED)"
            >
              <ion-label>CLOSED</ion-label>
            </ion-segment-button>
          </ion-segment>
          <ion-icon name="search-sharp" color="danger"></ion-icon>
          <ion-icon name="funnel-sharp" color="primary"></ion-icon>
        </div>
        <ion-grid class="tableTitle">
          <ion-row>
            <ion-col> PO Number </ion-col>
            <ion-col> Supplier </ion-col>
            <ion-col> PO Description </ion-col>
            <ion-col> Request Date </ion-col>
            <ion-col> Amount </ion-col>
            <ion-col> Status </ion-col>
          </ion-row>
          <hr />
        </ion-grid>
        <order-list :orders="orders" :status="status" />
        <ion-button
          id="addButton"
          @click="clickToCreateOrder()"
          v-if="role === UserRole.REQUESTOR"
          >Create New PO<span> +</span>
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import PurchaseStatus from "@/core/enums/status.enum";
import {
  IonContent,
  IonPage,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/vue";
import { defineComponent, onUpdated, ref } from "vue";
import OrderList from "@/shared/components/OrderList.vue";
import Toolbar from "@/shared/components/Toolbar.vue";
import { orderService } from "@/core/services/order.service";
import IPurchaseOrderResponse from "@/core/interfaces/purchase-order/purchase-order-response.interface";
import UserRole from "@/core/enums/user-role.enum";
import getTokenProperties from "@/core/services/jwt.service";
import router from "@/router";
import { RouteName } from "@/core/enums/route-name.enum";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    OrderList,
    Toolbar,
    IonIcon,
    IonLabel,
    IonSegment,
    IonSegmentButton,
  },
  setup() {
    const orders = ref<IPurchaseOrderResponse["simple"][]>([]);

    const status = ref<PurchaseStatus | null>(null);

    const handleClick = (term: PurchaseStatus | null) => {
      status.value = term;
    };
    const role = ref<UserRole>();

    onUpdated(() => {
      role.value = getTokenProperties().role;
      switch (role.value) {
        case UserRole.REQUESTOR:
          orderService.requestor
            .getAllByUser()
            .then((value: IPurchaseOrderResponse["simple"][]) => {
              orders.value = value || [];
            });
          break;

        case UserRole.APPROVER:
          orderService.approver
            .getAll()
            .then((value: IPurchaseOrderResponse["simple"][]) => {
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
    };
  },
  methods: {
    clickToCreateOrder() {
      router.push({
        name: RouteName.CREATE,
      });
    },
  },
});
</script>

<style scoped>
/* *{
  outline: yellow 1px solid;
} */
img {
  display: inline-block;
  margin-left: 2%;
}
ion-title {
  display: inline-block;
  margin-top: 1%;
}
.tableTitle {
  color: #5aa4b0;
  text-align: left;
  /* margin: 1% 0% 1%; */
}
ion-grid {
  text-align: center;
}
ion-button {
  min-height: 20px;
  float: right;
  margin-top: 30px;
  --background: #2a3132;
  --border-radius: 20px;
}
hr {
  height: 2px;
  background-color: #bfdaf9;
}
.main {
  width: 80%;
  margin-left: 10%;
  color: #313738;

}
ion-segment {
  height: 35px;
  width: 40%;
  padding: 5px;
  border-radius: 20px;
  margin: 30px 5px 20px 5px;
  --border-radius: 30px;
  --background: #ebebeb;
}

ion-segment-button {
  min-height: 20px;
  --background: #ebebeb;
  --background-checked: #2a3132;
  --indicator-color: transparent !important;
  --indicator-color-checked: transparent !important;
  color: #a1a6ad;
}
span {
  color: whitesmoke;
  padding: 3px;
  background: #5aa4b0;
  border-radius: 10px;
  width: 30px;
}
</style>