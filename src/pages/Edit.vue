<template>
  <Toolbar title-text="Create" />
  <ion-content>
    <form class="mainCreate" @submit.prevent="createPurchaseOrder">
      <ion-title>
        <h1>Purchase Order</h1>
      </ion-title>
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
      <ion-row v-for="item in itemDetails" :key="item.name">
        <ion-col>{{ item.name }}</ion-col>
        <ion-col>{{ item.quantity }}</ion-col>
        <ion-col>{{ item.unitPrice }}</ion-col>
        <ion-col>{{ item.subTotal }}</ion-col>
      </ion-row>
      <form @submit.prevent="addItemDetail">
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
      <ion-button class="submitButton" @click="onSubmitEdit()">Edit</ion-button>
      <ion-button class="cancelButton" button href="/home">Cancel</ion-button>
    </form>
  </ion-content>
</template>

<script lang="ts">
import { IonContent, IonTitle, IonItem, IonInput } from "@ionic/vue";
import { defineComponent, onMounted, ref } from "vue";
import Toolbar from "@/shared/components/Toolbar.vue";
import IItem from "@/core/interfaces/item.interface";
import { useRoute, useRouter } from "vue-router";
import { orderService } from "@/core/services/order.service";
import router from "@/router";
import IPurchaseOrderRequest from "@/core/interfaces/purchase-order/purchase-order-request.interface";

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
    const router = useRouter();
    const route = useRoute();
    const orderIdParam = route.params.orderId
    const item = ref<IPurchaseOrderRequest['IEditItems']>({} as IPurchaseOrderRequest['IEditItems']);

    const itemDetails = ref<IPurchaseOrderRequest['IEditItems'][]>([]);

    const orderDetail = ref<IPurchaseOrderRequest['requestor']>({
      orderId: '',
      description: "",
      purchaseDate: new Date(),
      supplier: "",
      orderItems: [],
      grandTotal: 0
    });

    onMounted(() => {
      orderService.requestor
        .getOrder(orderIdParam)
        .then((value: any) => {
          console.log(value.orderItems);
          orderDetail.value = value;
          itemDetails.value = value.orderItems;
        });
    });

    return { itemDetails, item, orderDetail, router };
  },
  methods: {
    addItemDetail() {
      this.item.subTotal =
        (this.item.unitPrice || 0) * (this.item.quantity || 1);
      this.itemDetails.push(this.item);
      this.orderDetail.grandTotal = 0;
      this.itemDetails.forEach((item: IItem) => {
        this.orderDetail.grandTotal += item.subTotal || 0;
      });

      this.item = {} as IPurchaseOrderRequest['IEditItems'];
    },
    createPurchaseOrder() {
      console.log(this.orderDetail);
    },
    onSubmitEdit() {
      orderService.requestor.edit(this.orderDetail).then((isSuccess: boolean) => {
        if (isSuccess) {
          router.push("/home");
        }
        else {
          alert("Failed to edit.")
        }
      });
    },
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