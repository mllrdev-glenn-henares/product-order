<template>
  <ion-page>
    <Toolbar title-text="View Order" />
    <ion-content :fullscreen="true">
      <div id="content-container">
        <ion-title>View Order</ion-title>
        <div id="general-information-container">
          <ion-label>General Information</ion-label>
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-label id="detail-label-container">Supplier: </ion-label>
                <div id="detail-text-container">{{ orderDetail.supplier }}</div>
              </ion-col>
              <ion-col>
                <ion-label id="detail-label-container"
                  >Purchase Date:
                </ion-label>
                <div id="detail-text-container">
                  {{ orderDetail.purchaseDate }}
                </div>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-label id="detail-label-container">Description: </ion-label>
                <div id="detail-text-container">
                  {{ orderDetail.description }}
                </div>
              </ion-col>
              <ion-col>
                <ion-label id="detail-label-container">Requestor: </ion-label>
                <div id="detail-text-container">Firstname Lastname</div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>
        <div id="details-container">
          <ion-label>Details</ion-label>
          <ion-grid id="details-item-container">
            <ion-row id="details-text-container">
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
              <ion-col offset="2">
                <ion-label id="details-text-container">Grand Total</ion-label>
              </ion-col>
              <ion-col>
                <ion-label>{{ orderDetail.grandTotal }}</ion-label>
              </ion-col>
            </ion-row>
            <ion-col offset="3">
              <ion-button
                class="submitButton"
                size="small"
                button
                @click="onEdit()"
              >
                Edit
              </ion-button>

              <ion-button class="cancelButton" size="small" button href="/home">
                Cancel
              </ion-button>
            </ion-col>
          </ion-grid>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent } from "@ionic/vue";
import { defineComponent, onMounted, ref } from "vue";
import Toolbar from "@/shared/components/Toolbar.vue";
import IItem from "@/core/interfaces/item.interface";
import { useRoute, useRouter } from "vue-router";
import { orderService } from "@/core/services/order.service";
import IPurchaseOrderRequest from "@/core/interfaces/purchase-order/purchase-order-request.interface";
import router from "@/router";

export default defineComponent({
  name: "Create",
  components: {
    IonContent,
    Toolbar,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const item = ref<IItem>({} as IItem);
    const itemDetails = ref<IPurchaseOrderRequest["IEditItems"][]>([]);

    const orderDetail = ref<IPurchaseOrderRequest["requestor"]>({
      orderId: "",
      description: "",
      purchaseDate: new Date(),
      supplier: "",
      orderItems: itemDetails.value,
      grandTotal: 0,
    });
    onMounted(() => {
      orderService.requestor
        .getOrder(route.params.orderId)
        .then((value: IPurchaseOrderRequest["requestor"]) => {
          console.log(value);
          orderDetail.value = value;
          itemDetails.value = value.orderItems;
        });
    });
    return { itemDetails, item, orderDetail };
  },
  methods: {
    onEdit() {
      router.push({
        name: "Edit",
      });
    },
  },
});
</script>

<style scoped>
#content-container {
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: white;
  color: black;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
  border-radius: 30px;
}

#page-title-container {
  font-weight: bold;
  margin-bottom: 25px;
  color: black;
}

#details-text-container {
  size: 10px;
  color: #5aa4b0;
  font-weight: bold;
  font-size: 14px;
}

#general-information-container,
#details-container {
  margin-top: 20px;
}

#detail-text-container {
  color: black;
  width: 80%;
  padding: 10px;
  margin-top: 2px;
}

ion-label {
  color: grey;
}

ion-button {
  --border-radius: 25px;
  --background: black;
}

ion-grid {
  --ion-grid-columns: 4;
  margin-top: 20px;
}

ion-content {
  --background: grey;
}
</style>