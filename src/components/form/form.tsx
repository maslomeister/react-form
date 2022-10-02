import React, { useRef, useState, useMemo, useEffect } from "react";

import { MultiLineInput } from "../multi-line-input/multi-line-input";
import { SingleLineInput } from "../single-line-input/single-line-input";
import { phoneNumberFormat } from "../../utils/validation";

import styles from "./form.module.css";

const emptyFields = { name: "", surname: "", birthday: "", phoneNumber: "", url: "", about: "", stack: "", description: "" };

export const Form = () => {
  const [inputValues, setInputValues] = useState<Fields>({ ...emptyFields });
  const [errorValues, setErrorValues] = useState<Fields>({ ...emptyFields });

  const formRef = useRef<null | HTMLFormElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setInputValues((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValues({ ...inputValues, phoneNumber: phoneNumberFormat(value) });
  };

  const validateName = () => {
    if (inputValues.name.length === 0) {
      setErrorValues((prevValue) => {
        return { ...prevValue, name: "Поле не должно быть пустым" };
      });
    } else if (inputValues.name[0].toLowerCase() === inputValues.name[0]) {
      setErrorValues((prevValue) => {
        return { ...prevValue, name: "Имя должно начинаться с большой буквы" };
      });
    } else {
      setErrorValues((prevValue) => {
        return { ...prevValue, name: "" };
      });
    }
  };

  const validateSurname = () => {
    if (inputValues.surname.length === 0) {
      setErrorValues((prevValue) => {
        return { ...prevValue, surname: "Поле не должно быть пустым" };
      });
    } else if (inputValues.surname[0].toLowerCase() === inputValues.surname[0]) {
      setErrorValues((prevValue) => {
        return { ...prevValue, surname: "Имя должно начинаться с большой буквы" };
      });
    } else {
      setErrorValues((prevValue) => {
        return { ...prevValue, surname: "" };
      });
    }
  };

  const validateBirthday = () => {
    if (inputValues.birthday.length === 0) {
      setErrorValues((prevValue) => {
        return { ...prevValue, birthday: "Поле не должно быть пустым" };
      });
    } else {
      setErrorValues((prevValue) => {
        return { ...prevValue, birthday: "" };
      });
    }
  };

  const validatePhoneNumber = () => {
    if (inputValues.phoneNumber.length === 0) {
      setErrorValues((prevValue) => {
        return { ...prevValue, phoneNumber: "Поле не должно быть пустым" };
      });
    } else if (inputValues.phoneNumber.length < 11) {
      setErrorValues((prevValue) => {
        return { ...prevValue, phoneNumber: "Неверный номер" };
      });
    } else {
      setErrorValues((prevValue) => {
        return { ...prevValue, phoneNumber: "" };
      });
    }
  };

  const validateUrl = () => {
    if (inputValues.url.length === 0) {
      setErrorValues((prevValue) => {
        return { ...prevValue, url: "Поле не должно быть пустым" };
      });
    } else if (!inputValues.url.startsWith("https://")) {
      setErrorValues((prevValue) => {
        return { ...prevValue, url: "Сайт должен начинаться с https://" };
      });
    } else {
      setErrorValues((prevValue) => {
        return { ...prevValue, url: "" };
      });
    }
  };

  const validateMultiLine = (name: "about" | "stack" | "description") => {
    if (inputValues[name].length > 600) {
      setErrorValues((prevValue) => {
        return { ...prevValue, [name]: "Превышен лимит символов" };
      });
    } else {
      setErrorValues((prevValue) => {
        return { ...prevValue, [name]: "" };
      });
    }
  };

  useEffect(() => {
    validateMultiLine("about");
  }, [inputValues.about]);

  useEffect(() => {
    validateMultiLine("stack");
  }, [inputValues.stack]);

  useEffect(() => {
    validateMultiLine("description");
  }, [inputValues.description]);

  const formHasErrors = useMemo(() => {
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

    if (JSON.stringify(inputValues) === JSON.stringify(emptyFields) || JSON.stringify(errorValues) !== JSON.stringify(emptyFields)) {
      return;
    }

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

    alert(JSON.stringify(formData, null, 2));
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
        name="phone_number"
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
        label="О себе"
        type="text"
        name="about"
        placeholder="Расскажите немного о себе"
        value={inputValues.about}
        onChange={handleInputChange}
        error={errorValues.about}
      />
      <MultiLineInput
        label="Стек технологий"
        type="text"
        name="stack"
        placeholder="Перечислите технологии которые вы использовали"
        value={inputValues.stack}
        onChange={handleInputChange}
        error={errorValues.stack}
      />
      <MultiLineInput
        label="Описание последнего проекта"
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
      <label className={styles.error}>{formHasErrors}</label>
    </form>
  );
};
