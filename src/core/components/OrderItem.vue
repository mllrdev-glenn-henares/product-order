<template>
  <ion-grid>
    <ion-row>
      <ion-col>1</ion-col>
      <ion-input type="text" autofocus name="Quantity" placeholder="Quantity"></ion-input>
      <ion-input type="text" autofocus name="unitDescription" placeholder="Description"></ion-input>
      <ion-input type="text" autofocus name="UnitPrice" placeholder="Price"></ion-input>
      <ion-input type="text" autofocus name="subTotal" placeholder="Total Price"></ion-input>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OrderItem',
  components: {

  }
 
})
</script>

<style scoped>

</style>

