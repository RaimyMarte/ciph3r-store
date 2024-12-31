<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="mb-4">
        <h1 class="text-h4 font-weight-bold">Productos</h1>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <Loading />
    </v-row>

    <v-row v-else>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useProductStore } from '../../store/products';
import Loading from '../../ui/components/Loading.vue';
import ProductCard from './ProductCard.vue';
import { showToast } from '../../store/toast';

export default defineComponent({
  components: { Loading, ProductCard, },
  setup() {
    const productStore = useProductStore();
    const products = computed(() => productStore.filtersActive ? productStore.filteredProducts : productStore.products)
    const loading = ref(true);

    onMounted(async () => {
      try {
        await productStore.fetchProducts();
      } catch (error) {
        console.error(error);
        showToast('Ha ocurrio un error', 'error');
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
