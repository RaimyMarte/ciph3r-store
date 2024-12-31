<template>

    <v-snackbar
      v-model="toastState.visible"
      :timeout="3000"
      :color="toastState.type"
      top
      right
      dense
      class="custom-toast"
      transition="fade-transition"
    >
      {{ toastState.message }}
    </v-snackbar>

</template>

<script>
import { useToastState } from '@/store/toast';

export default {
  setup() {
    const toastState = useToastState(); 

    return { toastState };
  },
};
</script>

<style scoped>
.custom-toast {
  border-radius: 20px;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  opacity: 0.9;
  z-index: 9999; 
}
</style>
