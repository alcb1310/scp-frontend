export type storeDataType = {
  token: string;
  type: string;
  uuid: string;
  email: string;
  name: string;
  company: {
    uuid: string;
    ruc: string;
    name: string;
    employees: string;
  };
};
