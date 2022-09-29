import React from "react";
import { MultiLineInput } from "../multi-line-input/multi-line-input";

import { SingleLineInput } from "../single-line-input/single-line-input";

import styles from "./form.module.css";

export class Form extends React.Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
    this.cancelHandler = this.cancelHandler.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const formData = {
      name: event.target.name.value,
      surname: event.target.surname.value,
      birthday: event.target.birthday.value,
      phone_number: event.target.phone_number.value,
      url: event.target.url.value,
      about: event.target.about.value,
      stack: event.target.stack.value,
      description: event.target.description.value,
    };

    alert(JSON.stringify(formData));
  }

  cancelHandler() {
    this.formRef.current.reset();
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.onSubmit} onReset={this.cancelHandler} ref={this.formRef}>
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
        <MultiLineInput
          label="Стек технологий*"
          type="text"
          name="stack"
          placeholder="Перечислите технологии которые вы использовали"
        />
        <MultiLineInput
          label="Описание последнего проекта*"
          type="text"
          name="description"
          placeholder="Опишите ваш последний проект"
        />
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
  }
}
