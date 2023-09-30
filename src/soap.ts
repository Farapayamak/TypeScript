import * as soap from 'soap';

export class SoapClient {

    constructor(private username: string, private password: string) {
        this.username = username;
        this.password = password;
    }

    request(endpoint, method, params) {

        params['username'] = this.username;
        params['password'] = this.password;

        return new Promise((resolve, reject) => {
            soap.createClientAsync(`http://api.payamak-panel.com/post/${endpoint}.asmx?wsdl`)
                .then(client => client[method + 'Async'](params))
                .then(result => {
                    if (result)
                        resolve(result);
                })
                .catch(err => reject(err));
        });
    }

    // SEND webservice
    GetCredit = () => this.request(ENDPOINTS.SEND, 'GetCredit', {});
    GetDeliveries = (recIds: { long: Array<number> }) => this.request(ENDPOINTS.SEND, 'GetDeliveries', { recIds });
    GetDeliveries3 = (recId: { string: Array<string> }) => this.request(ENDPOINTS.SEND, 'GetDeliveries3', { recId });
    GetSmsPrice = (irancellCount: number, mtnCount: number, from: string, text: string) => this.request(ENDPOINTS.SEND, 'GetSmsPrice', { irancellCount, mtnCount, from, text });
    SendByBaseNumber = (text: { string: Array<string> }, to: string, bodyId: number) => this.request(ENDPOINTS.SEND, 'SendByBaseNumber', { text, to, bodyId });
    SendByBaseNumber2 = (text: string, to: string, bodyId: number) => this.request(ENDPOINTS.SEND, 'SendByBaseNumber2', { text, to, bodyId });
    SendByBaseNumber3 = (text: string, to: string) => this.request(ENDPOINTS.SEND, 'SendByBaseNumber3', { 'text': text, 'to': to });
    SendSimpleSMS = (to: { string: Array<string> }, from: string, text: string, isflash: boolean) => this.request(ENDPOINTS.SEND, 'SendSimpleSMS', { to, from, text, isflash });
    SendSimpleSMS2 = (to: string, from: string, text: string, isflash: boolean) => this.request(ENDPOINTS.SEND, 'SendSimpleSMS2', { to, from, text, isflash });
    SendSms = (to: { string: Array<string> }, from: string, text: string, isflash: boolean, udh: string, recId: { long: Array<number> }, status) => this.request(ENDPOINTS.SEND, 'SendSms', { to, from, text, isflash, udh, recId, status });
    SendSms2 = (to: { string: Array<string> }, from: string, text: string, isflash: boolean, udh: string, recId: { long: Array<number> }, status, filterId: number) => this.request(ENDPOINTS.SEND, 'SendSms2', { to, from, text, isflash, udh, recId, status, filterId });
    SendMultipleSMS = (to: { string: Array<string> }, from: string, text: { string: Array<string> }, isflash: boolean, udh: string, recId: { long: Array<number> }, status) => this.request(ENDPOINTS.SEND, 'SendMultipleSMS', { to, from, text, isflash, udh, recId, status });
    SendMultipleSMS2 = (to: { string: Array<string> }, from: { string: Array<string> }, text: { string: Array<string> }, isflash: boolean, udh: string, recId: { long: Array<number> }, status) => this.request(ENDPOINTS.SEND, 'SendMultipleSMS2', { to, from, text, isflash, udh, recId, status });

