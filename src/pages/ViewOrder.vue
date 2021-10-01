<template>
  <ion-page>
    <Toolbar title-text="View Order" />
    <ion-content :fullscreen="true">
      <div class="mainView">
      <h1>{{ orderDetail.orderId }}</h1>
      <ion-grid class="mainCreate">
        <ion-row>
          <ion-col>Supplier: {{ orderDetail.supplier }}</ion-col>
          <ion-col>Purchase Date: {{ $filters.timeFormater(orderDetail.purchaseDate) }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Description: {{ orderDetail.description }}</ion-col>
          <ion-col>Requestor: {{ orderDetail.requestor }}</ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid>
        <ion-row class="itemHeader">
          <ion-col> </ion-col>
          <ion-col>Item</ion-col>
          <ion-col>Quantity</ion-col>
          <ion-col>Unit Price</ion-col>
          <ion-col>Sub-Total</ion-col>
        </ion-row>
        <ion-row v-for="(item, index) in itemDetails" :key="index">
          <ion-col>{{ index + 1 }}</ion-col>
          <ion-col>{{ item.name }}</ion-col>
          <ion-col>{{ item.quantity }}</ion-col>
          <ion-col>{{ item.unitPrice }}</ion-col>
          <ion-col>{{ item.subTotal.toFixed(2) }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <h3>Grand Total {{ orderDetail.grandTotal }}</h3>
          </ion-col>
        </ion-row>
      </ion-grid>
      <div v-if="role === UserRole.REQUESTOR || UserRole.APPROVER" class="cancelButton">
          <ion-button button @click="returnToHome()">Return</ion-button>
      </div>
      <div v-if="role === UserRole.REQUESTOR" class="requestorButtons">
        <ion-button class="deleteButton" button @click="deleteOrder()">Delete</ion-button>
        <ion-button class="submitButton" button @click="onEdit()">
          Edit
        </ion-button>
      </div>
      <div v-if="role === UserRole.APPROVER" class="approverButtons">
        <ion-button @click="changePurchaseOrderStatus(PurchaseStatus.APPROVED)"
          >approve</ion-button>
        <ion-button id="denyButton" @click="changePurchaseOrderStatus(PurchaseStatus.DENIED)"
          >deny</ion-button
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
ion-button {
  --background: #2a3132;
  --border-radius: 20px;
}
ion-text {
  color: black;
  padding: 10px;
}
.itemHeader {
  color: #5aa4b0;
  border: none;
  font-weight: bold;
}

#item-container {
  width: 80%;
}
h1 {
  display: block;
}
.mainView {
  padding: 1%;
  width: 80%;
  margin: 3% 10% 3%;
  color: grey;
  background-color: white;
  border-radius: 20px;
}
p {
  color: white;
}
.headDetail {
  display: inline-block;
  width: 50%;
}
.tableTitle {
  background-color: aqua;
  color: black;
  font-weight: bold;
  margin-top: 1%;
}
ion-item {
  width: 60%;
}
ion-input {
  color: black;
}
h3 {
  margin-left: 75%;
}
.mainCreate {
  padding: 2%;
  width: 75%;
  margin: 3% 12.5% 3%;
  color: #2a3132;
  background-color: white;
  border-radius: 25px;
}
.cancelButton {
  display: inline-block;
}
.requestorButtons{
  display: inline-block;
  margin-left: 67%;
}
.approverButtons {
  display: inline-block;
  margin-left: 62%;
}
#denyButton {
  --background: none;
  --box-shadow: none;
  color: red;
  margin-left: 20px;
}
</style>