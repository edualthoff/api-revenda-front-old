
export interface ErrorMensagemBase {
    apiVersion: string;
    error: ErrorMensagem;
}

export interface ErrorMensagem {
    uniqueId: string;
    code: string;
    message: string;
    errors: {
        reason: string;
        message: string;
        data: Date;
    };
}
