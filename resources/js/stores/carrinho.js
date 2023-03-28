import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const carrinhoStore = defineStore("carrinho", () => {
    const produtos = ref([]);
    let total = ref(0.0);
    let carrinhoAberto = ref(false);

    const countProdutos = computed(() => produtos.value.length);
    const getTotal = computed(() => total.value);

    function addProduto(produto) {
        produtos.value.push(produto);
        total.value += parseFloat(produto.price);
    }

    function abrirCarrinho() {
        carrinhoAberto.value = true;
    }

    function fecharCarrinho() {
        carrinhoAberto.value = false;
    }
    return {
        countProdutos,
        getTotal,
        carrinhoAberto,
        produtos,
        addProduto,
        abrirCarrinho,
        fecharCarrinho,
    };
});