    // RECEIVE webservice
    ChangeMessageIsRead = (msgIds: string) => this.request(ENDPOINTS.RECEIVE, 'ChangeMessageIsRead', { msgIds });
    GetInboxCount = (isRead: boolean) => this.request(ENDPOINTS.RECEIVE, 'GetInboxCount', { isRead });
    GetLatestReceiveMsg = (sender: string, receiver: string) => this.request(ENDPOINTS.RECEIVE, 'GetLatestReceiveMsg', { sender, receiver });
    GetMessages = (location: number, from: string, index: number, count: number) => this.request(ENDPOINTS.RECEIVE, 'GetMessages', { location, from, index, count });
    GetMessagesAfterID = (location: number, from: string, count: number, msgId: number) => this.request(ENDPOINTS.RECEIVE, 'GetMessagesAfterID', { location, from, count, msgId });
    GetMessagesFilterByDate = (location: number, from: string, index: number, count: number, dateFrom: Date, dateTo: Date, isRead: boolean) => this.request(ENDPOINTS.RECEIVE, 'GetMessagesFilterByDate', { location, from, index, count, dateFrom, dateTo, isRead });
    GetMessagesReceptions = (msgId: number, fromRows: number) => this.request(ENDPOINTS.RECEIVE, 'GetMessagesReceptions', { msgId, fromRows });
    GetMessagesWithChangeIsRead = (location: number, from: string, index: number, count: number, isRead: boolean, changeIsRead: boolean) => this.request(ENDPOINTS.RECEIVE, 'GetMessagesWithChangeIsRead', { location, from, index, count, isRead, changeIsRead });
    GetOutBoxCount = () => this.request(ENDPOINTS.RECEIVE, 'GetOutBoxCount', {});
    RemoveMessages = (location: "Received" | "Sent" | "Removed" | "Deleted", msgIds: string) => this.request(ENDPOINTS.RECEIVE, 'RemoveMessages', { location, msgIds });

