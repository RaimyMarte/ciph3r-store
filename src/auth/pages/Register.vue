<template>
  <AuthLayout title="Registro">
    <v-form @submit.prevent="register" v-model="isValid">
      <v-text-field v-model="name" :rules="nameRules" label="Nombre"  required></v-text-field>

      <v-text-field v-model="email" :rules="emailRules" label="Correo"  required></v-text-field>

      <v-text-field v-model="password" :rules="passwordRules" label="Contraseña"  type="password"
        required></v-text-field>

      <v-text-field v-model="confirmPassword" :rules="[...passwordRules, passwordMatchRule]"
        label="Confirmar Contraseña" type="password" required></v-text-field>

      <div class="d-flex flex-column align-center mt-4">
        <v-btn color="primary" type="submit" :loading="loading" :disabled="!isValid" block>
          Registrarse
        </v-btn>
        <v-btn variant="text" class="mt-2" @click="$router.push('/login')">
          ¿Ya tienes cuenta? Inicia sesión
        </v-btn>
      </div>
    </v-form>
  </AuthLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '../../store/auth';
import AuthLayout from '../layout/AuthLayout.vue';
import { showToast } from '../../store/toast';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { AuthLayout },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const isValid = ref(false);
    const loading = ref(false);

    const name = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');

    const nameRules = [
      (v: string) => !!v || 'El nombre es requerido',
      (v: string) => v.length >= 3 || 'El nombre debe tener al menos 3 caracteres'
    ];

    const emailRules = [
      (v: string) => !!v || 'El correo es requerido',
      (v: string) => /.+@.+\..+/.test(v) || 'El correo debe ser válido'
    ];

    const passwordRules = [
      (v: string) => !!v || 'La contraseña es requerida',
      (v: string) => v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres'
    ];

    const passwordMatchRule = (v: string) =>
      v === password.value || 'Las contraseñas no coinciden';

    const register = async () => {
      if (!isValid.value) return;

      loading.value = true;
      try {
        await authStore.register({
          name: name.value,
          email: email.value,
          password: password.value,
          confirmPassword: confirmPassword.value
        });

        router.push('/');
        showToast('Registro exitoso', 'success');
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
      name,
      email,
      password,
      confirmPassword,
      nameRules,
      emailRules,
      passwordRules,
      passwordMatchRule,
      register
    };
  }
});
</script>