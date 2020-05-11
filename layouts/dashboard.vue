<template>
  <div class="container-fluid main-wrapper">
    <!-- navbar -->
    <ul class="navbar list-unstyled">
      <li>
        <nuxt-link to="/" class="pl-3 font-weight-bold btn btn-primary" tag="a">ParkingApp</nuxt-link>
      </li>
      <ul class="right-menu list-unstyled d-flex">
        <li>
          Desarrollado por
          <a
            target="_blank"
            href="https://elalexoh.github.io/portfolio/"
          >Frederick Gonzalez (Deeply)</a>
        </li>
      </ul>
    </ul>
    <!-- main content -->
    <main class="main-content">
      <nuxt/>
    </main>
  </div>
</template>
<script>
export default {};
</script>
<style>
* {
  box-sizing: border-box;
}
body {
  background-color: #202020;
  color: #b7b7b7;
  font-family: Arial, Helvetica, sans-serif;
}
h1 {
  font-size: 17pt;
}
h2 {
  font-size: 14pt;
}
.navbar {
  display: flex;
}
.right-menu {
  justify-content: end;
}
.right-menu a {
  color: #42b883;
}
.navbar > li,
.navbar > .right-menu {
  flex: 0 1 50%;
}
.main-content {
  height: calc(100vh - 70px);
  overflow: hidden;
}
</style>
