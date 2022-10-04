/// <reference types="react-scripts" />

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  surname: HTMLInputElement;
  birthday: HTMLInputElement;
  phoneNumber: HTMLInputElement;
  url: HTMLInputElement;
  about: HTMLTextAreaElement;
  stack: HTMLTextAreaElement;
  description: HTMLTextAreaElement;
  formComplete: boolean;
}

interface customFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

interface FormFields {
  name: string;
  surname: string;
  birthday: string;
  phoneNumber: string;
  url: string;
  about: string;
  stack: string;
  description: string;
  formComplete: boolean;
  [key: string]: string | boolean;
}

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
