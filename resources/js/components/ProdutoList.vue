<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="text-4xl font-bold tracking-tight text-gray-900">Produtos</h2>
      <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-2">
        <div v-for="produto in produtos" :key="produto.id" class="group relative">
          <div class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
            <img :src="produto.img_cover" :alt="produto.imageAlt" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a :href="produto.href">
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ produto.name }}
                </a>
              </h3>
              <p class="mt-1 text-sm text-gray-500">{{ produto.color }}</p>
            </div>
            <p class="text-sm font-medium text-gray-900">R$ {{ produto.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'

    const query = ref('')
    const perPage = ref(36)
    const page = ref(1)
    const tipo = ref(0)
    const produtos = ref([])

    const loadProdutos = async () => {
      try {
        let response = await fetch(`http://localhost:8000/api/produtos?query=${query}&page=${page}&per_page=${perPage}}&tipo=${tipo}`)

        if (!response.ok) {
            throw Error('Erro ao recuperar os produtos')
        }
        const data = await response.json()
        produtos.value = data.products.hits
        
      } catch(e) {
        console.log("Errro ao carregar os dados")
      }
    }

    loadProdutos();
</script>

