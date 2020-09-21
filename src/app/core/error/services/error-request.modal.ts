
export class MessageErrorRequest {
    uniqueId: string;
    code: string;
    message: string;
    errors: Errors;
    apiVersion: string;

    constructor(){
        //public data: MessageErrorRequest|Object
        //this.error.errors = {} as Errors;
        //Object.assign(this, data);
    }

    convertObject(data: MessageErrorRequest|Object){
        Object.assign(this, data);
    }
}
export class MessageErrorRequestCustom extends MessageErrorRequest {
}

interface Errors {
    domain: string;
    reason: string;
    message: string;
    sendReport: string;
    data: Date;
}
