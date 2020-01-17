<template>
  <div>
    <footer class="py-3 mt-3 border-top">
      <div class="container">
        <ul class="list-inline text-center">
          <li class="list-inline-item h2">
            <a href="#">
              <i class="fab fa-github fa-fw"></i>
            </a>
          </li>
          <li class="list-inline-item h2">
            <a href="#">
              <i class="fab fa-facebook fa-fw"></i>
            </a>
          </li>
          <li class="list-inline-item h2">
            <a href="#">
              <i class="fab fa-instagram fa-fw"></i>
            </a>
          </li>
        </ul>
        <p class="text-center text-main">個人練習作品</p>
        <div class="text-center">
          <router-link href="#" class="h4 hide-login" to="/login">
            <i class="fas fa-user-cog"></i>
          </router-link>
        </div>
      </div>
    </footer>
  </div>
</template>
