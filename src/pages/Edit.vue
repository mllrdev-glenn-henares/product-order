<template>
  <ion-page>
    <Toolbar title-text="Edit" />
    <ion-content>
      <form class="mainEdit" @submit.prevent="updateOrder">
      <div class="closeButton">
        <ion-icon name="close-sharp" @click="returnToHome()"></ion-icon>
      </div>
        <h5>{{ orderDetail.orderId }}</h5>
        <form @submit.prevent="addItemDetail">
          <form class="headDetail">
            <h6>General Information</h6>
            <ion-item lines="none">
              <ion-label position="stacked" class="label">Supplier</ion-label>
              <ion-input
                type="text"
                name="supplier"
                v-model="orderDetail.supplier"
              ></ion-input>
            </ion-item>
            <ion-item lines="none">
              <ion-label position="stacked" class="label">PO description</ion-label>
              <ion-input
                type="text"
                name="description"
                v-model="orderDetail.description"
              ></ion-input>
            </ion-item>
          </form>
          <div class="headDetail">
            <ion-item lines="none">
              <ion-label position="stacked" class="label">Purchase Date</ion-label>
              <ion-input
                type="date"
                name="purchaseDate"
                v-model="orderDetail.purchaseDate"
              ></ion-input>
            </ion-item>
            <ion-item lines="none">
              <ion-label position="stacked" class="label">Requestor</ion-label>
              <ion-input type="text" v-model="orderDetail.requestor">{{
              }}</ion-input>
            </ion-item>
          </div>
          <ion-grid>
            <h6>Details</h6>
          <ion-row class="itemHeader">
            <ion-col size="0.5"> </ion-col>
            <ion-col size="1.5">Quantity</ion-col>
            <ion-col size="3">Item</ion-col>
            <ion-col size="3">Unit Price</ion-col>
            <ion-col size="2">Sub-Total</ion-col>
          </ion-row>
          <ion-row
            v-for="(item, index) in itemList"
            :key="index"
            @keyup="calculateSubTotal(index)"
            class="itemDetailsEdit"
          >
            <ion-col size="0.5" class="itemRender">{{ index + 1 }}</ion-col>
            <ion-col size="1.5"  class="itemDetails">
              <ion-input
                type="number"
                autofocus
                v-model="item.quantity"
                name="quantity"
                placeholder="Quantity"
                class="itemQuantity"
                required
              ></ion-input>
            </ion-col>
            <ion-col size="3"  class="itemDetails">
              <ion-input
                type="text"
                autofocus
                v-model="item.name"
                name="name"
                placeholder="item"
                required
              ></ion-input>
            </ion-col>
            <ion-col size="3"  class="itemDetails">
              <ion-input
                type="decimal"
                autofocus
                v-model="item.unitPrice"
                name="unitPrice"
                placeholder="Price"
                required
              ></ion-input>
            </ion-col>
            <ion-col size="2"  class="itemDetails">
            <ion-input
              type="decimal"
              autofocus
              v-model="item.subTotal"
              name="subTotal"
              placeholder="Total Price"
            ></ion-input>
            </ion-col>
            <ion-col size="2" class="itemDetails">
              <ion-button button @click="deleteItemow(index)" id="deleteItemCol">
                <ion-icon name="close-sharp"></ion-icon>
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="0.5"> </ion-col>
            <ion-col size="1.5">
            <ion-input
              type="number"
              autofocus
              class="itemQuantity"
              v-model="item.quantity"
              name="quantity"
              placeholder="Quantity"
              required
            ></ion-input>
            </ion-col>
            <ion-col size="3">
            <ion-input
              type="text"
              autofocus
              v-model="item.name"
              name="name"
              placeholder="Item"
              required
            ></ion-input>
            </ion-col>
            <ion-col size="3">
            <ion-input
              type="decimal"
              autofocus
              v-model="item.unitPrice"
              name="unitPrice"
              placeholder="Price"
              required
            ></ion-input>
            </ion-col>
            <ion-col size="2" class="itemRender"> {{item.subTotal.toFixed(2)}}</ion-col>
            <ion-col>
              <ion-button button type="submit" id="addButton">+</ion-button>
            </ion-col>
          </ion-row>
          </ion-grid>
        </form>
        <ion-text size="large">
            <p>Grand Total <span>{{ orderDetail.grandTotal.toFixed(2) }}</span></p> 
        </ion-text>
        <ion-button class="submitButton" button type="submit"
          >update</ion-button
        >
        <ion-button class="cancelButton" button @click="returnToView()"
          >Cancel</ion-button
        >
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonItem,
  IonInput,
  IonLabel,
  IonCol,
  IonRow,
  IonButton,
  IonText,
} from "@ionic/vue";
import { defineComponent, onUpdated, ref } from "vue";
import Toolbar from "@/shared/components/Toolbar.vue";
import { orderService } from "@/core/services/api/v1/order.service";
import { useRoute } from "vue-router";
import IGetOrderByIdResponse from "@/core/interfaces/order/responses/get-order-by-id.interface";
import getUserFromPayload from "@/core/services/jwt.service";
import UserRole from "@/core/enums/user-role.enum";
import IUpdateOrderRequest, {
  IItemRequest,
} from "@/core/interfaces/order/requests/update-order.interface";
import RouteName from "@/core/enums/route-name.enum";
import router from "@/router";

