<template>
  <div class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link exact to="/category/front-end">
        <img src="http://bit.ly/vue-img" alt="Vue SPA" />
      </router-link>
      <router-link class="navbar-item" to="/category/front-end">
        Front-end
      </router-link>
      <router-link class="navbar-item" :to="{ name: 'category', params: {id: 'mobile' } }">
        Mobile
      </router-link>
      <router-link class="navbar-item" to="/login">
        <span v-if="isAuthenticated">Logout</span>
        <span v-else>Login</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(['isAuthenticated'])
  }
};
</script>
