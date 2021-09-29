<template>
  <ion-page>
    <Toolbar title-text="View Order" />
    <ion-content :fullscreen="true">
      <div class="mainView">
      <div class="cancelButton">
        <ion-icon name="close-sharp" @click="returnToHome()" ></ion-icon>
      </div>
      <h5>{{ orderDetail.orderId }}</h5>  
      <ion-grid class="headDetail">
        <h6>General Information</h6>
        <ion-row>
          <ion-col>
            <ion-col class="label">Supplier</ion-col>
            <ion-col>{{ orderDetail.supplier }}</ion-col>
          </ion-col>
          <ion-col>
            <ion-col class="label">Purchase Date</ion-col>
            <ion-col>{{ $filters.timeFormater(orderDetail.purchaseDate) }}</ion-col>
          </ion-col> 
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-col class="label">PO Description</ion-col>
            <ion-col>{{ orderDetail.description }}</ion-col>
          </ion-col>
          <ion-col>
            <ion-col class="label">Requestor</ion-col>
            <ion-col>{{ orderDetail.requestor }}</ion-col>
          </ion-col> 
        </ion-row>
      </ion-grid>
      <ion-grid class="viewDetail">
        <h6>Details</h6>
        <ion-row class="itemHeader">
          <ion-col size="0.5"> </ion-col>
          <ion-col size="1.5">Quantity</ion-col>
          <ion-col size="4">Description</ion-col>
          <ion-col size="4">Unit Price</ion-col>
          <ion-col size="2">Sub-Total</ion-col>
        </ion-row>
        <ion-row v-for="(item, index) in itemDetails" :key="index" class="itemRow">
          <ion-col size="0.5">{{ index + 1 }}</ion-col>
          <ion-col size="1.5" class="itemDetails itemQuantity">{{ item.quantity }}</ion-col>
          <ion-col size="4  " class="itemDetails">{{ item.name }}</ion-col>
          <ion-col size="4" class="itemDetails">{{ item.unitPrice.toFixed(2) }}</ion-col>
          <ion-col size="2" class="itemDetails subTotal">{{ item.subTotal.toFixed(2) }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <p>Grand Total <span>{{ orderDetail.grandTotal.toFixed(2) }}</span></p>
          </ion-col>
        </ion-row>
      </ion-grid>
      <div v-if="role === UserRole.REQUESTOR" class="requestorButtons">
        <ion-button class="submitButton" button @click="onEdit()">
          Edit
        </ion-button>
        <ion-button class="deleteButton" button @click="deleteOrder()">Delete</ion-button>
      </div>
      <div v-if="role === UserRole.APPROVER" class="approverButtons">
        <ion-button @click="changePurchaseOrderStatus(PurchaseStatus.DENIED)"
          >decline</ion-button
        >
        <ion-button @click="changePurchaseOrderStatus(PurchaseStatus.APPROVED)"
          >approve</ion-button
        >
      </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonCol,
  IonRow,
  IonGrid,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { defineComponent, onUpdated, ref } from "vue";
import Toolbar from "@/shared/components/Toolbar.vue";
import { useRoute } from "vue-router";
import { orderService } from "@/core/services/api/v1/order.service";
import IOrder from "@/core/interfaces/order/order.interface";
import IGetOrderByIdResponse from "@/core/interfaces/order/responses/get-order-by-id.interface";
import getUserFromPayload from "@/core/services/jwt.service";
import UserRole from "@/core/enums/user-role.enum";
import router from "@/router";
import IUpdateOrderStatusRequest from "@/core/interfaces/order/requests/update-order-status.interface";
import PurchaseStatus from "@/core/enums/status.enum";
import RouteName from "@/core/enums/route-name.enum";
import { IItemRequest } from "@/core/interfaces/order/requests/update-order.interface";

export default defineComponent({
  name: "View",
  components: {
    IonContent,
    IonPage,
    IonCol,
    IonRow,
    IonGrid,
    IonButton,
    Toolbar,
    IonIcon
  },
  setup() {
    const item = ref<IItemRequest>({} as IItemRequest);

    const itemDetails = ref<IItemRequest[]>([] as Array<IItemRequest>) ;

    const role = ref<UserRole>();

    const orderStatusUpdate = ref<IUpdateOrderStatusRequest>({
      id: "",
      status: PurchaseStatus.PENDING,
    });

     const $filters: any = {};

    const orderDetail = ref<IOrder>({
      orderId: "",
      requestor: "",
      description: "",
      purchaseDate: new Date(),
      supplier: "",
      orderItems: itemDetails.value,
      grandTotal: 0,
    });
    onUpdated(() => {
      orderStatusUpdate.value.id = useRoute().params.orderId as string;
      role.value = getUserFromPayload().role;
      switch (role.value) {
        case UserRole.REQUESTOR:
          orderService.requestor
            .getRequestorById(orderStatusUpdate.value.id)
            .then((value: IGetOrderByIdResponse) => {
              orderDetail.value = value;
              itemDetails.value = value.orderItems;
            });
          break;
        case UserRole.APPROVER:
          orderService.approver
            .getApproverById(orderStatusUpdate.value.id)
            .then((value: IGetOrderByIdResponse) => {
              orderDetail.value = value;
              itemDetails.value = value.orderItems;
            });
          break;
        case UserRole.ADMIN:
          orderService.admin
            .getAdminById(orderStatusUpdate.value.id)
            .then((value: IGetOrderByIdResponse) => {
              orderDetail.value = value;
              itemDetails.value = value.orderItems;
            });
      }
    });

    return {
      itemDetails,
      item,
      orderDetail,
      orderStatusUpdate,
      PurchaseStatus,
      role,
      UserRole,
      RouteName,
      $filters,
    };
  },
  methods: {
    changePurchaseOrderStatus(status: PurchaseStatus) {
      this.orderStatusUpdate.status = status;
      orderService.approver
        .updateOrderStatus(this.orderStatusUpdate)
        .then((success: boolean) => {
          switch (success) {
            case true:
              alert(
                `${this.orderStatusUpdate.id} have been ${this.orderStatusUpdate.status}`
              );
              this.returnToHome();
              break;
            case false:
              alert("PO status update failed");
              break;
          }
        });
    },
    onEdit() {
      router.push({
        name: RouteName.EDIT,
        params: {
          orderId: this.orderStatusUpdate.id,
        },
      });
    },
      returnToHome() {
      router.push({
        name: RouteName.HOME,
        params: {
          orderId: this.orderStatusUpdate.id,
        }
      });
    },
    deleteOrder() {
      orderService.requestor.deletePurchaseOrder(this.orderStatusUpdate.id)
      .then((success: boolean) => {
          switch (success) {
            case true:
              alert(
                `${this.orderStatusUpdate.id} have been Deleted`
              );
              this.returnToHome()
              break;
            case false:
              alert("PO deletion failed");
              break;
          }
        });
    },
  },
});
</script>

<style scoped>
/* *{
  outline: solid red 1px;
} */
ion-content {
  --background: #95b7bf;
  color: #2a3132;
}
ion-button {
  --background: #2a3132;
  --border-radius: 20px;
  margin: 13% 5px 20% 5px;
}
ion-col {
  display: block;
}
ion-text {
  color: black;
  padding: 10px;
}
.itemHeader {
  color: #5aa4b0;
  font-weight: bold;
  font-size: 13px;
  margin: 15px 0px;
}
#item-container {
  width: 80%;
}
.mainView {
  padding: 1%;
  width: 65%;
  margin: 5% 17.5% 5%;
  color: #2a313290;
  background-color: white;
  border-radius: 20px;
}
.headDetail {
  width: 100%;
  color: #2a3132;
  margin-left: 0px;
  font-size: 14px;
}
.viewDetail {
  margin-top: 2%;
}
h5 {
  color: #2a3132;
  font-weight: bold;
  display: inline-block;
}
p {
  margin: 3% 0px 0px 70%;
  color: #5aa4b0;
  font-weight: bold;
  font-size: 13px;
}
span {
  font-size: 16px;
  color: #2a3132;
  font-weight: bold;
  margin-left: 20%;
}
h6 {
  color: #36424485;
  font-weight: bold;
}
.cancelButton {
  display: block;  
  margin-left: 96.5%;
}
.requestorButtons{
  display: inline-block;
  margin-left: 71.5%;
}
.approverButtons {
  display: inline-block;
  margin-left: 61%;
}
.label {
  color: #5aa4b0;
  font-weight: bold;
}
.itemDetails {
  border-bottom: solid 1px #36424480;
  color: #2a3132;
}
.itemQuantity {
  padding-left: 15px;
}
.subTotal {
  font-weight: bold;
}
.itemRow {
  margin: 15px 0px;
}
ion-icon {
  font-size: 25px;
  color: #5aa4b0;
}
</style>