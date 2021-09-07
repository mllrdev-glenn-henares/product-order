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
          <ion-col />
          <ion-col />
          <ion-col />
          <ion-col>{{ orderDetail.grandTotal }}</ion-col>
        </ion-row>
      </ion-grid>
      <hr />
      <ion-button @click="onEdit(this.$route.params.orderId)">
        Edit
      </ion-button>
      <ion-button>Cancel</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent } from "@ionic/vue";
import { defineComponent, onMounted, ref } from "vue";
import Toolbar from "@/shared/components/Toolbar.vue";
import IItem from "@/core/interfaces/item.interface";
import IPurchaseOrder from "@/core/interfaces/purchase-order/purchase-order.interface";
import { useRouter } from "vue-router";
import { orderService } from "@/core/services/order.service";
import IPurchaseOrderResponse from "@/core/interfaces/purchase-order/purchase-order-response.interface";

export default defineComponent({
  name: "Create",
  components: {
    IonContent,
    Toolbar,
  },
  setup() {
    const router = useRouter();

    const item = ref<IItem>({} as IItem);

    const itemDetails = ref<IItem[]>([]);

    const orderDetail = ref<IPurchaseOrder>({
      items: [],
      supplier: "",
      purchaseDate: new Date(),
      grandTotal: 0,
      description: "",
    });
    onMounted(() => {
      orderService.requestor
        .getOrder("PO-000001")
        .then((value: any) => {
         console.log(value.supplier)
         console.log(orderDetail.value)
         orderDetail.value = value
         itemDetails.value = value.orderItems
        });
    });
    const onEdit = (id: string | string[]) => {
      router.push({
        name: "Edit",
        params: {
          orderId: id,
        },
      });
    };
    return { itemDetails, item, orderDetail, onEdit };
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