    // USER webservice
    AddUser = (productId: number, descriptions: string, mobileNumber: string, emailAddress: string, nationalCode: string, name: string, family: string, corporation: string, phone: string, fax: string,
        address: string, postalCode: string, certificateNumber: string) => this.request(ENDPOINTS.USERS, 'AddUser',
            { productId, descriptions, mobileNumber, emailAddress, nationalCode, name, family, corporation, phone, fax, address, postalCode, certificateNumber });
    AddUserWithLocation = (productId: number, descriptions: string, mobileNumber: string, emailAddress: string, nationalCode: string, name: string, family: string, corporation: string, phone: string, fax: string,
        address: string, postalCode: string, certificateNumber: string, country: number, province: number, city: number) => this.request(ENDPOINTS.USERS, 'AddUserWithLocation',
            {
                productId, descriptions, mobileNumber, emailAddress, nationalCode, name, family, corporation, phone, fax,
                address, postalCode, certificateNumber, country, province, city
            });
    AddUserWithMobileNumber = (productId: number, mobileNumber: string, firstName: string, lastName: string, email: string) =>
        this.request(ENDPOINTS.USERS, 'AddUserWithMobileNumber', { productId, mobileNumber, firstName, lastName, email });
    AddUserWithMobileNumber2 = (productId: number, mobileNumber: string, firstName: string, lastName: string, targetUsername: string, email: string) =>
        this.request(ENDPOINTS.USERS, 'AddUserWithMobileNumber2', { productId, mobileNumber, firstName, lastName, targetUsername, email });
    AddUserWithUserNameAndPass = (targetUserName: string, targetUserPassword: string, productId: number, descriptions: string, mobileNumber: string, emailAddress: string, nationalCode: string,
        name: string, family: string, corporation: string, phone: string, fax: string, address: string, postalCode: string, certificateNumber: string) =>
        this.request(ENDPOINTS.USERS, 'AddUserWithUserNameAndPass', {
            targetUserName, targetUserPassword, productId, descriptions, mobileNumber, emailAddress, nationalCode,
            name, family, corporation, phone, fax, address, postalCode, certificateNumber
        });
    AuthenticateUser = () => this.request(ENDPOINTS.USERS, 'AuthenticateUser', {});
    ChangeUserCredit = (amount: number, description: string, targetUsername: string, GetTax: boolean) =>
        this.request(ENDPOINTS.USERS, 'ChangeUserCredit', { amount, description, targetUsername, GetTax });
    DeductUserCredit = (amount: number, description: string) => this.request(ENDPOINTS.USERS, 'DeductUserCredit', { amount, description });
    ForgotPassword = (mobileNumber: string, emailAddress: string, targetUsername: string) =>
        this.request(ENDPOINTS.USERS, 'ForgotPassword', { mobileNumber, emailAddress, targetUsername });
    GetCities = (provinceId: number) => this.request(ENDPOINTS.USERS, 'GetCities', { provinceId });
    GetEnExpireDate = () => this.request(ENDPOINTS.USERS, 'GetEnExpireDate', {});
    GetExpireDate = () => this.request(ENDPOINTS.USERS, 'GetExpireDate', {});
    GetProvinces = () => this.request(ENDPOINTS.USERS, 'GetProvinces', {});
    GetUserBasePrice = (targetUsername: string) => this.request(ENDPOINTS.USERS, 'GetUserBasePrice', { targetUsername });
    GetUserCredit = (targetUsername: string) => this.request(ENDPOINTS.USERS, 'GetUserCredit', { targetUsername });
    GetUserCredit2 = () => this.request(ENDPOINTS.USERS, 'GetUserCredit2', {});
    GetUserDetails = (targetUsername: string) => this.request(ENDPOINTS.USERS, 'GetUserDetails', { targetUsername });
    GetUserIsExist = (targetUsername: string) => this.request(ENDPOINTS.USERS, 'GetUserIsExist', { targetUsername });
    GetUserNumbers = () => this.request(ENDPOINTS.USERS, 'GetUserNumbers', {});
    GetUserTransactions = (targetUsername: string, creditType: "SendSMS" | "ReceiveSMS" | "ChargeAccount" | "MoneyBack" | "Gift" | "AddEmployee" | "ChargeEmployee" | "RemoveEmplooyee" | "Profit" | "BuyNumber" | "ChargeCard" | "SaleCard" | "BuyModule" | "SendFax" | "SendVoiceSMS" | "CallDivert" | "CallExtenstion" | "Voip" | "Discount" | "InstallMent" | "DecreaseCredit" | "TestCredit" | "USSD" | "BuyCreditCharge" | "RenewPanel" | "ChargeAccountWithProfit" | "MoneyBackInLine" | "Bts" | "All", dateFrom: Date, dateTo: Date, keyword: string) =>
        this.request(ENDPOINTS.USERS, 'GetUserTransactions', { targetUsername, creditType, dateFrom, dateTo, keyword });
    GetUserWallet = () => this.request(ENDPOINTS.USERS, 'GetUserWallet', {});
    GetUserWalletTransaction = (dateFrom: Date, dateTo: Date, count: number, startIndex: number, payType: "All" | "ChargeWallet" | "BuySms" | "BuyWidget" | "BuyResources" | "BuyTemplate" | "BuyDomain" | "BuyCms" | "BuyPackage" | "BuyNumber" | "SendFax" | "SendVoiceSms" | "InCommingCall" | "Divert" | "Revival" | "InstallMent" | "NotifySms" | "RevivalSubReseller" | "ActivateSubReseller" | "ActivatePanel" | "UpgradePanel" | "PanelPrice" | "Cancel" | "RefundToUser" | "VoiceMessage" | "DeleteFromReport" | "AvaPayamCharge" | "Discount" | "BuyWebsite" | "BuyWebsiteAndDomain" | "ActivateCRMPanel" | "RenewNumber", payLoc: "Farapayamak" | "DTS" | "Rayo" | "AvaPayam") =>
        this.request(ENDPOINTS.USERS, 'GetUserWalletTransaction', { dateFrom, dateTo, count, startIndex, payType, payLoc });
    GetUsers = () => this.request(ENDPOINTS.USERS, 'GetUsers', {});
    RemoveUser = (targetUsername: string) => this.request(ENDPOINTS.USERS, 'RemoveUser', { targetUsername });

