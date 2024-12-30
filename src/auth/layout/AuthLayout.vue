<template>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="elevation-12 rounded-lg">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>{{ title }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <slot></slot>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      title: {
        type: String,
        required: true
      }
    }
  });
  </script>