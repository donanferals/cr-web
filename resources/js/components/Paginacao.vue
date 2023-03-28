<template>
  <div class="flex flex-1 items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <button class="relative inline-flex items-center border border-black bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    @click="() => {paginaAnterior(); $emit('update:currentPage', (compCurrentPage) )}">{{'< ANTERIOR'}}
  </button>
    <button class="relative ml-3 inline-flex items-center border border-black bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600" 
      @click="() => {proximaPagina(); $emit('update:currentPage', compCurrentPage);}">PRÓXIMA >
    </button>
  </div>
</template>
<script setup>

import { defineProps, defineEmits, ref } from 'vue'

  const props = defineProps(['currentPage', 'page', 'totalPages']);
  defineEmits([
    'update:currentPage',
    'update:page'
  ]);
  let compCurrentPage = ref(props.currentPage)
  const compPage = ref(props.page)
  const compTotalPages = ref(props.totalPages)
  const pageInitial = ref(1)

  const proximaPagina = () => {
    compCurrentPage.value++;
  }

  const paginaAnterior = () => {
    compCurrentPage.value--;
  }
</script>