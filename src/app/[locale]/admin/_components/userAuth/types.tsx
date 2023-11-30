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

export type UseUserAuthReturn = {
  userAuthRecord: UserAuthRecord | null | undefined;
  handleCreateUserAuth: () => Promise<void>;
  isPending: boolean;
};
