export type brandingType = {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
};

export interface IUser {
  authenticated: boolean;
  user: {};
  username?: string;
  email?: string;
  empId?: number;
  designation?: string;
  givenName?: string;
  familyName?: string;
}
