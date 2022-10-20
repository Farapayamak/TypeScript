const https = require('https');

class RestClient {

    loggingEnable = false;

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    request(func, json) {

        var credentials = { 'username': this.username, 'password': this.password };
        const data = JSON.stringify({ ...credentials, ...json });

        const options = {
            hostname: 'rest.payamak-panel.com',
            port: 443,
            path: `/api/SendSMS/${func}`,
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


    SendSMS = (to, from, text, isFlash = false) => this.request(FUNCS.SENDSMS, { to, from, text, isFlash });
    GetDeliveries = (recId) => this.request(FUNCS.GETDELIVERIES, { recId });
    GetMessages = (location, from, index, count) => this.request(FUNCS.GETMESSAGES, { location, from, index, count });
    GetCredit = () => this.request(FUNCS.GETCREDIT, {});
    GetBasePrice = () => this.request(FUNCS.GETBASEPRICE, {});
    GetUserNumbers = () => this.request(FUNCS.GETUSERNUMBERS, {});
    BaseServicenumber = (text, to, bodyId) => this.request(FUNCS.BASESERVICENUMBER, { text, to, bodyId });
}


class FUNCS {
    static SENDSMS = "SendSMS";
    static GETDELIVERIES = "GetDeliveries2";
    static GETMESSAGES = "GetMessages";
    static GETCREDIT = "GetCredit";
    static GETBASEPRICE = "GetBasePrice";
    static GETUSERNUMBERS = "GetUserNumbers";
    static BASESERVICENUMBER = "BaseServiceNumber";
}

module.exports = RestClient;