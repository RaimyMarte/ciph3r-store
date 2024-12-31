<template>
  <v-container>
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" md="4" class="text-center">
        <v-progress-circular size="50" width="4" indeterminate color="primary"></v-progress-circular>
        <div class="mt-3">...Cargando</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  name: "Loading",
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>