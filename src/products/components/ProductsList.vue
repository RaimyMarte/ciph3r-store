<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="mb-4">
        <h1 class="text-h4 font-weight-bold">Productos</h1>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col cols="12">
        <v-progress-circular indeterminate color="blue" size="64"></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useProductStore } from '../../store/products';
import ProductCard from './ProductCard.vue';
import { IProduct } from '../../interfaces/product';

export default defineComponent({
  components: { ProductCard },
  setup() {
    const productStore = useProductStore();
    const products = ref<IProduct[]>([]);
    const loading = ref(true);

    onMounted(async () => {
      try {
        products.value = await productStore.fetchProducts();

      } catch (error) {
        console.error(error);
      } finally {

        loading.value = false;
      }
    });

    return {
      products,
      loading,
    };
  },
});
</script>
