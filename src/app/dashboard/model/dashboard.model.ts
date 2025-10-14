export interface IAppCard{
    applicationName: string,
    description: string,
    buttonTitle: string,
    link: string,
    backgroundColor: string,
    buttonColor: string
}

export interface IUser {
    username?: string;
    email?: string;
    empId?: number;
    designation?: string;
    givenName?: string;
    familyName?: string;
  }