<template>
  <v-form>
    <v-row>
      <v-col :cols="12" :md="6">
        <v-text-field label="Buscar por nombre" v-model="search" />
      </v-col>
      <v-col :cols="12" :md="6">
        <v-select clearable :items="categories" label="Filtrar por categoría" v-model="selectedCategory"
          item-title="name" item-value="uuid" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { useProductStore } from '../../store/products';
import { debounce } from 'lodash';

export default defineComponent({
  setup() {
    const productStore = useProductStore();
    const selectedCategory = ref<string>('');
    const loading = ref(true);

    const emptyCategory = {
      id: 0,
      uuid: null,
      name: 'Ninguna',
      slug: '',
      description: '',
      status: 0,
      image: '',
      created_at: null,
      updated_at: null,
    }
    const categories = computed(() => [
      emptyCategory,
      ...productStore.categories,
    ])

    const search = ref('')

    const debouncedSearch = debounce(async () => await searchProducts(), 500);

    const searchProducts = () => {
      productStore.filterProducts({ categoryUuid: selectedCategory.value, search: search.value });
    };

    watch(selectedCategory, () => searchProducts());
    watch(search, () => debouncedSearch());


    return {
      categories,
      loading,
      search,
      selectedCategory,
      searchProducts,
    };
  },
});
</script>
