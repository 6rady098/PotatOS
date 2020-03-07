export interface IElement {
  [x: string]: any;
  _id: string;
  type: string;
  name: string;
  isRequired: boolean;
  title: string;
  description: string;
}