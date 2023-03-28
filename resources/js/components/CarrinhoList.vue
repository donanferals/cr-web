<template>
      <div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true" v-if="carrinho.carrinhoAberto">
      <!--
        Background backdrop, show/hide based on slide-over state.

        Entering: "ease-in-out duration-500"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in-out duration-500"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <!--
              Slide-over panel, show/hide based on slide-over state.

              Entering: "transform transition ease-in-out duration-500 sm:duration-700"
                From: "translate-x-full"
                To: "translate-x-0"
              Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
                From: "translate-x-0"
                To: "translate-x-full"
            -->
            <div class="pointer-events-auto w-screen max-w-md">
              <!--
                Close button, show/hide based on slide-over state.

                Entering: "ease-in-out duration-500"
                  From: "opacity-0"
                  To: "opacity-100"
                Leaving: "ease-in-out duration-500"
                  From: "opacity-100"
                  To: "opacity-0"
              -->
              <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                  <div class="flex items-start justify-between">
                    <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">MINHA SACOLA</h2>
                    <div class="ml-3 flex h-7 items-center">
                      <button type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500" @click="carrinho.fechar()">
                        <span class="sr-only">Fechar carrinho</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div class="mt-8" v-if="carrinho.countProdutos">
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
                                <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" @click="carrinho.remover(produto)">Excluir</button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div v-else>
                    <div class="mt-8">
                      <span class="text-base font-medium">Sua sacola está vazia.</span>
                      <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
                    </div>
                  </div>
                </div>
                <div class="border-t border-gray-200 py-6 px-4 sm:px-6" v-if="carrinho.countProdutos">
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
</template>
<script setup>
  import { carrinhoStore } from '/resources/js/stores/carrinho'
  const carrinho = carrinhoStore()
</script>