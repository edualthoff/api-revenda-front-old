import { ROUTING_APP } from './../settings/config.settings';
import { MenuStructure } from './menu-common';

/**
 * Imeplenta a @interface MenuStructure com a lista de navegacao do sistema App
 * @const SystemMenuList[]
 */
export const SystemMenuList: MenuStructure[] = [
    {
        id: 'dashboard', name: 'Dashboard', link: `${ROUTING_APP}/dashboard`, icon: 'dashboard', active: 'active'
    },
    {
        id: 'produtos', name: 'Produtos', link: null, icon: 'archive_outline', active: 'active', children: [
            { id: 'categorias', name: 'Categorias', link: `${ROUTING_APP}/produtos/categorias`, active: 'active' },
            { id: 'marcas', name: 'Marcas', link: `${ROUTING_APP}/produtos/marcas`, active: 'active' },
            { id: 'itens', name: 'Itens', link: `${ROUTING_APP}/produtos/itens`, active: 'active' },
        ]
    },
    {
        id: `mercado-livre`, name: 'Mercado Livre', link: null, icon: 'border_all', active: 'active', modulo: 'mercadolivre', children: [
            { id: 'links-buscas', name: 'Links Buscas', link: `${ROUTING_APP}/mercado-livre/links-buscas`, active: 'active' },
            { id: 'configuração', name: 'Configuração', link: `${ROUTING_APP}/mercadolivre/settings`, active: 'active' },
        ]
    },
    {
        id: 'dashboard', name: 'Dashboard', link: `${ROUTING_APP}/dashboard`, icon: 'dashboard', active: 'active', modulo: 'olx'
    },
];
