<template>
  <div class="order-list">
    <ion-grid>
      <ion-row @click="handleOrderRowClick(order.id)" v-for="order in purchaseOrders" :key="order.id">
        <ion-col> {{ order.id }} </ion-col>
        <ion-col> {{ order.supplier }} </ion-col>
        <ion-col> {{ order.description }} </ion-col>
        <ion-col> {{ order.date }} </ion-col>
        <ion-col> {{ order.status }} </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'
import PurchaseStatus from '@/core/enums/status.enum';
import IPurchaseOrder from '@/core/interfaces/purchase-order.interface';
import IUser from '@/core/interfaces/user.interface';

export default defineComponent({
  name: 'order-list',
  props: {
    orders: {
      required : true,
      type: Array as PropType<IPurchaseOrder[]>
    },
    user: {
      required: true,
      type: Object as PropType<IUser>
    },
    status: {
      required: true,
      type: Object as PropType<PurchaseStatus>
    }
    
  },
  setup(props) {
    const purchaseOrders = computed(() => {
        return [...props.orders].sort(( a: IPurchaseOrder ) => {
          if (a.status === props.status) {
            return -1
          }
          
          if (a.status > props.status) {
            return 1
          }
          
          return 0
      })
    })
    return { purchaseOrders }
  },
  methods: {
    handleOrderRowClick(id: string) {
      alert(id)
    }
    
  }
})
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
    text-align: center;
    color: black;
    margin: 2%;
  }
  ion-col{
    outline: 1px solid black;
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
  .filterButton{
    margin-left: 5%;
  }
</style>
