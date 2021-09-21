<template>
  <Toolbar title-text="Edit Order" />
  <ion-content>
    <div id="content-container">
      <form class="mainCreate" @submit.prevent="editPurchaseOrder">
        <ion-title>
          <ion-label>Purchase Order</ion-label>
        </ion-title>
        <form>
          <div id="general-information-container" class="margin-top-20px">
            <ion-grid>
              <ion-row>
                <ion-label>General Information</ion-label>
              </ion-row>
              <ion-row class="margin-top-20px">
                <ion-col>
                  <ion-label>Supplier</ion-label>
                  <ion-input
                    type="text"
                    name="supplier"
                    v-model="orderDetail.supplier"
                  ></ion-input>
                </ion-col>
                <ion-col>
                  <ion-label>Purchase Date</ion-label>
                  <ion-input
                    type="date"
                    name="purchaseDate"
                    v-model="orderDetail.purchaseDate"
                  ></ion-input>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-label>PO description</ion-label>
                  <ion-input
                    type="text"
                    name="description"
                    v-model="orderDetail.description"
                  ></ion-input>
                </ion-col>
                <ion-col>
                  <ion-label>Requestor</ion-label>
                  <ion-input type="text" name="user"></ion-input>
                </ion-col>
              </ion-row>
            </ion-grid>
          </div>
        </form>
        <hr />
        <ion-grid>
          <ion-row>
            <ion-label>Details</ion-label>
          </ion-row>
          <ion-row class="margin-top-20px">
            <ion-col>
              <ion-label>Item</ion-label>
            </ion-col>
            <ion-col>
              <ion-label>Quantity</ion-label>
            </ion-col>
            <ion-col>
              <ion-label>Unit Price</ion-label>
            </ion-col>
            <ion-col>
              <ion-label>Sub-Total</ion-label>
            </ion-col>
          </ion-row>
          <ion-row v-for="item in itemDetails" :key="item.name">
            <ion-col>{{ item.name }}</ion-col>
            <ion-col>{{ item.quantity }}</ion-col>
            <ion-col>{{ item.unitPrice }}</ion-col>
            <ion-col>{{ item.subTotal }}</ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-input
                type="text"
                autofocus
                v-model="item.name"
                name="name"
                placeholder="item"
                required
              ></ion-input>
            </ion-col>
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
            <ion-button button @click="addItemDetail">ADD</ion-button>
          </ion-row>
          <ion-row>
            <ion-col offset="2">
              <ion-input
                placeholder="Grand Total"
                autofocus
                disabled
              ></ion-input>
            </ion-col>
            <ion-col>
              <ion-input
                type="number"
                name="grandTotal"
                v-model="orderDetail.grandTotal"
                placeholder="Grand Total"
                disabled
              ></ion-input>
            </ion-col>
          </ion-row>
          <ion-row>
            <div v-if="role === UserRole.REQUESTOR">
              <ion-col
                ><ion-button class="submitButton" button type="submit"
                  >Create</ion-button
                >
              </ion-col>
              <ion-col>
                <ion-button class="cancelButton" button href="/home"
                  >Cancel</ion-button
                >
              </ion-col>
            </div>
          </ion-row>
        </ion-grid>
      </form>
      <div v-if="role === UserRole.APPROVER">
        <ion-button id="declineButton" @click="declinePurchaseOrder()"
          >DECLINE</ion-button
        >
      </div>
    </div>
  </ion-content>
</template>

<script lang="ts">
import { IonContent, IonTitle, IonInput } from "@ionic/vue";
import { defineComponent, onMounted, ref } from "vue";
import Toolbar from "@/shared/components/Toolbar.vue";
import IItem from "@/core/interfaces/item.interface";
import { orderService } from "@/core/services/order.service";
import router from "@/router";
import IPurchaseOrder from "@/core/interfaces/purchase-order/purchase-order.interface";
import IPurchaseOrderRequest from "@/core/interfaces/purchase-order/purchase-order-request.interface";
import PurchaseStatus from "@/core/enums/status.enum";
import UserRole from "@/core/enums/user-role.enum";
import getUserFromPayload from "@/core/services/jwt.service";

export default defineComponent({
  name: "Create",
  components: {
    IonContent,
    Toolbar,
    IonTitle,
    IonInput,
  },
  setup() {
    const item = ref<IItem>({} as IItem);

    const itemDetails = ref<IItem[]>([]);

    const orderDetail = ref<IPurchaseOrder>({
      items: [],
      supplier: "",
      purchaseDate: new Date(),
      grandTotal: 0,
      description: "",
    });

    const orderStatusUpdate = ref<IPurchaseOrderRequest["approver"]>({
      id: "",
      orderDetails: {
        status: PurchaseStatus.PENDING,
      },
    });

    const role = ref<UserRole>();

    onMounted(() => {
      role.value = getUserFromPayload().role;
    });

    return {
      itemDetails,
      item,
      orderDetail,
      orderStatusUpdate,
      role,
      UserRole,
    };
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

      this.item = {} as IItem;
    },
    editPurchaseOrder() {
      this.orderDetail.items = this.itemDetails;
      orderService.requestor.edit(this.orderDetail);
      router.push("/home");
    },
    declinePurchaseOrder() {
      this.orderStatusUpdate.orderDetails.status = PurchaseStatus.DENIED;
      orderService.approver
        .purchaseStatusUpdate(this.orderStatusUpdate)
        .then((success: boolean) => {
          switch (success) {
            case true:
              alert(`${this.orderStatusUpdate.id} have been denied`);
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
#content-container {
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: white;
  color: black;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 20px;
  border-radius: 30px;
}

#general-information-container ion-input {
  color: black;
  border: 2px #5aa4b0 solid;
  border-radius: 10px;
  width: 80%;
}
.margin-top-20px {
  margin-top: 20px;
}
ion-content {
  border-radius: 20px;
  --background: grey;
  padding-bottom: 10%;
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
}
</style>