<template>
  <ion-page>
    <Toolbar />
    <ion-content>
      <form class="mainCreate" @submit.prevent="createPurchaseOrder">
        <ion-title>
          <h2>New Purchase Order</h2>
          <ion-text>General Information</ion-text>
        </ion-title>
        <form class="headDetail">
          <ion-item lines="none">
            <ion-label position="stacked"><h6>Supplier</h6></ion-label>
            <ion-input
              autofocus
              type="text"
              name="supplier"
              v-model="orderDetail.supplier"
            ></ion-input>
          </ion-item>
          <ion-item lines="none">
            <ion-label position="stacked"><h6>PO description</h6></ion-label>
            <ion-input
              autofocus
              type="text"
              name="description"
              v-model="orderDetail.description"
            ></ion-input>
          </ion-item>
        </form>
        <div class="headDetail">
          <ion-item lines="none">
            <ion-label position="stacked"><h6>Purchase Date</h6></ion-label>
            <ion-input
              autofocus
              type="date"
              name="purchaseDate"
              v-model="orderDetail.purchaseDate"
            ></ion-input>
          </ion-item>
          <ion-item lines="none">
            <ion-label position="stacked"><h6>Requestor</h6></ion-label>
            <ion-input type="text" name="user" v-model="name"></ion-input>
          </ion-item>
        </div>
        <ion-row class="itemHeader">
          <ion-col> </ion-col>
          <ion-col>Item</ion-col>
          <ion-col>Quantity</ion-col>
          <ion-col>Unit Price</ion-col>
          <ion-col>Sub-Total</ion-col>
        </ion-row>
        <ion-row v-for="(item, index) in itemDetails" :key="index" class="addedItem">
          <ion-col class="itemCount">{{ index + 1 }}</ion-col>
          <ion-col>{{ item.name }}</ion-col>
          <ion-col>{{ item.quantity }}</ion-col>
          <ion-col>{{ item.unitPrice }}</ion-col>
          <ion-col>{{ item.subTotal.toFixed(2) }}</ion-col>
        </ion-row>
        <form @submit.prevent="addItemDetail">
          <ion-row>
            <ion-input
              type="number"
              autofocus
              name="#"
              placeholder="#"
              disabled
              class="disabled"
            ></ion-input>
            <ion-input
              type="text"
              autofocus
              v-model="item.name"
              name="name"
              placeholder="Item"
              required
            ></ion-input>
            <ion-input
              type="text"
              autofocus
              v-model="item.quantity"
              name="quantity"
              placeholder="Quantity"
              required
            ></ion-input>
            <ion-input
              type="text"
              autofocus
              v-model="item.unitPrice"
              name="unitPrice"
              placeholder="Price"
              required
            ></ion-input>
            <ion-input
              type="text"
              autofocus
              v-model="item.subTotal"
              name="subTotal"
              placeholder="Total Price"
              disabled
              class="disabled"
            ></ion-input>
          </ion-row>
          <ion-button button type="submit">ADD Item</ion-button>
        </form>
        <ion-text>
          <h5>
            <ion-input
              type="hidden"
              name="grandTotal"
              placeholder="Grand Total"
              disabled
            ><span>Grand Total</span> {{ orderDetail.grandTotal.toFixed(2) }}</ion-input>
          </h5>
        </ion-text>
          <ion-button class="submitButton" button type="submit"
            >Create</ion-button
          >
          <ion-button
            class="cancelButton"
            button
            @click="$router.push({ name: RouteName.HOME })"
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
  IonTitle,
  IonItem,
  IonInput,
  IonLabel,
  IonCol,
  IonRow,
  IonText,
  IonButton,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import Toolbar from "@/shared/components/Toolbar.vue";
import IItem from "@/core/interfaces/item.interface";
import { orderService } from "@/core/services/api/v1/order.service";
import router from "@/router";
import ICreateOrderRequest from "@/core/interfaces/order/requests/create-order.interface";
import RouteName from "@/core/enums/route-name.enum"
import getUserFromPayload from "@/core/services/jwt.service";

export default defineComponent({
  name: "Create",
  components: {
    IonContent,
    IonPage,
    Toolbar,
    IonTitle,
    IonItem,
    IonInput,
    IonLabel,
    IonCol,
    IonRow,
    IonText,
    IonButton,
  },
  setup() {
    const item = ref<IItem>({} as IItem);

    const itemDetails = ref<IItem[]>([]);

    const orderDetail = ref<ICreateOrderRequest>({
 
      items: itemDetails.value,
      supplier: '',
      purchaseDate: new Date,
      grandTotal: 0,
      description: '',
    });

    const name: string = getUserFromPayload().firstName

    const addItemDetail = () => {
      item.value.subTotal =
      (item.value.unitPrice || 0) * (item.value.quantity || 1);
      itemDetails.value.push(item.value);
      orderDetail.value.grandTotal = 0;
      itemDetails.value.forEach((item: IItem) => {
        orderDetail.value.grandTotal += item.subTotal || 0;
      });
      item.value = {} as IItem;

    }

    const createPurchaseOrder = () => {
      orderDetail.value.items = itemDetails.value;
      orderService.requestor.requestorCreate(orderDetail.value);
      router.push({
        name: RouteName.HOME,
      });
    }


    return {
      itemDetails,
      item,
      orderDetail,
      RouteName,
      name,
      addItemDetail,
      createPurchaseOrder
    };
  },
});
</script>

<style scoped>
ion-content {
  --background: #95b7bf;
  text-align: left;
}
h2 {
  margin-bottom: 20px;
}
.mainCreate {
  padding: 2%;
  width: 75%;
  margin: 3% 12.5% 3%;
  color: #2a3132;
  background-color: white;
  border-radius: 25px;
}
.headDetail {
  display: inline-block;
  vertical-align: top;
  width: 45%;
  min-height: 200px;
  margin-bottom: 1%;
}
.headDetail ion-input {
  --padding-start: 10px;
  min-height: 30px;
  border-radius: 10px;
  margin-top: 15px;
  border: solid #5aa4b0 1px;
  opacity: 0.75;
}
.disabled {
   --placeholder-opacity: 1;
}
hr {
  margin: 1% -1%;
  padding: 10px;
  border-bottom: grey solid;
  opacity: 50%;
}
.tableTitle {
  background-color: #5aa4b0;
  color: black;
  font-weight: bold;
  margin-top: 1%;
}
ion-col {
  border-bottom: solid 1px;
  padding: 10px 0px 10px 0px;
}
ion-item {
  margin: 2%;
}
ion-button {
  --background: #2a3132;
  --border-radius: 20px;
}
.submitButton {
  margin-left: 75%;
  display: inline-block;
}
.cancelButton {
  display: inline-block;  
}
h5 {
  margin-left: 75%;
}
#declineButton {
  margin-left: 75%;
  display: inline-block;
}
h6 {
  font-size: 20px;
  font-weight: bold;
}
span {
  color: #5aa4b0;
  margin-right: 10px;
}
.itemHeader{
  color: #5aa4b0;
  border: none;
  font-weight: bold;
}
.itemCount {
  opacity: 0.75;
}
</style>