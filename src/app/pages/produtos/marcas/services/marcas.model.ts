export interface MarcasModal {

    id: string;
    nome: string;
}

export interface MarcasListResponse {
    content: MarcasModal[];
    totalElements: number;
    totalPages: number;
    size: number;
}

