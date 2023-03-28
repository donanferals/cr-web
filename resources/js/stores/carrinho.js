import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const carrinhoStore = defineStore('carrinho', () => {
  const produtos = ref([])
  let total = ref(0.0)
  const countProdutos = computed(() => produtos.value.length)
  const getTotal = computed(() => total.value)

  function addProduto(produto) {
    console.log(produto)
    produtos.value.push(produto);
    total.value += parseFloat(produto.price)
  }

  return { countProdutos, getTotal, produtos, addProduto }
})
