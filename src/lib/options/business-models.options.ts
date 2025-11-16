import { BusinessModel } from "../types";

export interface BusinessModelOption {
  label: string;
  value: BusinessModel;
}

export const businessModelOptions: BusinessModelOption[] = [
  {
    label: "Businesses",
    value: BusinessModel.B2B,
  },
  {
    label: "People",
    value: BusinessModel.D2C,
  },
];
