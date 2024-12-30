<template>
    <v-card>
      <!-- <v-img :src="product.image" aspect-ratio="1.7"></v-img> -->
      <v-card-title>{{ product.name }}</v-card-title>
      <!-- <v-card-subtitle>{{ product.category }}</v-card-subtitle> -->
      <v-card-actions>
        <v-btn color="primary" @click="addToCart">Agregar al carrito</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  export default defineComponent({
    props: {
      product: {
        type: Object as PropType<{ name: string; }>,
        required: true,
      },
    },
    methods: {
      addToCart() {
        alert('Producto agregado al carrito');
      },
    },
  });
  </script>
  