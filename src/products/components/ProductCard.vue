<template>
  <v-card class="h-100 d-flex flex-column" elevation="2" hover>
    <v-img :src="product.image || 'https://placehold.co/600x400'" height="200" cover class="bg-grey-lighten-2">
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <v-card-title class="text-truncate">{{ product.name }}</v-card-title>

    <v-card-text>
      <p class="text-truncate mb-2">{{ product.resumen }}</p>
      <div class="d-flex align-center mb-2">
        <v-icon color="error" icon="mdi-star"></v-icon>
        <span class="text-body-2 ml-1">{{ product.user?.rating || 'N/A' }}</span>
      </div>
      <p class="text-h6 font-weight-bold mb-0">${{ formatPrice(product.price) }}</p>
    </v-card-text>

    <v-card-actions class="mt-auto">
      <v-btn block color="primary" variant="elevated" :disabled="!product.stock" @click="addToCart(product.name)">
        <v-icon left>mdi-cart</v-icon>
        {{ product.stock ? 'Agregar al carrito' : 'Sin Existencia' }}
      </v-btn>
    </v-card-actions>

    <v-card-text class="pt-0">
      <small class="text-grey">SKU: {{ product.sku }}</small>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IProduct } from '../../interfaces/product';
import { showToast } from '../../store/toast';

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<IProduct>,
      required: true,
    },
  },
  methods: {
    formatPrice(price: string): string {
      return Number(price).toLocaleString('es-MX');
    },
    addToCart(name:string) {
      showToast(`${name} ha sido agregado al carrito`, 'success');
    },
  },
});
</script>