import React, { useState } from 'react';
import formStyles from '../form.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

function ForgotPassword() {

  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className={formStyles.wrapper}>
      <form className={formStyles.form}>
        <h1 className={`${formStyles.heading} text text_type_main-medium`}>Восстановление пароля</h1>
        <Input
          type="email"
          placeholder="E-mail"
          name="email"
          value={email}
          extraClass={formStyles.input}
          onChange={handleEmailChange}
        />
        <Button htmlType="submit" type="primary" size="medium" style={{ marginBottom: '2rem' }}>
          Восстановить
        </Button>
        <p className={`text text_type_main-small text_color_inactive ${formStyles.loginText}`}>
          Вспомнили пароль? <a href="/login" className={formStyles.loginLink}>Войти</a>
        </p>
      </form>
    </div>
  );
}

export { ForgotPassword };