const ProdutoList = () => import("./components/ProdutoList.vue");
const CarrinhoList = () => import("./components/CarrinhoList.vue");

export const routes = [
    {
        name: "produtos",
        path: "/produtos",
        component: ProdutoList,
    },
    {
        name: "carrinho",
        path: "/carrinho",
        component: CarrinhoList,
    },
];
