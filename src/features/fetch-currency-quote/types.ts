interface CurrencyData {
  quote: {
    USD: {
      price: number;
      percent_change_24h: number;
    };
  };
}

export interface ResponseData {
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
  };
  data: {
    ['1']: CurrencyData;
    ['825']: CurrencyData;
    ['1027']: CurrencyData;
  };
}
