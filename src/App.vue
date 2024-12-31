<template>
    <router-view />
    <Toast :message="toastState.message" :type="toastState.type" :visible="toastState.visible" />
</template>

<script setup>

import Toast from '@/ui/components/Toast.vue';
import { useToastState } from './store/toast';


const toastState = useToastState();
</script>

<style scoped></style>
