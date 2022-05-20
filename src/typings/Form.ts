export interface FormValues {
  [key: string]: boolean | null;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormRequestItem {
  checkId: string;
  result: 'yes' | 'no';
}