    // VOICE webservice
    SendBulkSpeechText = (title: string, body: string, receivers: string, DateToSend: string, repeatCount: number) =>
        this.request(ENDPOINTS.VOICE, 'SendBulkSpeechText', { title, body, receivers, DateToSend, repeatCount });
    SendBulkVoiceSMS = (title: string, voiceFileId: number, receivers: string, DateToSend: string, repeatCount: number) =>
        this.request(ENDPOINTS.VOICE, 'SendBulkVoiceSMS', { title, voiceFileId, receivers, DateToSend, repeatCount });
    UploadVoiceFile = (title: string, base64StringFile: string) => this.request(ENDPOINTS.VOICE, 'UploadVoiceFile', { title, base64StringFile });

    // CONTACT webservice
    AddContact = (groupIds: string, firstname: string, lastname: string, nickname: string, corporation: string, mobilenumber: string, phone: string, fax: string, birthdate: Date, email: string,
        gender: any, province: number, city: number, address: string, postalCode: string, additionaldate: Date, additionaltext: string, descriptions: string) =>
        this.request(ENDPOINTS.CONTACTS, 'AddContact', {
            groupIds, firstname, lastname, nickname, corporation, mobilenumber, phone, fax, birthdate, email,
            gender, province, city, address, postalCode, additionaldate, additionaltext, descriptions
        });
    AddContactEvents = (contactId: number, eventName: string, eventType: any, eventDate: Date) => this.request(ENDPOINTS.CONTACTS, 'AddContactEvents', { contactId, eventName, eventType, eventDate });
    AddGroup = (groupName: string, Descriptions: string, showToChilds: boolean) => this.request(ENDPOINTS.CONTACTS, 'AddGroup', { groupName, Descriptions, showToChilds });
    ChangeContact = (contactId: number, mobilenumber: string, firstname: string, lastname: string, nickname: string, corporation: string, phone: string, fax: string, email: string, gender: any, province: number, city: number, address: string,
        postalCode: string, additionaltext: string, descriptions: string, contactStatus: number) => this.request(ENDPOINTS.CONTACTS, 'ChangeContact', {
            contactId, mobilenumber, firstname, lastname, nickname,
            corporation, phone, fax, email, gender, province, city, address, postalCode, additionaltext, descriptions, contactStatus
        });
    ChangeGroup = (groupId: number, groupName: string, Descriptions: string, showToChilds: boolean, groupStatus: any) =>
        this.request(ENDPOINTS.CONTACTS, 'ChangeGroup', { groupId, groupName, Descriptions, showToChilds, groupStatus });
    CheckMobileExistInContact = (mobileNumber: string) => this.request(ENDPOINTS.CONTACTS, 'CheckMobileExistInContact', { mobileNumber });
    GetContactEvents = (contactId: number) => this.request(ENDPOINTS.CONTACTS, 'GetContactEvents', { contactId });
    GetContacts = (groupId: number, keyword: string, from: number, count: number) => this.request(ENDPOINTS.CONTACTS, 'GetContacts', { groupId, keyword, from, count });
    GetContactsByID = (contactId: number, status: number) => this.request(ENDPOINTS.CONTACTS, 'GetContactsByID', { contactId, status });
    GetGroups = () => this.request(ENDPOINTS.CONTACTS, 'GetGroups', {});
    MergeGroups = (originGroupId: number, destinationGroupId: number, deleteOriginGroup: boolean) => this.request(ENDPOINTS.CONTACTS, 'MergeGroups', { originGroupId, destinationGroupId, deleteOriginGroup });
    RemoveContact = (mobilenumber: string) => this.request(ENDPOINTS.CONTACTS, 'RemoveContact', { mobilenumber });
    RemoveContactByContactID = (contactId: number) => this.request(ENDPOINTS.CONTACTS, 'RemoveContactByContactID', { contactId });
    RemoveGroup = (groupId: number) => this.request(ENDPOINTS.CONTACTS, 'RemoveGroup', { groupId });

