<template>
  <ion-grid>
    <ion-row id="addRow">
      <ion-col>1</ion-col>
      <ion-input type="text" autofocus name="Quantity" placeholder="Quantity"></ion-input>
      <ion-input type="text" autofocus name="name" placeholder="Description"></ion-input>
      <ion-input type="text" autofocus name="UnitPrice" placeholder="Price"></ion-input>
      <ion-input type="text" autofocus name="subTotal" placeholder="Total Price"></ion-input>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OrderItem',
  setup() {

    
  }

 
})
</script>

<style scoped>
ion-input {
  color: black;
}

</style>

