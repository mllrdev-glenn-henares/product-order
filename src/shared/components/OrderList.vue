<template>
  <div class="order-list">
    <ion-grid>
      <ion-row class="item" @click="handleOrderRowClick(order.id)" v-for="order in purchaseOrders" :key="order.id">
        <ion-col size="2"> {{ order.id }} </ion-col>
        <ion-col size="2"> {{ order.supplier }} </ion-col>
        <ion-col size="2"> {{ order.description }} </ion-col>
        <ion-col size="2"> {{ timeFormater(order.createdAt) }} </ion-col>
        <ion-col size="2">{{ order.grandTotal }}</ion-col>
        <ion-col :class="order.status" size="1.2"> {{ order.status }} </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import moment from "moment";
import router from "@/router";
import IOrderSimple from "@/core/interfaces/order/order-simple.interface";

export default defineComponent({
  name: "order-list",
  props: {
    orders: {
      required: true,
      type: Array as PropType<Array<IOrderSimple>>,
    },
    status: {
      required: false,
      type: String || null
    }
    
  },
  setup(props) {
    const $filters: any = {};

    const timeFormater = (date: Date | string) => {
      return (date = moment.utc(date).format("MM/DD/YYYY"));
    };

    const purchaseOrders = computed(() => {
        if (props.status === null) {
          return props.orders
        }
        else {
          return [...props.orders].filter((a: IOrderSimple ) => {
              if (a.status === props.status) {
                return -1
              }
              return 0
          });
        }
      
    })
    return { purchaseOrders, timeFormater }
  },
  methods: {
    handleOrderRowClick(id: string) {
      router.push({
        name: "View",
        params: {
          orderId: id,
        },
      });
    },
  },
});
</script>

<style scoped>
h1 {
  display: inline-block;
  margin-left: 2%;
}
ion-title {
  display: inline-block;
}
.tableTitle {
  background-color: aqua;
  color: black;
  font-weight: bold;
  margin-left: 5%;
  margin-right: 5%;
}
ion-grid {
  text-align: center;
  color: black;
  margin: 2%;
}
ion-col {
  outline: 1px solid black;
}
#signInButton {
  float: right;
  margin-top: 13px;
  margin-right: 2%;
}
#addButton {
  float: right;
  vertical-align: top;
  margin-right: 2%;
}
.filterButton {
  margin-left: 5%;
}
</style>
