type MyCardType = {
  id: number;
  name: string;
  end_date: string;
  price: number;
  period: string;
  logo_link: string;
  categories: number[];
  description: string;
  cashBack?: number;
  is_active: boolean;
  service_link?: string;
  monthly_price?: number;
  annual_price?: number;
  semi_annual_price?: number;
  promo: string;
};

type UserType = {
  phone_number: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  account_balance: number;
  cashback: number;
  subscriptions: MyCardType[];
};