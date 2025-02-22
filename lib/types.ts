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

export type addIncomeInput = {
  sourceName: string;
  amount: number;
  emojiIcon: string;
};
export type incomeSource = {
  id: number;
  name: string,
  amount: number,
  icon: string,
  userId: number
}
export type AppStore = {
  user: UserType | null;
  incomeSources: incomeSource[] | null; 
  signup: (formData: signupInput) => void;
  login: (formData: loginInput) => void;
  fetchUser: () => void;
  logout: () => void;
  addIncomeSource: (formData: addIncomeInput) => void;
  fetchIncomeSources: () => void;
  deleteIncomeSource: (id: number) => void;
};
