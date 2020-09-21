
export interface UsuarioModal {
    email: string;
    senha: string;
    verificado: boolean;
    dataModified: Date;
    authRole: string[];
    pessoa: {
        nome: string;
        sobrenome: string;
        tenantId: string;
    };
}
