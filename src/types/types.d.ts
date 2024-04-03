type MyCardType = {
  id: number;
  name: string;
  end_date: string;
  price: number;
  period: string;
  logo_link: string;
  categories: number[];
  description: string;
  cashback_percent: number;
  is_active: boolean;
  service_link: string;
  monthly_price: number;
  annual_price: number;
  semi_annual_price: number;
  promocode: string;
  is_subscribed?: boolean;
  preview: string;
  autorenewal: boolean;
};

type UserType = {
  phone_number: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  account_balance: number;
  cashback: number;
  current_month_expenses: number;
  subscriptions: MyCardType[];
};

type CoverCardType = {
  categories: number[];
  logo_link: string;
  name: string;
  service_link: string;
  subscriptions: MyCardType[]
};

