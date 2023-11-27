export enum UserAuthStatus {
  Waiting = 'WAITING',
  Authorized = 'AUTHORIZED',
}

export type UserAuthRecord = {
  recordId: number;
  status: `${UserAuthStatus}`;
  user: {
    name: string;
    email: string;
  };
};
