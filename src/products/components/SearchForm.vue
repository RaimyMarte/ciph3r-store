<template>
    <v-form>
      <v-text-field
        label="Buscar por nombre"
        v-model="searchText"
        @input="searchProducts"
      ></v-text-field>
      <v-select
        :items="categories"
        label="Filtrar por categoría"
        v-model="selectedCategory"
        @change="searchProducts"
      ></v-select>
    </v-form>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useProductStore } from '../../store/products';
  
  export default defineComponent({
    setup() {
      const productStore = useProductStore();
      productStore.fetchCategories();
  
      const searchProducts = () => {
        // productStore.filterProducts(selectedCategory, searchText);
      };
  
      return {
        categories: productStore.categories,
        searchText: '',
        selectedCategory: '',
        searchProducts,
      };
    },
  });
  </script>
  