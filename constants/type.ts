export type User = Readonly<{
  login: string;
  id: number;
  avatar_url: string;
}>;

export type Response<T> =
  | {
      status: "success";
      res: T;
    }
  | {
      status: "failure";
      message: string;
    };
