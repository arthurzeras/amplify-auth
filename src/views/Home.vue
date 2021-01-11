<template>
  <div class="home">
    <h1>Amplify Auth</h1>

    <template v-if="isLogged">
      <p>
        Logged as <strong>{{ user.email }}</strong>
      </p>

      <button @click="logout()">
        LOGOUT
      </button>
    </template>

    <button @click="login()" v-else>
      LOGIN WITH GOOGLE
    </button>
  </div>
</template>

<script lang="ts">
import { Auth } from 'aws-amplify';
import { onMounted, reactive, computed, toRefs } from 'vue';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib-esm/types';

function login() {
  Auth.federatedSignIn({
    provider: CognitoHostedUIIdentityProvider.Google,
  });
}

function checkUser() {
  return Auth.currentAuthenticatedUser()
    .then(user => user)
    .catch(() => ({}));
}

export default {
  name: 'Home',

  setup() {
    const state = reactive({
      user: {},
    });

    const isLogged = computed(() => !!Object.keys(state.user).length);

    onMounted(async () => {
      const user = await checkUser();
      state.user = user?.attributes || {};
    });

    const logout = () => {
      Auth.signOut().catch(() => {
        state.user = {};
      });
    };

    return {
      login,
      logout,
      isLogged,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss">
.home {
  text-align: center;
}
</style>