export default defineComponent({
  name: "Edit",
  components: {
    IonContent,
    Toolbar,
    IonPage,
    IonItem,
    IonInput,
    IonLabel,
    IonCol,
    IonRow,
    IonButton,
    IonText,
  },
  setup() {
    const item = ref<IItemRequest>({
      orderItemId: 0,
      itemId: 0,
      quantity: 0,
      name: "",
      unitPrice: 0,
      subTotal: 0
    });

    const itemList = ref<IItemRequest[]>([]);

    const orderDetail = ref<IUpdateOrderRequest>({
      orderId: "",
      requestor: "",
      orderItems: itemList.value,
      supplier: "",
      purchaseDate: new Date(),
      grandTotal: 0,
      description: "",
    });

    const $filters: any = {};

    const role = ref<UserRole>();

    onUpdated(() => {
      orderDetail.value.orderId = useRoute().params.orderId as string;
    });

    onUpdated(() => {
      const id = useRoute().params.orderId as string;
      role.value = getUserFromPayload().role;
      switch (role.value) {
        case UserRole.REQUESTOR:
          orderService.requestor
            .getRequestorById(id)
            .then((value: IGetOrderByIdResponse) => {
              orderDetail.value = value;
              itemList.value = value.orderItems;
            });
          break;
        case UserRole.APPROVER:
          orderService.approver
            .getApproverById(id)
            .then((value: IGetOrderByIdResponse) => {
              orderDetail.value = value;
              itemList.value = value.orderItems;
            });
          break;
      }
    });

    return { itemList, item, orderDetail, RouteName, $filters };
  },
  methods: {
    addItemDetail() {
      this.item.subTotal =
        (this.item.unitPrice || 0) * (this.item.quantity || 1);
      this.itemList.push(this.item);
      this.orderDetail.orderItems = this.itemList;
      this.orderDetail.grandTotal = 0;
      this.itemList.forEach((item: IItemRequest) => {
        this.orderDetail.grandTotal += (item.subTotal || 0);
      });

      this.item = {} as IItemRequest;
    },
    updateOrder() {
      orderService.requestor
        .updateOrder(this.orderDetail)
        .then((success: boolean) => {
          switch (success) {
            case true:
              alert(`${this.orderDetail.orderId} is updated`);
              this.returnToHome();
              break;
            case false:
              alert(`failed to update ${this.orderDetail.orderId}`);
              break;
          }
        });
    },
    calculateSubTotal(index: number) {
      this.itemList[index].subTotal = 0;
      this.orderDetail.grandTotal = 0;
      this.itemList[index].subTotal =
        (this.itemList[index].unitPrice || 0) *
        (this.itemList[index].quantity || 1);
      this.itemList.forEach((item: IItemRequest) => {
        this.orderDetail.grandTotal += (item.subTotal || 0);
      });
    },
    deleteItemow(index: number) {
      this.itemList.splice(index, 1);
    },
    returnToHome() {
      router.push({
        name: RouteName.HOME,
        params: {
          orderId: this.orderDetail.orderId,
        },
      });
    },
    returnToView() {
        router.push({
        name: RouteName.VIEW,
        params: {
          orderId: this.orderDetail.orderId,
        },
      });
    }
  },
});
</script>

<style scoped>
/* * {
  outline: solid red 1px;
} */
ion-content {
  --background: #95b7bf;
  color: #2a3132;
}
h1 {
  display: block;
}
.mainEdit {
  padding: 2%;
  width: 65%;
  margin: 5% 17.5% 5%;
  color: #2a313290;
  background-color: white;
  border-radius: 20px;
}
.headDetail ion-input {
  --padding-start: 10px;
  min-height: 30px;
  margin-top: 15px;
}
ion-input {
  --padding-start: 0px;
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
ion-button {
  --background: #2a3132;
  --border-radius: 20px;
}
ion-input {
  color: #2a3132;
}
.submitButton {
  margin-left: 75%;
  margin-top: 20px;
  display: inline-block;
}
.cancelButton {
  margin-top: 20px;
  display: inline-block;
}
h3 {
  margin-left: 75%;
}
 h6{
  color: #36424485;
  font-weight: bold;
}
.label{
  font-size: 20px;
  color: #5aa4b0;
  font-weight: bold;
}
h5 {
  color: #2a3132;
  font-weight: bold;
}
#deleteItemCol {
  color: #b75b69;
  font-weight: bold;
  font-size: 17px;
  --background: none;
  --box-shadow: none;
  display: block;
  height: 25px;
  margin-top: 7px;
}
#addButton {
  color: #527ace;
  font-size: 35px;
  --background: none;
  --box-shadow: none;
  display: block;
  height: 25px;
  margin-top: 7px;
}
.itemRender {
  margin-top: 10px;
}
.itemDetails {
  border-bottom: solid 1px #36424480;
  color: #2a3132;
}
.itemHeader {
  color: #5aa4b0;
  font-weight: bold;
  font-size: 13px;
  margin: 8px 0px;
}
.itemQuantity {
  --padding-start: 12px;
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
.closeButton {
  display: block;  
  margin-left: 96.5%;
}
</style>