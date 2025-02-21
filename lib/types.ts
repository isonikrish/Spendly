export type UserType = {
  id: number;
} & signupInput;

export type signupInput = {
  name: string;
  email: string;
  password: string;
};
export type loginInput = {
  email: string;
  password: string;
};

export type AppStore = {
  user: UserType | null;
  signup: (formData: signupInput) => void;
  login: (formData: loginInput) => void;
  fetchUser: () => void;
  logout: () => void;
};
