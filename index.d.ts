// type definitions for Farapayamk

export class RestClient {

  loggingEnable: boolean;

  constructor(username: string, password: string)

  SendSMS = (to: string, from: string, text: string, isFlash: boolean = false) => Promise;
  GetDeliveries = (recId: number) => Promise;
  GetMessages = (location: number, from: string, index: number, count: numebr) => Promise;
  GetCredit = () => Promise;
  GetBasePrice = () => Promise;
  GetUserNumbers = () => Promise;
  BaseServicenumber = (text: string, to: string, bodyId: number) => Promise;
}




