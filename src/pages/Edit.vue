<template>
  <Toolbar title-text="Create" />
  <ion-content>
    <form class="mainCreate" @submit.prevent="updateOrder">
      <ion-title>
        <h1>Purchase Order</h1>
      </ion-title>
      <form @submit.prevent="addItemDetail">
      <form class="headDetail">
        <ion-item>
          <ion-label>Supplier</ion-label>
          <ion-input
            type="text"
            name="supplier"
            v-model="orderDetail.supplier"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>PO description</ion-label>
          <ion-input
            type="text"
            name="description"
            v-model="orderDetail.description"
          ></ion-input>
        </ion-item>
      </form>
      <div class="headDetail">
        <ion-item>
          <ion-label>Purchase Date</ion-label>
          <ion-input
            type="date"
            name="purchaseDate"
            v-model="orderDetail.purchaseDate"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Requestor</ion-label>
          <ion-input type="text" name="user"></ion-input>
        </ion-item>
      </div>
      <hr />
      <ion-row>
        <ion-col>Item</ion-col>
        <ion-col>Quantity</ion-col>
        <ion-col>Unit Price</ion-col>
        <ion-col>Sub-Total</ion-col>
      </ion-row>
      <ion-row v-for="(item, index) in itemList" :key="index">
        <ion-input
            type="text"
            autofocus
            v-model="item.name"
            name="name"
            placeholder="item"
            required
          ></ion-input>
        <ion-input
            type="number"
            autofocus
            v-model="item.quantity"
            name="quantity"
            placeholder="Quantity"
            required
          ></ion-input>
        <ion-input
            type="number"
            autofocus
            v-model="item.unitPrice"
            name="unitPrice"
            placeholder="Price"
            required
          ></ion-input>
        <ion-input
            type="number"
            autofocus
            v-model="item.subTotal"
            name="subTotal"
            placeholder="Total Price"
            disabled
          ></ion-input>
      </ion-row>
        <ion-row>
          <ion-input
            type="text"
            autofocus
            v-model="item.name"
            name="name"
            placeholder="item"
            required
          ></ion-input>
          <ion-input
            type="number"
            autofocus
            v-model="item.quantity"
            name="quantity"
            placeholder="Quantity"
            required
          ></ion-input>
          <ion-input
            type="number"
            autofocus
            v-model="item.unitPrice"
            name="unitPrice"
            placeholder="Price"
            required
          ></ion-input>
          <ion-input
            type="number"
            autofocus
            v-model="item.subTotal"
            name="subTotal"
            placeholder="Total Price"
            disabled
          ></ion-input>
        </ion-row>
        <ion-button button type="submit">ADD</ion-button>
      </form>
      <ion-text color="light" size="large">
        <h3>
          <ion-input
            type="number"
            name="grandTotal"
            v-model="orderDetail.grandTotal"
            placeholder="Grand Total"
            disabled
          ></ion-input>
        </h3>
      </ion-text>
      <ion-button class="submitButton" button type="submit">update</ion-button>
      <ion-button class="cancelButton" button href="/home">Cancel</ion-button>
    </form>
  </ion-content>
</template>

<script lang="ts">
import { IonContent, IonTitle, IonItem, IonInput } from "@ionic/vue";
import { defineComponent, onMounted, onUpdated, ref } from "vue";
import Toolbar from "@/shared/components/Toolbar.vue";
import IItem from "@/core/interfaces/item.interface";
import { orderService } from "@/core/services/api/v1/order.service";
import { useRoute } from "vue-router";
import IGetOrderByIdResponse from "@/core/interfaces/order/responses/get-order-by-id.interface";
import getUserFromPayload from "@/core/services/jwt.service";
import UserRole from "@/core/enums/user-role.enum";
import IUpdateOrderRequest, { IItemRequest } from "@/core/interfaces/order/requests/update-order.interface";

export default defineComponent({
  name: "Create",
  components: {
    IonContent,
    Toolbar,
    IonTitle,
    IonItem,
    IonInput,
  },
  setup() {
    const item = ref<IItemRequest>({
      orderItemId: 0,
      itemId: 0,
      quantity: 0,
      name: '',
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

    const role = ref<UserRole>();

    onMounted(() => {
      role.value = getUserFromPayload().role;
      switch(role.value){
        case UserRole.REQUESTOR:
          console.log(useRoute().params.orderId)
          orderService.requestor
          .getRequestorById(useRoute().params.orderId)
          .then((value: IGetOrderByIdResponse) => {
            orderDetail.value = value;
            itemList.value = value.orderItems
          });
          break
        case UserRole.APPROVER:
          orderService.approver
            .getApproverById(useRoute().params.orderId).
            then((value: IGetOrderByIdResponse) => {
            orderDetail.value = value;
            itemList.value = value.orderItems
          });
          break
      }

      
    });


    return { itemList, item, orderDetail, };
  },
  methods: {
    addItemDetail() {
      this.item.subTotal =
        (this.item.unitPrice || 0) * (this.item.quantity || 1);
      this.itemList.push(this.item);
      this.orderDetail.orderItems = this.itemList
      this.orderDetail.grandTotal = 0;
      this.itemList.forEach((item: IItem) => {
        this.orderDetail.grandTotal += item.subTotal || 0;
      });

      this.item = {} as IItemRequest
    },
    updateOrder() {

      console.log(this.orderDetail.orderItems)
      orderService.requestor
        .updateOrder(this.orderDetail)
        .then((success: boolean) => {
          switch (success) {
            case true:
              alert(`${this.orderDetail.orderId} is updated`);
              break;
            case false:
              alert(`failed to update ${this.orderDetail.orderId}`);
              break;
          }
        });
    },
  },
  created() {
    console.log(this.$route.params.orderId);
  },
});
</script>

<style scoped>
h1 {
  display: block;
}
.mainCreate {
  padding: 1%;
  width: 80%;
  margin: 3% 10% 3%;
  color: grey;
  background-color: white;
}
p {
  color: white;
}
.headDetail {
  display: inline-block;
  width: 50%;
}
hr {
  margin: 1% -1%;
  padding: 10px;
  border-bottom: grey solid;
  opacity: 50%;
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
.submitButton {
  margin-left: 75%;
  display: inline-block;
}
.cancelButton {
  display: inline-block;
}
h3 {
  margin-left: 75%;
}
</style>