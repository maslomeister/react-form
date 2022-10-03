import React, { useRef, useState, useMemo, useEffect } from "react";

import { MultiLineInput } from "../multi-line-input/multi-line-input";
import { SingleLineInput } from "../single-line-input/single-line-input";
import { phoneNumberFormat } from "../../utils/validation";

import styles from "./form.module.css";

interface Props {
  setFormResult: (fields: FormFields) => void;
}

const emptyFields = { name: "", surname: "", birthday: "", phoneNumber: "", url: "", about: "", stack: "", description: "" };

export const Form = ({ setFormResult }: Props) => {
  const [inputValues, setInputValues] = useState<FormFields>({ ...emptyFields });
  const [errorValues, setErrorValues] = useState<FormFields>({ ...emptyFields });

  const formRef = useRef<null | HTMLFormElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValues({ ...inputValues, phoneNumber: phoneNumberFormat(value) });
  };

  const validateName = () => {
    const name = inputValues.name.trim();

    if (name.length === 0) {
      setErrorValues((prevValue) => {
        return { ...prevValue, name: "Поле пустое. Заполните пожалуйста" };
      });
      return false;
    } else if (name[0].toLowerCase() === name[0]) {
      setErrorValues((prevValue) => {
        return { ...prevValue, name: "Имя должно начинаться с большой буквы" };
      });
      return false;
    } else {
      setErrorValues((prevValue) => {
        return { ...prevValue, name: "" };
      });
      return true;
    }
  };

  const validateSurname = () => {
    const surname = inputValues.surname.trim();

    if (surname.length === 0) {
      setErrorValues((prevValue) => {
        return { ...prevValue, surname: "Поле пустое. Заполните пожалуйста" };
      });
      return false;
    } else if (surname[0].toLowerCase() === surname[0]) {
      setErrorValues((prevValue) => {
        return { ...prevValue, surname: "Имя должно начинаться с большой буквы" };
      });
      return false;
    } else {
      setErrorValues((prevValue) => {
        return { ...prevValue, surname: "" };
      });
      return true;
    }
  };

  const validateBirthday = () => {
    const birthday = inputValues.birthday;

    if (birthday.length === 0) {
      setErrorValues((prevValue) => {
        return { ...prevValue, birthday: "Поле пустое. Заполните пожалуйста" };
      });
      return false;
    } else {
      setErrorValues((prevValue) => {
        return { ...prevValue, birthday: "" };
      });
      return true;
    }
  };

  const validatePhoneNumber = () => {
    const phoneNumber = inputValues.phoneNumber;

    if (phoneNumber.length === 0) {
      setErrorValues((prevValue) => {
        return { ...prevValue, phoneNumber: "Поле пустое. Заполните пожалуйста" };
      });
      return false;
    } else if (phoneNumber.length < 11) {
      setErrorValues((prevValue) => {
        return { ...prevValue, phoneNumber: "Неверный номер" };
      });
      return false;
    } else {
      setErrorValues((prevValue) => {
        return { ...prevValue, phoneNumber: "" };
      });
      return true;
    }
  };

  const validateUrl = () => {
    const url = inputValues.url.trim();

    if (url.length === 0) {
      setErrorValues((prevValue) => {
        return { ...prevValue, url: "Поле пустое. Заполните пожалуйста" };
      });
      return false;
    } else if (!url.startsWith("https://")) {
      setErrorValues((prevValue) => {
        return { ...prevValue, url: "Сайт должен начинаться с https://" };
      });
      return false;
    } else {
      setErrorValues((prevValue) => {
        return { ...prevValue, url: "" };
      });
      return true;
    }
  };

  const validateMultiLine = (name: "about" | "stack" | "description") => {
    const multiLine = inputValues[name].trim();
    if (multiLine.length === 0) {
      setErrorValues((prevValue) => {
        return { ...prevValue, [name]: "Поле пустое. Заполните пожалуйста" };
      });
      return false;
    } else if (multiLine.length > 600) {
      setErrorValues((prevValue) => {
        return { ...prevValue, [name]: "Превышен лимит символов" };
      });
      return false;
    } else {
      setErrorValues((prevValue) => {
        return { ...prevValue, [name]: "" };
      });
      return true;
    }
  };

  useEffect(() => {
    if (inputValues.about.length > 0) {
      validateMultiLine("about");
    }
  }, [inputValues.about]);

  useEffect(() => {
    if (inputValues.stack.length > 0) {
      validateMultiLine("stack");
    }
  }, [inputValues.stack]);

  useEffect(() => {
    if (inputValues.description.length > 0) {
      validateMultiLine("description");
    }
  }, [inputValues.description]);

  const formErrors = useMemo(() => {
    if (JSON.stringify(errorValues) !== JSON.stringify(emptyFields)) {
      return "В каком-то из полей ошибка";
    } else {
      return "";
    }
  }, [errorValues]);

  const handleFormSubmit = (event: React.FormEvent<customFormElements>) => {
    event.preventDefault();

    validateName();
    validateSurname();
    validateBirthday();
    validatePhoneNumber();
    validateUrl();
    validateMultiLine("about");
    validateMultiLine("stack");
    validateMultiLine("description");

    if (
      validateName() &&
      validateSurname() &&
      validateBirthday() &&
      validatePhoneNumber() &&
      validateUrl() &&
      validateMultiLine("about") &&
      validateMultiLine("stack") &&
      validateMultiLine("description")
    ) {
      const formData = {
        name: event.currentTarget.elements.name.value.trim(),
        surname: event.currentTarget.elements.surname.value.trim(),
        birthday: event.currentTarget.elements.birthday.value.trim(),
        phoneNumber: event.currentTarget.elements.phoneNumber.value.trim(),
        url: event.currentTarget.elements.url.value.trim(),
        about: event.currentTarget.elements.about.value.trim(),
        stack: event.currentTarget.elements.stack.value.trim(),
        description: event.currentTarget.elements.description.value.trim(),
      };

      setFormResult(formData);
    }
  };

  const handleFormReset = () => {
    setInputValues({ ...emptyFields });
    setErrorValues({ ...emptyFields });
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit} onReset={handleFormReset} ref={formRef} noValidate>
      <h1 className={styles.title}>Создание анкеты</h1>
      <SingleLineInput
        label="Имя*"
        type="text"
        name="name"
        placeholder="Имя"
        value={inputValues.name}
        onChange={handleInputChange}
        error={errorValues.name}
        onBlur={validateName}
      />
      <SingleLineInput
        label="Фамилия*"
        type="text"
        name="surname"
        placeholder="Фамилия"
        value={inputValues.surname}
        onChange={handleInputChange}
        error={errorValues.surname}
        onBlur={validateSurname}
      />
      <SingleLineInput
        label="Дата рождения*"
        type="date"
        name="birthday"
        value={inputValues.birthday}
        onChange={handleInputChange}
        onBlur={validateBirthday}
        error={errorValues.birthday}
      />
      <SingleLineInput
        label="Телефон*"
        type="tel"
        name="phoneNumber"
        placeholder="1-1111-11-11"
        maxLength={11}
        value={inputValues.phoneNumber}
        onChange={handlePhoneChange}
        onBlur={validatePhoneNumber}
        error={errorValues.phoneNumber}
      />
      <SingleLineInput
        label="Сайт*"
        type="url"
        name="url"
        placeholder="https://example.com"
        value={inputValues.url}
        onChange={handleInputChange}
        onBlur={validateUrl}
        error={errorValues.url}
      />
      <MultiLineInput
        label="О себе*"
        type="text"
        name="about"
        placeholder="Расскажите немного о себе"
        value={inputValues.about}
        onChange={handleInputChange}
        error={errorValues.about}
      />
      <MultiLineInput
        label="Стек технологий*"
        type="text"
        name="stack"
        placeholder="Перечислите технологии которые вы использовали"
        value={inputValues.stack}
        onChange={handleInputChange}
        error={errorValues.stack}
      />
      <MultiLineInput
        label="Описание последнего проекта*"
        type="text"
        name="description"
        placeholder="Опишите ваш последний проект"
        value={inputValues.description}
        onChange={handleInputChange}
        error={errorValues.description}
      />
      <div className={styles.controls}>
        <button type="reset" className={`${styles.button} ${styles.cancel}`}>
          Отмена
        </button>
        <button type="submit" className={`${styles.button} ${styles.submit}`}>
          Отправить
        </button>
      </div>
      <label className={styles.error}>{formErrors}</label>
    </form>
  );
};
