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
    GetDeliveries = (recIds: {long: Array<number>}) => this.request(ENDPOINTS.SEND, 'GetDeliveries', { recIds });
    GetDeliveries3 = (recId: {string: Array<string>}) => this.request(ENDPOINTS.SEND, 'GetDeliveries3', { recId });
    GetSmsPrice = (irancellCount: number, mtnCount: number, from: string, text: string) => this.request(ENDPOINTS.SEND, 'GetSmsPrice', { irancellCount, mtnCount, from, text });
    SendByBaseNumber = (text: {string: Array<string>}, to: string, bodyId: number) => this.request(ENDPOINTS.SEND, 'SendByBaseNumber', { text, to, bodyId });
    SendByBaseNumber2 = (text: string, to: string, bodyId: number) => this.request(ENDPOINTS.SEND, 'SendByBaseNumber2', { text, to, bodyId });
    SendByBaseNumber3 = (text: string, to: string) => this.request(ENDPOINTS.SEND, 'SendByBaseNumber3', { 'text': text, 'to': to });
    SendSimpleSMS = (to: {string: Array<string>}, from: string, text: string, isflash: boolean) => this.request(ENDPOINTS.SEND, 'SendSimpleSMS', { to, from, text, isflash });
    SendSimpleSMS2 = (to: string, from: string, text: string, isflash: boolean) => this.request(ENDPOINTS.SEND, 'SendSimpleSMS2', { to, from, text, isflash });
    SendSms = (to: {string: Array<string>}, from: string, text: string, isflash: boolean, udh: string, recId: {long: Array<number>}, status) => this.request(ENDPOINTS.SEND, 'SendSms', { to, from, text, isflash, udh, recId, status });
    SendSms2 = (to: {string: Array<string>}, from: string, text: string, isflash: boolean, udh: string, recId: {long: Array<number>}, status, filterId: number) => this.request(ENDPOINTS.SEND, 'SendSms2', { to, from, text, isflash, udh, recId, status, filterId });
    SendMultipleSMS = (to: {string: Array<string>}, from: string, text: {string: Array<string>}, isflash: boolean, udh: string, recId: {long: Array<number>}, status) => this.request(ENDPOINTS.SEND, 'SendMultipleSMS', { to, from, text, isflash, udh, recId, status });
    SendMultipleSMS2 = (to: {string: Array<string>}, from: {string: Array<string>}, text: {string: Array<string>}, isflash: boolean, udh: string, recId: {long: Array<number>}, status) => this.request(ENDPOINTS.SEND, 'SendMultipleSMS2', { to, from, text, isflash, udh, recId, status });

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
    AddUser = (productId, descriptions, mobileNumber, emailAddress, nationalCode, name, family, corporation, phone, fax,
        address, postalCode, certificateNumber) => this.request(ENDPOINTS.USERS, 'AddUser',
            { productId, descriptions, mobileNumber, emailAddress, nationalCode, name, family, corporation, phone, fax, address, postalCode, certificateNumber });
    AddUserWithLocation = (productId, descriptions, mobileNumber, emailAddress, nationalCode, name, family, corporation, phone, fax,
        address, postalCode, certificateNumber, country, province, city) => this.request(ENDPOINTS.USERS, 'AddUserWithLocation',
            {
                productId, descriptions, mobileNumber, emailAddress, nationalCode, name, family, corporation, phone, fax,
                address, postalCode, certificateNumber, country, province, city
            });
    AddUserWithMobileNumber = (productId, mobileNumber, firstName, lastName, email) =>
        this.request(ENDPOINTS.USERS, 'AddUserWithMobileNumber', { productId, mobileNumber, firstName, lastName, email });
    AddUserWithMobileNumber2 = (productId, mobileNumber, firstName, lastName, targetUsername, email) =>
        this.request(ENDPOINTS.USERS, 'AddUserWithMobileNumber2', { productId, mobileNumber, firstName, lastName, targetUsername, email });
    AddUserWithUserNameAndPass = (targetUserName, targetUserPassword, productId, descriptions, mobileNumber, emailAddress, nationalCode,
        name, family, corporation, phone, fax, address, postalCode, certificateNumber) =>
        this.request(ENDPOINTS.USERS, 'AddUserWithUserNameAndPass', {
            targetUserName, targetUserPassword, productId, descriptions, mobileNumber, emailAddress, nationalCode,
            name, family, corporation, phone, fax, address, postalCode, certificateNumber
        });
    AuthenticateUser = () => this.request(ENDPOINTS.USERS, 'AuthenticateUser', {});
    ChangeUserCredit = (amount, description, targetUsername, GetTax) =>
        this.request(ENDPOINTS.USERS, 'ChangeUserCredit', { amount, description, targetUsername, GetTax });
    DeductUserCredit = (amount, description) => this.request(ENDPOINTS.USERS, 'DeductUserCredit', { amount, description });
    ForgotPassword = (mobileNumber, emailAddress, targetUsername) =>
        this.request(ENDPOINTS.USERS, 'ForgotPassword', { mobileNumber, emailAddress, targetUsername });
    GetCities = (provinceId) => this.request(ENDPOINTS.USERS, 'GetCities', { provinceId });
    GetEnExpireDate = () => this.request(ENDPOINTS.USERS, 'GetEnExpireDate', {});
    GetExpireDate = () => this.request(ENDPOINTS.USERS, 'GetExpireDate', {});
    GetProvinces = () => this.request(ENDPOINTS.USERS, 'GetProvinces', {});
    GetUserBasePrice = (targetUsername) => this.request(ENDPOINTS.USERS, 'GetUserBasePrice', { targetUsername });
    GetUserCredit = (targetUsername) => this.request(ENDPOINTS.USERS, 'GetUserCredit', { targetUsername });
    GetUserCredit2 = () => this.request(ENDPOINTS.USERS, 'GetUserCredit2', {});
    GetUserDetails = (targetUsername) => this.request(ENDPOINTS.USERS, 'GetUserDetails', { targetUsername });
    GetUserIsExist = (targetUsername) => this.request(ENDPOINTS.USERS, 'GetUserIsExist', { targetUsername });
    GetUserNumbers = () => this.request(ENDPOINTS.USERS, 'GetUserNumbers', {});
    GetUserTransactions = (targetUsername, creditType, dateFrom, dateTo, keyword) =>
        this.request(ENDPOINTS.USERS, 'GetUserTransactions', { targetUsername, creditType, dateFrom, dateTo, keyword });
    GetUserWallet = () => this.request(ENDPOINTS.USERS, 'GetUserWallet', {});
    GetUserWalletTransaction = (dateFrom, dateTo, count, startIndex, payType, payLoc) =>
        this.request(ENDPOINTS.USERS, 'GetUserWalletTransaction', { dateFrom, dateTo, count, startIndex, payType, payLoc });
    GetUsers = () => this.request(ENDPOINTS.USERS, 'GetUsers', {});
    RemoveUser = (targetUsername) => this.request(ENDPOINTS.USERS, 'RemoveUser', { targetUsername });

    // VOICE webservice
    SendBulkSpeechText = (title, body, receivers, DateToSend, repeatCount) =>
        this.request(ENDPOINTS.VOICE, 'SendBulkSpeechText', { title, body, receivers, DateToSend, repeatCount });
    SendBulkVoiceSMS = (title, voiceFileId, receivers, DateToSend, repeatCount) =>
        this.request(ENDPOINTS.VOICE, 'SendBulkVoiceSMS', { title, voiceFileId, receivers, DateToSend, repeatCount });
    UploadVoiceFile = (title, base64StringFile) => this.request(ENDPOINTS.VOICE, 'UploadVoiceFile', { title, base64StringFile });

    // CONTACT webservice
    AddContact = (groupIds, firstname, lastname, nickname, corporation, mobilenumber, phone, fax, birthdate, email,
        gender, province, city, address, postalCode, additionaldate, additionaltext, descriptions) =>
        this.request(ENDPOINTS.CONTACTS, 'AddContact', {
            groupIds, firstname, lastname, nickname, corporation, mobilenumber, phone, fax, birthdate, email,
            gender, province, city, address, postalCode, additionaldate, additionaltext, descriptions
        });
    AddContactEvents = (contactId, eventName, eventType, eventDate) => this.request(ENDPOINTS.CONTACTS, 'AddContactEvents', { contactId, eventName, eventType, eventDate });
    AddGroup = (groupName, Descriptions, showToChilds) => this.request(ENDPOINTS.CONTACTS, 'AddGroup', { groupName, Descriptions, showToChilds });
    ChangeContact = (contactId, mobilenumber, firstname, lastname, nickname, corporation, phone, fax, email, gender, province, city, address,
        postalCode, additionaltext, descriptions, contactStatus) => this.request(ENDPOINTS.CONTACTS, 'ChangeContact', {
            contactId, mobilenumber, firstname, lastname, nickname,
            corporation, phone, fax, email, gender, province, city, address, postalCode, additionaltext, descriptions, contactStatus
        });
    ChangeGroup = (groupId, groupName, Descriptions, showToChilds, groupStatus) =>
        this.request(ENDPOINTS.CONTACTS, 'ChangeGroup', { groupId, groupName, Descriptions, showToChilds, groupStatus });
    CheckMobileExistInContact = (mobileNumber) => this.request(ENDPOINTS.CONTACTS, 'CheckMobileExistInContact', { mobileNumber });
    GetContactEvents = (contactId) => this.request(ENDPOINTS.CONTACTS, 'GetContactEvents', { contactId });
    GetContacts = (groupId, keyword, from, count) => this.request(ENDPOINTS.CONTACTS, 'GetContacts', { groupId, keyword, from, count });
    GetContactsByID = (contactId, status) => this.request(ENDPOINTS.CONTACTS, 'GetContactsByID', { contactId, status });
    GetGroups = () => this.request(ENDPOINTS.CONTACTS, 'GetGroups', {});
    MergeGroups = (originGroupId, destinationGroupId, deleteOriginGroup) => this.request(ENDPOINTS.CONTACTS, 'MergeGroups', { originGroupId, destinationGroupId, deleteOriginGroup });
    RemoveContact = (mobilenumber) => this.request(ENDPOINTS.CONTACTS, 'RemoveContact', { mobilenumber });
    RemoveContactByContactID = (contactId) => this.request(ENDPOINTS.CONTACTS, 'RemoveContactByContactID', { contactId });
    RemoveGroup = (groupId) => this.request(ENDPOINTS.CONTACTS, 'RemoveGroup', { groupId });

    // SCHEDULE webservice
    AddNewMultipleSchedule = (to, from, text, isflash, scheduleDateTime, period) =>
        this.request(ENDPOINTS.SCHEDULE, 'AddNewMultipleSchedule', { to, from, text, isflash, scheduleDateTime, period });
    AddNewUsance = (to, from, text, isflash, scheduleStartDateTime, countrepeat, scheduleEndDateTime, periodType) =>
        this.request(ENDPOINTS.SCHEDULE, 'AddNewUsance', { to, from, text, isflash, scheduleStartDateTime, countrepeat, scheduleEndDateTime, periodType });
    AddSchedule = (to, from, text, isflash, scheduleDateTime, period) =>
        this.request(ENDPOINTS.SCHEDULE, 'AddSchedule', { to, from, text, isflash, scheduleDateTime, period });
    GetScheduleDetails = (scheduleId) => this.request(ENDPOINTS.SCHEDULE, 'GetScheduleDetails', { scheduleId });
    GetScheduleStatus = (scheduleId) => this.request(ENDPOINTS.SCHEDULE, 'GetScheduleStatus', { scheduleId });
    RemoveSchedule = (scheduleId) => this.request(ENDPOINTS.SCHEDULE, 'RemoveSchedule', { scheduleId });

    // BULKS webservice
    AddNumberBulk = (from, title, message, receivers, DateToSend) => this.request(ENDPOINTS.BULKS, 'AddNumberBulk', { from, title, message, receivers, DateToSend });
    BulkReception = (bulkId, maximumRows, startRowIndex) => this.request(ENDPOINTS.BULKS, 'BulkReception', { bulkId, maximumRows, startRowIndex });
    BulkReceptionCount = (bulkId) => this.request(ENDPOINTS.BULKS, 'BulkReceptionCount', { bulkId });
    GetBulkDeliveries = (recIds) => this.request(ENDPOINTS.BULKS, 'GetBulkDeliveries', { recIds });
    GetBulkDeliveries2 = (recId) => this.request(ENDPOINTS.BULKS, 'GetBulkDeliveries2', { recId });
    GetBulkDetails = (bulkdId) => this.request(ENDPOINTS.BULKS, 'GetBulkDetails', { bulkdId });
}


class ENDPOINTS {
    static SEND = "Send";
    static RECEIVE = "Receive";
    static USERS = "Users";
    static VOICE = "Voice";
    static CONTACTS = "Contacts";
    static SCHEDULE = "Schedule";
    static BULKS = "Newbulks";
}