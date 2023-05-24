<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink to="/" class="link-navbar">Index</RouterLink>
        </li>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <li class="nav-item">
          <RouterLink to="/Pokemons" class="link-navbar">Pokemons</RouterLink>
        </li>
      </ul>
      <ul class="navbar-nav nav-items-right">
        <li class="nav-item">
          <RouterLink to="/login" class="link-navbar">Login</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/signup" class="link-navbar">Signup</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
  <RouterView></RouterView>
  <footer class="footer">
      <div class="container">
        <p>
          Este es el footer de la página. Aquí puedes agregar cualquier contenido adicional que desees.
          <RouterLink to="/terms" class="link-footer">Términos y condiciones</RouterLink>
        </p>
      </div>
    </footer>
</template>

<style scoped>
  .nav-item {
    padding: 10px;
  }

  .bg-body-tertiary {
    background-color: #DC143C !important;
  }

  .link-navbar {
    color: black !important;
    font-size: large;
    font-weight: 600;
  }

  .link-navbar:hover {
    color: blue !important;
  }

  .nav-items-right {
    justify-content: flex-end !important;
  }

  .footer {
    background-color: #2a27fa;
  }
</style>
