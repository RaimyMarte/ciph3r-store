<template>
    <v-app>
      <Navbar />
      <v-main>
        <router-view />
      </v-main>
      <Toast 
        :message="toastState.message" 
        :type="toastState.type" 
        :visible="toastState.visible" 
      />
    </v-app>
  </template>
  
  <script setup>
  import Toast from '@/ui/components/Toast.vue';
  import Navbar from '@/ui/components/Navbar.vue';
  import { useToastState } from './store/toast';
  
  const toastState = useToastState();
  </script>
  
  <style scoped>
  .v-main {
    background-color: #f5f5f5;
  }
  </style>