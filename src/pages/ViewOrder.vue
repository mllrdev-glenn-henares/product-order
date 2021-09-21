<template>
  <ion-page>
    <Toolbar title-text="View Order" />
    <ion-content :fullscreen="true">
      <ion-label>View Order</ion-label>
      <ion-grid>
        <ion-row>
          <ion-col>Supplier: {{ orderDetail.supplier }}</ion-col>
          <ion-col>Purchase Date: {{ orderDetail.purchaseDate }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Description: {{ orderDetail.description }}</ion-col>
          <ion-col>Requestor: {{ orderDetail.requestor }}</ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid id="item-container">
        <ion-row>
          <ion-col>Item</ion-col>
          <ion-col>Quantity</ion-col>
          <ion-col>Unit Price</ion-col>
          <ion-col>Sub-Total</ion-col>
        </ion-row>
        <ion-row v-for="item in itemDetails" :key="item.name">
          <ion-col>{{ item.name }}</ion-col>
          <ion-col>{{ item.quantity }}</ion-col>
          <ion-col>{{ item.unitPrice }}</ion-col>
          <ion-col>{{ item.subTotal }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <h3>Grand Total {{ orderDetail.grandTotal }}</h3>
          </ion-col>
        </ion-row>
      </ion-grid>
      <hr />
      <div v-if="role === UserRole.REQUESTOR">
        <ion-button class="submitButton" button @click="onEdit()"> Edit </ion-button>
        <ion-button class="cancelButton" button href="/home">Cancel</ion-button>
      </div>
      <div v-if="role === UserRole.APPROVER">
        <ion-button @click="changePurchaseOrderStatus(PurchaseStatus.DENIED)">Declien</ion-button>
        <ion-button @click="changePurchaseOrderStatus(PurchaseStatus.APPROVED)">approve</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonLabel, IonCol, IonRow, IonGrid, IonButton } from "@ionic/vue";
import { defineComponent, onMounted, onUpdated, ref } from "vue";
import Toolbar from "@/shared/components/Toolbar.vue";
import IItem from "@/core/interfaces/item.interface";
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

export default defineComponent({
  name: "View",
  components: {
    IonContent,
    IonPage,
    IonLabel,
    IonCol,
    IonRow,
    IonGrid,
    IonButton,
    Toolbar,
  },
  setup() {
    const item = ref<IItem>({} as IItem);

    const itemDetails = ref<IItem[]>([]);

    const role = ref<UserRole>()

    const orderStatusUpdate = ref<IUpdateOrderStatusRequest>({
      id: "",
      orderDetails: {
        status: PurchaseStatus.PENDING,
      },
    });

    const orderDetail = ref<IOrder>({
      orderId: "",
      requestor: "",
      description: "",
      purchaseDate: new Date(),
      supplier: "",
      orderItems: itemDetails.value,
      grandTotal: 0,
    });
    onMounted(() => {
      
      role.value = getUserFromPayload().role;
      switch(role.value){
        case UserRole.REQUESTOR:
          orderService.requestor
          .getRequestorById(useRoute().params.orderId)
          .then((value: IGetOrderByIdResponse) => {
            orderDetail.value = value;
            itemDetails.value = value.orderItems
          });
          break
        case UserRole.APPROVER:
          orderService.approver
            .getApproverById(useRoute().params.orderId).
            then((value: IGetOrderByIdResponse) => {
            orderDetail.value = value;
            itemDetails.value = value.orderItems
          });
          break
        case UserRole.ADMIN:
          orderService.admin
            .getAdminById(useRoute().params.orderId).
            then((value: IGetOrderByIdResponse) => {
            orderDetail.value = value;
            itemDetails.value = value.orderItems
          });
      }
    });

    onUpdated(() => {
      orderStatusUpdate.value.id = useRoute().params.orderId as string;
    })
    const onEdit = () => {
      router.push({
        name: "Edit",
      });
    };
    return { itemDetails, item, orderDetail, onEdit, orderStatusUpdate, PurchaseStatus, role, UserRole };
  },
  methods: {
    changePurchaseOrderStatus(status: PurchaseStatus) {
      this.orderStatusUpdate.orderDetails.status = status;
      console.log(this.orderStatusUpdate)
            orderService.approver
        .updateOrderStatus(this.orderStatusUpdate)
        .then((success: boolean) => {
          switch (success) {
            case true:
              alert(`${this.orderStatusUpdate.id} have been ${this.orderStatusUpdate.orderDetails.status}`);
              router.push({name: RouteName.HOME});
              break;
            case false:
              alert("PO status update failed");
              break;
          }
        });
  },
},
});
</script>

<style scoped>
ion-item {
  width: 60%;
}

ion-text {
  color: black;
  padding: 10px;
}

ion-grid {
  --background: white;
  width: 60%;
  color: black;
}

#container {
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
}

#item-container {
  width: 80%;
}

</style>