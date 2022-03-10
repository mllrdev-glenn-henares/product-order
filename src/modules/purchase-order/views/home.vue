<template>
  <ion-page>
    <ion-toolbar>
      <toolbar title-text="Home" />
    </ion-toolbar>
    <ion-content :fullscreen="true">
      <div class="main">
        <div class="filterButton">
          <ion-title id="title">Product Order List</ion-title>
          <ion-segment value="null">
            <ion-segment-button
              value="null"
              @click="handleClick(null)"
            >
              <ion-label>all</ion-label>
            </ion-segment-button>
            <ion-segment-button
              value="PENDING"
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
        </div>
        <ion-grid class="tableTitle">
          <ion-row>
            <ion-col size="2"> PO Number </ion-col>
            <ion-col size="2"> Supplier </ion-col>
            <ion-col size="2"> PO Description </ion-col>
            <ion-col size="2"> Request Date </ion-col>
            <ion-col size="2"> Amount </ion-col>
            <ion-col size="1.2"> Status </ion-col>
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
import PurchaseStatus from "../enums/status.enum";
import {
  IonContent,
  IonPage,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/vue";
import { defineComponent, onUpdated, ref } from "vue";
import OrderList from "@/modules/purchase-order/components/order-list.vue";
import Toolbar from "@/shared/components/toolbar.vue";
import { orderService } from "../services/api/v1/order.service";
import UserRole from "@/modules/user/enums/user-role.enum";
import getUserFromPayload from "@/shared/services/jwt.service";
import IGetAllOrdersByUserIdResponse from "../interface/order/responses/get-all-orders-by-user-id.interface";
import IGetAllOrdersResponse from "../interface/order/responses/get-all-orders.interface";
import IOrderSimple from "../interface/order/order-simple.interface";
import RouteName from "../enums/route-name.enum";
import { useRouter } from "vue-router";

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
    IonLabel,
    IonSegment,
    IonSegmentButton,
  },
  setup() {

    const router = useRouter();
    
    const orders = ref<IOrderSimple[]>([]);

    const status = ref<PurchaseStatus | null>(null);

    const handleClick = (term: PurchaseStatus | null) => {
      status.value = term;
    };

    const role = ref<UserRole>();

    onUpdated(() => {
      role.value = getUserFromPayload().role;
      switch (role.value) {
        case UserRole.REQUESTOR:
          orderService.requestor
            .getRequestorAllByUser()
            .then((value: IGetAllOrdersByUserIdResponse[]) => {
              orders.value = value;
            });
          break;
        case UserRole.APPROVER:
          orderService.approver
            .getApproverAll()
            .then((value: IGetAllOrdersResponse[]) => {
              orders.value = value;
            });
          break;
      }
    });
    const clickToCreateOrder = () => {
      router.push({
        name: RouteName.CREATE,
      });
    }
    return {
      orders,
      handleClick,
      PurchaseStatus,
      status,
      role,
      UserRole,
      clickToCreateOrder
    };
  },
  methods: {
    
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
  text-align: left;
  padding-left: 7px;
}
.tableTitle {
  color: #5aa4b0;
  text-align: left;
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
  margin-left: 5px;
}
h1 {
  color: black;
}
</style>