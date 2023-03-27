const ProdutoList = () => import('./components/ProdutoList.vue')
const ProdutoView = () => import('./components/ProdutoView.vue')
const CarrinhoList = () => import('./components/CarrinhoList.vue')
 
export const routes = [
    {
        name: 'produtos',
        path: '/produtos',
        component: ProdutoList
    },
    {
        name: 'produto',
        path: '/produto/:id',
        component: ProdutoView
    },
    {
        name: 'carrinho',
        path: '/carrinho',
        component: CarrinhoList
    }
];