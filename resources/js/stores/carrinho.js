import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const carrinhoStore = defineStore("carrinho", () => {
    const produtos = ref([]);
    let total = ref(0.0);
    let carrinhoAberto = ref(false);

    const countProdutos = computed(() => produtos.value.length);
    const getTotal = computed(() => total.value);

    const adicionar = (produto) => {
        produtos.value.push(produto);
        total.value += parseFloat(produto.price);
    };

    const remover = (produto) => {
        produtos.value = produtos.value.filter(
            (item) => item.id !== produto.id
        );
        total.value -= parseFloat(produto.price);
    };

    const abrir = () => {
        carrinhoAberto.value = true;
    };

    const fechar = () => {
        carrinhoAberto.value = false;
    };

    return {
        countProdutos,
        getTotal,
        carrinhoAberto,
        produtos,
        adicionar,
        remover,
        abrir,
        fechar,
    };
});
