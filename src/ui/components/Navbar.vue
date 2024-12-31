<template>
  <v-app-bar color="primary" elevation="2">
    <div class="d-flex align-center w-100">
      <router-link to="/" class="text-decoration-none">
        <div class="d-flex align-center">
          <v-img
            src="/store.png"
            alt="Logo"
            class="ml-5"
            width="32"
            height="32"
          />
        </div>
      </router-link>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-btn
          to="/"
          variant="text"
          class="hidden-sm-and-down mx-2"
          color="white"
        >
          <v-icon left>mdi-home</v-icon>
          Inicio
        </v-btn>

        <!-- Cart Menu -->
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn 
              icon 
              class="mx-2" 
              color="white" 
              v-bind="props"
            >
              <v-badge
                :content="cartItemCount"
                :value="cartItemCount"
                color="error"
                overlap
              >
                <v-icon>mdi-cart</v-icon>
              </v-badge>
            </v-btn>
          </template>

          <v-list width="300">
            <v-list-item v-if="cartItemCount === 0">
              <v-list-item-title class="text-center">
                Carrito vacío
              </v-list-item-title>
            </v-list-item>

            <template v-else>
              <v-list-item v-for="item in cartItems" :key="item.id">
                <template v-slot:prepend>
                  <v-avatar size="40" rounded>
                    <v-img :src="item.image" cover></v-img>
                  </v-avatar>
                </template>
                
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ formatPrice(Number(item.price)) }}
                </v-list-item-subtitle>              
              </v-list-item>

              <v-divider></v-divider>
              
              <v-list-item>
                <v-list-item-title class="font-weight-bold">
                  Total: {{ formatTotalPrice }}
                </v-list-item-title>
                <template v-slot:append>
                  <v-btn
                    color="primary"
                    variant="text"
                    @click="goToCart"
                  >
                    Ver carrito
                  </v-btn>
                </template>
              </v-list-item>
            </template>
          </v-list>
        </v-menu>

        <!-- Authentication Section -->
        <template v-if="!isAuthenticated">
          <v-btn
            to="/login"
            variant="text"
            class="hidden-sm-and-down mx-2"
            color="white"
          >
            <v-icon left>mdi-login</v-icon>
            Iniciar Sesión
          </v-btn>
        </template>

        <template v-else>
          <v-menu offset-y>
            <template v-slot:activator="{ props }">
              <v-btn
                color="white"
                variant="text"
                class="ml-2"
                v-bind="props"
              >
                <v-avatar size="32" color="white" class="mr-2">
                  <v-img
                    v-if="user?.avatar"
                    :src="user.avatar"
                    alt="Avatar"
                  ></v-img>
                  <v-icon v-else color="primary">mdi-account</v-icon>
                </v-avatar>
                <span class="hidden-sm-and-down">{{ user?.name || 'Usuario' }}</span>
                <v-icon right>mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item to="/profile">
                <template v-slot:prepend>
                  <v-icon>mdi-account-circle</v-icon>
                </template>
                <v-list-item-title>Mi Perfil</v-list-item-title>
              </v-list-item>

              <v-list-item to="/orders">
                <template v-slot:prepend>
                  <v-icon>mdi-package-variant</v-icon>
                </template>
                <v-list-item-title>Mis Pedidos</v-list-item-title>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item @click="logout" color="error">
                <template v-slot:prepend>
                  <v-icon color="error">mdi-logout</v-icon>
                </template>
                <v-list-item-title class="text-error">
                  Cerrar Sesión
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>

        <!-- Mobile Menu Button -->
        <v-btn
          icon
          class="hidden-md-and-up ml-2"
          @click="mobileMenu = !mobileMenu"
          color="white"
        >
          <v-icon>{{ mobileMenu ? 'mdi-close' : 'mdi-menu' }}</v-icon>
        </v-btn>
      </div>
    </div>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer
    v-model="mobileMenu"
    location="right"
    temporary
  >
    <v-list>
      <v-list-item to="/" @click="mobileMenu = false">
        <template v-slot:prepend>
          <v-icon>mdi-home</v-icon>
        </template>
        <v-list-item-title>Inicio</v-list-item-title>
      </v-list-item>

      <template v-if="!isAuthenticated">
        <v-list-item to="/login" @click="mobileMenu = false">
          <template v-slot:prepend>
            <v-icon>mdi-login</v-icon>
          </template>
          <v-list-item-title>Iniciar Sesión</v-list-item-title>
        </v-list-item>

        <v-list-item to="/register" @click="mobileMenu = false">
          <template v-slot:prepend>
            <v-icon>mdi-account-plus</v-icon>
          </template>
          <v-list-item-title>Registrarse</v-list-item-title>
        </v-list-item>
      </template>

      <template v-else>
        <v-list-item to="/profile" @click="mobileMenu = false">
          <template v-slot:prepend>
            <v-icon>mdi-account-circle</v-icon>
          </template>
          <v-list-item-title>Mi Perfil</v-list-item-title>
        </v-list-item>

        <v-list-item to="/orders" @click="mobileMenu = false">
          <template v-slot:prepend>
            <v-icon>mdi-package-variant</v-icon>
          </template>
          <v-list-item-title>Mis Pedidos</v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout" color="error">
          <template v-slot:prepend>
            <v-icon color="error">mdi-logout</v-icon>
          </template>
          <v-list-item-title class="text-error">
            Cerrar Sesión
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useAuthStore } from '../../store/auth';
import { useRouter } from 'vue-router';
import { showToast } from '../../store/toast';
import { useProductStore } from '../../store/products';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const authStore = useAuthStore();
    const productStore = useProductStore();
    const router = useRouter();
    const mobileMenu = ref(false);

    const isAuthenticated = computed(() => authStore.user ? true : false);
    const user = computed(() => authStore.user);
    const cartItemCount = computed(() => productStore.cartItems.length);
    const cartItems = computed(() => productStore.cartItems);

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
      }).format(price);
    };

    const formatTotalPrice = computed(() => {
      const total = cartItems.value.reduce((sum, item) => {
        return sum + (Number(item.price) );
      }, 0);
      return formatPrice(total);
    });

    const logout = async () => {
      try {
        await authStore.logout();
        router.push('/');
        showToast('Sesión cerrada exitosamente', 'success');
      } catch (error) {
        showToast('Error al cerrar sesión', 'error');
      }
    };

    const goToCart = () => {
      router.push('/cart');
    };

    return {
      isAuthenticated,
      user,
      cartItemCount,
      cartItems,
      mobileMenu,
      logout,
      goToCart,
      formatPrice,
      formatTotalPrice,
    };
  },
});
</script>

<style scoped>
.v-btn {
  text-transform: none;
}

.v-badge__badge {
  transition: all 0.3s ease;
}

.v-list-item {
  min-height: 64px;
}
</style>