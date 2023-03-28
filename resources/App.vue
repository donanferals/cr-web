<template>
  <div class="bg-white">
    <Menu></Menu>
    <!-- Carrinho -->
    <div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true" v-if="carrinho.carrinhoAberto">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div class="pointer-events-auto w-screen max-w-md">
            <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                <div class="flex items-start justify-between">
                  <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">MINHA SACOLA</h2>
                  <div class="ml-3 flex h-7 items-center">
                    <button type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500" @click="carrinho.fecharCarrinho()">
                      <span class="sr-only">Close panel</span>
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="mt-8" v-if="carrinho.produtos">
                  <div class="flow-root">
                    <ul role="list" class="-my-6 divide-y divide-gray-200">
                      <li class="flex py-6" v-for="produto in carrinho.produtos">
                        <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img :src="produto.img_cover" :alt="produto.name" class="h-full w-full object-cover object-center">
                        </div>
                        <div class="ml-4 flex flex-1 flex-col">
                          <div>
                            <div class="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href="#">{{ produto.name }}</a>
                              </h3>
                              <p class="ml-4">R$ {{ produto.price }}</p>
                            </div>
                            <p class="mt-1 text-sm text-gray-500">{{ produto.cor.product_color_name }}</p>
                          </div>
                          <div class="flex flex-1 items-end justify-between text-sm">
                            <p class="text-gray-500">Qtd 1</p>
                            <div class="flex">
                              <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">Excluir</button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <p>TOTAL</p>
                  <p>R$ {{ carrinho.getTotal }}</p>
                </div>
                <div class="mt-6">
                  <a href="#" class="flex items-center justify-center border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700">FINALIZAR COMPRA</a>
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <router-view> </router-view>
      </div>
  </div>
</template>

<script setup>
  import { carrinhoStore } from '/resources/js/stores/carrinho'
  import Menu from '/resources/js/components/Menu.vue'

  const carrinho = carrinhoStore()

</script>
    