    // SCHEDULE webservice
    AddNewMultipleSchedule = (to: { string: Array<string> }, from: string, text: { string: Array<string> }, isflash: boolean, scheduleDateTime: { dateTime: Array<Date> }, period: "Once" | "Daily" | "Weekly" | "Monthly" | "Yearly" | "Custom") =>
        this.request(ENDPOINTS.SCHEDULE, 'AddNewMultipleSchedule', { to, from, text, isflash, scheduleDateTime, period });
    AddNewUsance = (to: string, from: string, text: string, isflash: boolean, scheduleStartDateTime: Date, countrepeat: number, scheduleEndDateTime: Date, periodType: "Once" | "Daily" | "Weekly" | "Monthly" | "Yearly" | "Custom") =>
        this.request(ENDPOINTS.SCHEDULE, 'AddNewUsance', { to, from, text, isflash, scheduleStartDateTime, countrepeat, scheduleEndDateTime, periodType });
    AddSchedule = (to: string, from: string, text: string, isflash: boolean, scheduleDateTime: Date, period: "Once" | "Daily" | "Weekly" | "Monthly" | "Yearly" | "Custom") =>
        this.request(ENDPOINTS.SCHEDULE, 'AddSchedule', { to, from, text, isflash, scheduleDateTime, period });
    GetScheduleDetails = (scheduleId: number) => this.request(ENDPOINTS.SCHEDULE, 'GetScheduleDetails', { scheduleId });
    GetScheduleStatus = (scheduleId: number) => this.request(ENDPOINTS.SCHEDULE, 'GetScheduleStatus', { scheduleId });
    RemoveSchedule = (scheduleId: number) => this.request(ENDPOINTS.SCHEDULE, 'RemoveSchedule', { scheduleId });

    // BULKS webservice
    AddNumberBulk = (from: string, title: string, message: string, receivers: string, DateToSend: string) => this.request(ENDPOINTS.BULKS, 'AddNumberBulk', { from, title, message, receivers, DateToSend });
    BulkReception = (bulkId: number, maximumRows: number, startRowIndex: number) => this.request(ENDPOINTS.BULKS, 'BulkReception', { bulkId, maximumRows, startRowIndex });
    BulkReceptionCount = (bulkId: number) => this.request(ENDPOINTS.BULKS, 'BulkReceptionCount', { bulkId });
    GetBulkDeliveries = (recIds: { long: Array<number> }) => this.request(ENDPOINTS.BULKS, 'GetBulkDeliveries', { recIds });
    GetBulkDeliveries2 = (recId: string) => this.request(ENDPOINTS.BULKS, 'GetBulkDeliveries2', { recId });
    GetBulkDetails = (bulkdId: number) => this.request(ENDPOINTS.BULKS, 'GetBulkDetails', { bulkdId });

    // SMART webservice
    SendSmartSMS = (to: string, text: string, from: string, fromSupportOne: string, fromSupportTwo: string) => this.request(ENDPOINTS.SMART, 'SendSmartSMS', {to, text, from, fromSupportOne, fromSupportTwo});
    SendMultipleSmartSMS = (to: Array<string>, text: Array<string>, from: string, fromSupportOne: string, fromSupportTwo: string) => this.request(ENDPOINTS.SMART, 'SendMultipleSmartSMS', {to, text, from, fromSupportOne, fromSupportTwo});
    GetSmartSMSDeliveries = (Ids: Array<number>) => this.request(ENDPOINTS.SMART, 'GetSmartSMSDeliveries', {Ids});
}


class ENDPOINTS {
    static SEND = "Send";
    static RECEIVE = "Receive";
    static USERS = "Users";
    static VOICE = "Voice";
    static CONTACTS = "Contacts";
    static SCHEDULE = "Schedule";
    static BULKS = "Newbulks";
    static SMART = "Smartsms";
}