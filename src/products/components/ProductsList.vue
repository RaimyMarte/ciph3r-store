<template>
  <v-container>
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" md="4">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useProductStore } from '../../store/products';
import ProductCard from './ProductCard.vue';

export default defineComponent({
  components: { ProductCard },
  setup() {
    const productStore = useProductStore();

    productStore.fetchProducts();

    return {
      products: productStore.products,
    };
  },
});
</script>