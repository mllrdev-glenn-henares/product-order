<template>
  <ion-page>
    <toolbar title-text="View Order" />
    <ion-content :fullscreen="true">
      <div class="mainView">
      <div class="closeButton">
        <ion-icon name="close-sharp" @click="returnToHome()"></ion-icon>
      </div>
      <ion-grid class="headDetail">
        <h5>{{ orderDetail.orderId }}</h5>  
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
        <h6>Details</h6>
      </ion-grid>
      <ion-grid class="viewDetail">
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
  IonIcon,
} from "@ionic/vue";
import { defineComponent, onUpdated, ref } from "vue";
import Toolbar from "@/shared/components/toolbar.vue";
import { useRoute } from "vue-router";
import { orderService } from "@/modules/purchase-order/services/api/v1/order.service";
import IOrder from "../interface/order/order.interface";
import IGetOrderByIdResponse from "../interface/order/responses/get-order-by-id.interface";
import getUserFromPayload from "@/shared/services/jwt.service";
import UserRole from "@/modules/user/enums/user-role.enum";
import { useRouter } from "vue-router";
import IUpdateOrderStatusRequest from "../interface/order/requests/update-order-status.interface";
import PurchaseStatus from "@/modules/purchase-order/enums/status.enum";
import RouteName from "@/modules/purchase-order/enums/route-name.enum";
import { IItemRequest } from "../interface/order/requests/update-order.interface";

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

    const router = useRouter();

    const item = ref<IItemRequest>({
      orderItemId: 0,
      itemId: 0,
      quantity!: 0,
      name: "",
      unitPrice: 0,
      subTotal: 0
    });

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

    const returnToHome = (): void => {
      router.push({
        name: RouteName.HOME,
        params: {
          orderId: orderStatusUpdate.value.id,
        }
      });
    }

    const changePurchaseOrderStatus = (status: PurchaseStatus): void => {
      orderStatusUpdate.value.status = status;
      orderService.approver
        .updateOrderStatus(orderStatusUpdate.value)
        .then((success: boolean) => {
          switch (success) {
            case true:
              alert(
                `${orderStatusUpdate.value.id} have been ${orderStatusUpdate.value.status}`
              );
              returnToHome();
              break;
            case false:
              alert("PO status update failed");
              break;
          }
        });
    }

    const onEdit = (): void => {
      router.push({
        name: RouteName.EDIT,
        params: {
          orderId: orderStatusUpdate.value.id,
        },
      });
    }

    const deleteOrder = (): void => {
      orderService.requestor.deletePurchaseOrder(orderStatusUpdate.value.id)
      .then((success: boolean) => {
          switch (success) {
            case true:
              alert(
                `${orderStatusUpdate.value.id} have been Deleted`
              );
              returnToHome()
              break;
            case false:
              alert("PO deletion failed");
              break;
          }
        });
    }

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
      changePurchaseOrderStatus,
      returnToHome,
      onEdit,
      deleteOrder
    };
  },
});
</script>

<style scoped>
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
  padding: 2%;
  width: 65%;
  margin: 5% 17.5% 5%;
  color: #2a313290;
  background-color: white;
  border-radius: 20px;
}
.headDetail {
  width: 98%;
  color: #2a3132;
  margin-left: 2%;
  font-size: 14px;
}
p {
  margin: 3% 0px 0px 70%;
  color: #5aa4b0;
  font-weight: bold;
  font-size: 13px;
}
span {
  font-size: 14px;
  color: #2a3132;
  font-weight: bold;
  margin-left: 20%;
}
h5 {
  color: #2a3132;
  font-weight: bold;
  display: inline-block;
}
h6 {
  color: #36424485;
  font-weight: bold;
}
.closeButton {
  display: block;  
  margin-left: 96.5%;
}
.requestorButtons{
  display: inline-block;
  margin-left: 71.5%;
}
.approverButtons {
  display: inline-block;
  margin-left: 68%;
}
#denyButton {
  --background: none;
  --box-shadow: none;
  margin-left: 15px;
  color: red;
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
  font-size: 14px;
}
ion-icon {
  font-size: 25px;
  color: #5aa4b0;
}
</style>