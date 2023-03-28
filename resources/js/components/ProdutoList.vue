<template>
  <div class="bg-white">
    <Loading :is-loading="loading"></Loading>
    <h2 class="text-4xl font-italic text-italic tracking-tight text-gray-900">BUSCAR PRODUTOS</h2>
    <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
    <div class="pb-12">
      <div class="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
        <div class="col-span-full">
          <div class="relative z-0 w-full group">
            <input type="text" v-model="query" @change="carregarProdutos()" name="floating_search" id="floating_search" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:border-gray-600 focus:outline-none focus:ring-0 peer" placeholder="O QUE ESTÁ PROCURANDO?"  />
          </div>
        </div>
      </div>
      <div class="sm:col-span-3">
        <select id="tipos" v-model="tipo" @change="carregarProdutos()" class="mt-10 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option v-for="tipo in tiposProdutos" :value="tipo">
            {{ tipo.tipo }}
          </option>
        </select>
      </div>
    </div>
    <div class="mx-auto max-w-2xl py-8 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-2">
      <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-2">
        <div v-for="produto in produtos" :key="produto.id" class="group relative">
          <div class="min-h-100 aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-100">
            <v-lazy-image :src="produto.img_cover" :alt="produto.name" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a :href="produto.href" @click="abrirDetalheProduto(produto)">
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ produto.name }}
                </a>
              </h3>
              <p class="mt-1 text-sm text-gray-500">{{ produto.color }}</p>
              <p class="mt-1 text-sm font-medium text-gray-900">R$ {{ produto.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Paginacao
      :page="paginacao.page"
      :current-page="paginacao.currentPage"
      :total-pages="paginacao.totalPages"
      @update:currentPage="newValue => { paginacao.currentPage = newValue; carregarProdutos()}" 
      @update:page="newValue => paginacao.page = newValue" 
    />

    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95" enter-to="opacity-100 translate-y-0 md:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 md:scale-100" leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
              <DialogPanel class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div class="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button type="button" class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8" @click="open = false">
                    <span class="sr-only">Fechar</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div class="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                    <div class="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <v-lazy-image :src="produto.img_cover" :alt="produto.name" class="object-cover object-center" />
                    </div>
                    <div class="sm:col-span-8 lg:col-span-7">
                      <h2 class="text-2xl font-bold text-gray-900 sm:pr-12">{{ produto.name }}</h2>

                      <section aria-labelledby="information-heading" class="mt-2">
                        <h3 id="information-heading" class="sr-only">Detalhes do produto</h3>
                        <p class="text-2xl text-gray-900">R$ {{ produto.price }}</p>
                      </section>

                      <section aria-labelledby="options-heading" class="mt-10">
                        <h3 id="options-heading" class="sr-only">Opções</h3>

                          <!-- Cor -->
                          <div>
                            <h4 class="text-sm font-medium text-gray-900">Cor: {{ colorSelecionada.product_color_name }}</h4>
                            <RadioGroup v-model="colorSelecionada" class="mt-4">
                              <RadioGroupLabel class="sr-only"> Escolha uma cor </RadioGroupLabel>
                              <span class="flex items-center space-x-3">
                                <RadioGroupOption as="template" v-for="color in produto.fabrics" :key="color.product_color_name" :value="color" v-slot="{ active, checked }">
                                  <div :class="['ring-black', active && checked ? 'ring-1' : '', !active && checked ? 'ring-1' : '', 'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none']">
                                    <RadioGroupLabel as="span" class="sr-only"> {{ color.name }} </RadioGroupLabel>
                                    <span aria-hidden="true" :style="recuperarCorFundo(color.hexa)" class="h-8 w-8 rounded-full border border-black border-opacity-10" />
                                  </div>
                                </RadioGroupOption>
                              </span>
                            </RadioGroup>
                          </div>

                          <!-- Tamanho -->
                          <div class="mt-10">
                            <div class="flex items-center justify-between">
                              <h4 class="text-sm font-medium text-gray-900">Tamanho</h4>
                            </div>
                            <RadioGroup v-model="tamanhoSelecionado" class="mt-4">
                              <RadioGroupLabel class="sr-only"> Selecione o tamanho </RadioGroupLabel>
                              <div class="grid grid-cols-4 gap-4">
                                <RadioGroupOption as="template" v-for="tamanho in tamanhoProdutos" :key="tamanho.nome" :value="tamanho" :disabled="!tamanho.disponivel" v-slot="{ active, checked }">
                                  <div :class="[tamanho.disponivel ? 'cursor-pointer bg-white text-gray-900 shadow-sm' : 'cursor-not-allowed bg-gray-50 text-gray-200', active ? 'ring-1 ring-black' : '', 'group relative flex items-center justify-center border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1']">
                                    <RadioGroupLabel as="span">{{ tamanho.nome }}</RadioGroupLabel>
                                    <span v-if="tamanho.disponivel" :class="[active ? 'border' : 'border-1', checked ? 'ring-1 ring-black' : 'border-transparent', 'pointer-events-none absolute -inset-px']" aria-hidden="true" />
                                    <span v-else aria-hidden="true" class="pointer-events-none absolute -inset-px border-1 border-gray-200">
                                      <svg class="absolute inset-0 h-full w-full stroke-2 text-gray-200" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
                                        <line x1="0" y1="100" x2="100" y2="0" vector-effect="non-scaling-stroke" />
                                      </svg>
                                    </span>
                                  </div>
                                </RadioGroupOption>
                              </div>
                            </RadioGroup>
                          </div>
                          <button @click="adicionarProduto()" class="mt-6 flex w-full items-center justify-center border border-transparent bg-black py-3 px-8 text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-indigo-500 focus:ring-offset-2" @onclick="adicionarCarinho()">COMPRAR</button>
                      </section>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import {
    Dialog,
    DialogPanel,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'
  import { XMarkIcon } from '@heroicons/vue/24/outline'
  import { carrinhoStore } from '../stores/carrinho'
  import Paginacao from './Paginacao.vue'
  import Loading from './Loading.vue'
  import VLazyImage from 'v-lazy-image'

  const loading = ref(false)
  const query = ref('Minas')
  const paginacao = ref({
    perPage: 36,
    page: 1,
    currentPage: 1,
    totalPages: 1,
    totalHits: 0 
  })
  const tipo = ref({ id: 0, tipo: 'TIPO'})
  const produtos = ref([])
  const produto = ref(null)
  const open = ref(false)
  const colorSelecionada = ref({})
  const tamanhoSelecionado = ref({})
  const carrinho = carrinhoStore()
  
  //#FIXME: integrar com api
  const tamanhoProdutos = ref([
    { nome: 'PP', disponivel: true },
    { nome: 'P', disponivel: true },
    { nome: 'M', disponivel: true },
    { nome: 'G', disponivel: true },
    { nome: 'GG', disponivel: true },
    { nome: '2GG', disponivel: true },
    { nome: '3GG', disponivel: true },
    { nome: '4GG', disponivel: false },
  ])

  //CANECA, POSTER CAPAS, SKETCHBOOK, MEIA, BANDEIRA DECORATIVA, MANGA LONGA
  const tiposProdutos = ref([
    { id: 0, tipo: 'TIPO'},
    { id: 1, tipo: 'CAMISETA'},
    { id: 5, tipo: 'MOLETON'},
    { id: 44, tipo: 'SHORT'},
    { id: 45, tipo: 'CAMISA'},
    { id: 39, tipo: 'CALÇA'},
    { id: 46, tipo: 'SAIA'},
    { id: 48, tipo: 'CALÇA DE MOLETOM'},
    { id: 34, tipo: 'BERMUDA DE MOLETOM'},
    { id: 4, tipo: 'REGATA'}
  ])

  const carregarProdutos = async () => {
    loading.value = true;
    
    try {
      let response = await fetch(`http://localhost:8000/api/produtos?query=${query.value}&page=${paginacao.value.currentPage}&per_page=${paginacao.value.perPage}&tipo=${tipo.value.id}`);
      
      if (!response.ok) {
          throw Error('Erro ao recuperar os produtos');
      }
      const data = await response.json();
      
      let { products } = data;
      
      produtos.value = products.hits;
      paginacao.value.currentPage = products.current_page;
      paginacao.value.perPage = products.per_page;
      paginacao.value.totalHits = products.totalHits;
      paginacao.value.totalPages = products.total_pages;  
      loading.value = false;

    } catch(e) {
      console.log("Erro ao carregar os dados");
      loading.value = false;
    }
  }

  const abrirDetalheProduto = async ($produto) => {
    open.value = true;
    colorSelecionada.value = {}
    tamanhoSelecionado.value = {}
    produto.value = $produto;
    
  }
  const recuperarCorFundo = (color) => {
    return `background-color: ${color}`;
  }
  const adicionarProduto = () => {
    open.value = false;
    let item = Object.assign(produto.value, {tamanho: tamanhoSelecionado.value, cor: colorSelecionada.value})
    carrinho.adicionar(item);
  }

  onMounted(async () => {
    await carregarProdutos();
  })
</script>

