export type User = {
  avatarImage: string;
  name: string;
  about: string;
  socialMediaURL: string;
  id: any;
  userId: string;
  backgroundImage: string;
};
export type Creator = {
  id: string;
  avatarImage: string;
  name: string;
  about: string;
  socialMediaURL: string;
  userId: string;
};
export type Transaction = {
  id: string;
  avatarImage: string;
  name: string;
  about: string;
  socialURLOrBuyMeACoffee: string;
  updatedAt: string;
  amount: number;
  specialMessage: string;
  donorId: any;
};
