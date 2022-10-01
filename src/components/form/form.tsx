import React, { useRef } from "react";
import { MultiLineInput } from "../multi-line-input/multi-line-input";

import { SingleLineInput } from "../single-line-input/single-line-input";

import styles from "./form.module.css";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  surname: HTMLInputElement;
  birthday: HTMLInputElement;
  phone_number: HTMLInputElement;
  url: HTMLInputElement;
  about: HTMLTextAreaElement;
  stack: HTMLTextAreaElement;
  description: HTMLTextAreaElement;
}

interface customFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

export const Form = () => {
  const formRef = useRef<null | HTMLFormElement>(null);

  const handleFormSubmit = (event: React.FormEvent<customFormElements>) => {
    event.preventDefault();

    const formData = {
      name: event.currentTarget.elements.name.value,
      surname: event.currentTarget.elements.surname.value,
      birthday: event.currentTarget.birthday.value,
      phone_number: event.currentTarget.phone_number.value,
      url: event.currentTarget.url.value,
      about: event.currentTarget.about.value,
      stack: event.currentTarget.stack.value,
      description: event.currentTarget.description.value,
    };

    alert(JSON.stringify(formData));
  };

  const handleFormReset = () => {
    formRef?.current?.reset();
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit} onReset={handleFormReset} ref={formRef}>
      <h1 className={styles.title}>Создание анкеты</h1>
      <SingleLineInput label="Имя*" type="text" name="name" placeholder="Имя" />
      <SingleLineInput label="Фамилия*" type="text" name="surname" placeholder="Фамилия" />
      <SingleLineInput label="Дата рождения*" type="date" name="birthday" />
      <SingleLineInput
        label="Телефон*"
        type="tel"
        name="phone_number"
        placeholder="81234567890"
        pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$"
      />
      <SingleLineInput
        label="Сайт*"
        type="url"
        name="url"
        placeholder="https://example.com"
        pattern="http(s?)(:\/\/)((www.)?)(([^.]+)\.)?([a-zA-z0-9\-_]+)(.com|.net|.gov|.org|.in)(\/[^\s]*)?"
      />
      <MultiLineInput label="О себе*" type="text" name="about" placeholder="Расскажите немного о себе" />
      <MultiLineInput label="Стек технологий*" type="text" name="stack" placeholder="Перечислите технологии которые вы использовали" />
      <MultiLineInput label="Описание последнего проекта*" type="text" name="description" placeholder="Опишите ваш последний проект" />
      <div className={styles.controls}>
        <button type="reset" className={`${styles.button} ${styles.cancel}`}>
          Отмена
        </button>
        <button type="submit" className={`${styles.button} ${styles.submit}`}>
          Отправить
        </button>
      </div>
    </form>
  );
};
