<template>
  <div class="order-list">
    <ion-grid>
      <ion-row class="item" @click="handleOrderRowClick(order.id)" v-for="(order, index) in purchaseOrders" :key="index">
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
import {
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { useRouter  } from "vue-router";
import IOrderSimple from "../interface/order/order-simple.interface";
import RouteName from "../enums/route-name.enum";
import moment from "moment";

export default defineComponent({
  name: "order-list",
  components:{
    IonGrid,
    IonRow,
    IonCol,
  },
  props: {
    orders: {
      required: true,
      type: Array as PropType<IOrderSimple[]>,
    },
    status: {
      required: false,
      type: String
    },
    
  },
  setup(props) {

    const router = useRouter();

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
    const handleOrderRowClick = (id: string) => {
      router.push({
        name: RouteName.VIEW,
        params: {
          orderId: id,
        },
      });
    }


    return { purchaseOrders, timeFormater, handleOrderRowClick }
  }
});
</script>

<style scoped>
  h1{
    display: inline-block;
    margin-left: 2%;
 
  }
  ion-title{
    display: inline-block;
  }
  .tableTitle{
    background-color: aqua;
    color: black;
    font-weight: bold;
    margin-left: 5%;
    margin-right: 5%;
  }
  ion-grid{
    text-align: left;
    color: #878a8f;
    background-color: #ffffff;
    font-size: 14px;
  }
  ion-col{
   text-align: left;
   margin-bottom: 5px;
  }
  #signInButton{
    float: right;
    margin-top: 13px;
    margin-right: 2%;
  }
  #addButton{
    float: right;
    vertical-align: top;
    margin-right: 2%;
  }
  ion-row {
    border-bottom: solid #f5f5f5 2px;
    margin: 5px;
    font-weight: 300;
  }
  .APPROVED {
    text-align: center;
    border-radius: 20px;
    color: #72b2a4;
    background-color: #c8eae5;
    width: 10px;
  }
  .DENIED {
    text-align: center;
    border-radius: 20px;
    color: #b75b69;
    background-color: #eec7ce;
    width: 10px;
  }
  .PENDING {
    text-align: center;
    border-radius: 20px;
    color: #527ace;
    background-color: #bdd0f6;
    width: 10px;
  }
  .CLOSED {
    text-align: center;
    border-radius: 20px;
    color: #846fa0;
    background-color: #d0b8ef;
    width: 10px;
  }
</style>
