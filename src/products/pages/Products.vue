<template>
    <v-container>
        <SearchForm />
        <ProductsList />
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchForm from '../components/SearchForm.vue';
import ProductsList from '../components/ProductsList.vue';

export default defineComponent({
    components: { SearchForm, ProductsList },
});
</script>