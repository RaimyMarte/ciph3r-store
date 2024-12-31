<template>
  <AuthLayout title="Iniciar Sesión">
    <v-form @submit.prevent="login" v-model="isValid">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Correo"
        prepend-icon="mdi-email"
        required
      ></v-text-field>
      
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Contraseña"
        prepend-icon="mdi-lock"
        type="password"
        required
      ></v-text-field>
      
      <div class="d-flex flex-column align-center mt-4">
        <v-btn
          color="primary"
          type="submit"
          :loading="loading"
          :disabled="!isValid"
          block
        >
          Iniciar Sesión
        </v-btn>
        <v-btn
          variant="text"
          class="mt-2"
          @click="$router.push('/register')"
        >
          ¿No tienes cuenta? Regístrate
        </v-btn>
      </div>
    </v-form>
  </AuthLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '../../store/auth';
import AuthLayout from '../layout/AuthLayout.vue';
import { useRouter } from 'vue-router';
import { showToast } from '../../store/toast';

export default defineComponent({
  components: { AuthLayout },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const isValid = ref(false);
    const loading = ref(false);
    
    const email = ref('');
    const password = ref('');

    const emailRules = [
      (v: string) => !!v || 'El correo es requerido',
      (v: string) => /.+@.+\..+/.test(v) || 'El correo debe ser válido'
    ];

    const passwordRules = [
      (v: string) => !!v || 'La contraseña es requerida'
    ];

    const login = async () => {
      if (!isValid.value) return;
      
      loading.value = true;
      try {
        await authStore.login({
          email: email.value,
          password: password.value
        });

        router.push('/');
        showToast('Inicio de sesión exitoso', 'success');
        
      } catch (error) {
        showToast('Ha ocurrio un error', 'error');
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    return {
      isValid,
      loading,
      email,
      password,
      emailRules,
      passwordRules,
      login
    };
  }
});
</script>