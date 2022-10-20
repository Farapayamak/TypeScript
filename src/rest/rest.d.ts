export class RestClient {

    loggingEnable: boolean;

    constructor(username: string, password: string);

    SendSMS(to: string, from: string, text: string, isFlash?: boolean): Promise<any>;
    GetDeliveries(recId: number): Promise<any>;
    GetMessages(location: number, from: string, index: number, count: number): Promise<any>;
    GetCredit(): Promise<any>;
    GetBasePrice(): Promise<any>;
    GetUserNumbers(): Promise<any>;
    BaseServicenumber(text: string, to: string, bodyId: number): Promise<any>;
}
