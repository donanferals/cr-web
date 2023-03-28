const ProdutoList = () => import("./components/ProdutoList.vue");

export const routes = [
    {
        name: "produtos",
        path: "/produtos",
        component: ProdutoList,
    },
];
