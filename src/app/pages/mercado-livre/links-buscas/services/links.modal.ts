import { PaginationResponse } from './../../../../core/modals/pagination-implements.modal';
import { BaseImplements } from './../../../../core/modals/base-implements.modal';

export interface LinksModal extends BaseImplements {
    linkUrl: string;
    descricao: string;
    condicao: Condicao;
    rangeInicial: number;
    rangeFinal: number;
    status: boolean;
    idProduto: string;
    schedulingTime: schedulingTime;
}

export enum Condicao {
    usado,
    novo,
    recondicionado
}

export interface schedulingTime {
    hours: number;
    minutes: number;
    meridiem: 'AM' | 'PM' | '';
    nextDate: Date;
}

export interface LinksMlListResponse extends PaginationResponse {
    content: LinksModal[];
}
