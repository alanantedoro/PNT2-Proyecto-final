<script setup>

</script>
<template>
    <div>
        <form action="/signup" method="POST">
            <label for="username">Nombre de usuario:</label>
            <input type="text" id="username" name="username"><br><br>
            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password"><br><br>
            <input type="submit" value="Iniciar sesión">
        </form>
    </div>
</template>
<style scoped>
</style>