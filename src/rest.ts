import * as https from 'https';

export class RestClient {

    loggingEnable = false;

    constructor(private username: string, private password: string) {
        this.username = username;
        this.password = password;
    }

    request(func: string, json: any, path = PATHS.BASE) {

        var credentials = { 'username': this.username, 'password': this.password };
        const data = JSON.stringify({ ...credentials, ...json });

        const options = {
            hostname: 'rest.payamak-panel.com',
            port: 443,
            // path: `/api/SendSMS/${func}`,
            path: `/api/${path}/${func}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        if (this.loggingEnable == true) console.log(`Sending:\n${data}`);

        return new Promise((resolve, reject) => {

            const req = https.request(options, res => {
                var responseString = '';
                if (this.loggingEnable) console.log('statusCode: ' + res.statusCode);
                res.on('data', d => {
                    if (this.loggingEnable) process.stdout.write(d);
                    responseString += d;
                });
                res.on('end', () => {
                    try {
                        resolve(JSON.parse(responseString));
                    } catch (error) {
                        reject(error);
                    }
                });
                res.on('error', e => reject(e.message));
            });

            req.on('error', error => reject(error));
            req.write(data);
            req.end();
        });

    }


    SendSMS = (to: string, from: string, text: string, isFlash: boolean = false) => this.request(FUNCS.SENDSMS, { to, from, text, isFlash });
    GetDeliveries = (recId: number) => this.request(FUNCS.GETDELIVERIES, { recId });
    GetMessages = (location: number, from: string, index: number, count: number) => this.request(FUNCS.GETMESSAGES, { location, from, index, count });
    GetCredit = () => this.request(FUNCS.GETCREDIT, {});
    GetBasePrice = () => this.request(FUNCS.GETBASEPRICE, {});
    GetUserNumbers = () => this.request(FUNCS.GETUSERNUMBERS, {});
    BaseServicenumber = (text: string, to: string, bodyId: number) => this.request(FUNCS.BASESERVICENUMBER, { text, to, bodyId });

    SendSmartSMS = (to: string, text: string, from: string, fromSupportOne: string, fromSupportTwo: string) => this.request(FUNCS.SMARTSEND, {to, text, from, fromSupportOne, fromSupportTwo}, PATHS.SMART);
    SendMultipleSmartSMS = (to: Array<string>, text: Array<string>, from: string, fromSupportOne: string, fromSupportTwo: string) => this.request(FUNCS.SMARTSENDMULTIPLE, {to, text, from, fromSupportOne, fromSupportTwo}, PATHS.SMART);
    GetSmartDeliveries2 = (id: number) => this.request(FUNCS.SMARTGETDELIVERIES2, {id}, PATHS.SMART);
    GetSmartDeliveries = (ids: Array<number>) => this.request(FUNCS.SMARTGETDELIVERIES, {ids}, PATHS.SMART);
}


class FUNCS {
    static SENDSMS = "SendSMS";
    static GETDELIVERIES = "GetDeliveries2";
    static GETMESSAGES = "GetMessages";
    static GETCREDIT = "GetCredit";
    static GETBASEPRICE = "GetBasePrice";
    static GETUSERNUMBERS = "GetUserNumbers";
    static BASESERVICENUMBER = "BaseServiceNumber";
    static SMARTSEND = "Send";
    static SMARTSENDMULTIPLE = "SendMultiple";
    static SMARTGETDELIVERIES2 = "GetDeliveries2";
    static SMARTGETDELIVERIES = "GetDeliveries";
}

class PATHS {
    static BASE = "SendSMS";
    static SMART = "SmartSMS";
}