<template>
  <div class="bg-white">
    <Menu></Menu>
    <CarrinhoList></CarrinhoList>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <router-view> </router-view>
      </div>
  </div>
</template>

<script setup>
  import Menu from '/resources/js/components/Menu.vue'
  import CarrinhoList from '/resources/js/components/CarrinhoList.vue'
</script>
    