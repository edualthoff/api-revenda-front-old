

/**
 * Estrutura do menu de navegacao do sistema
 *
 * @export
 * @interface MenuStructure
 */
export interface MenuStructure {
    id: string;
    name: string;
    link: string;
    icon?: string;
    active: string;
    modulo?: string;
    children?: SubMenuStructure[];
}


/**
 * Estrutura dos SubMenu do sistema
 *  
 * @export
 * @interface SubMenuStructure
 */
export interface SubMenuStructure {
    id: string;
    name: string;
    link: string;
    active: string;
}

