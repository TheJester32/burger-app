import React, { useState } from 'react';
import formStyles from '../form.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

function ResetPassword() {

  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <div className={formStyles.wrapper}>
      <form className={formStyles.form}>
        <h1 className={`${formStyles.heading} text text_type_main-medium`}>Восстановление пароля</h1>
        <PasswordInput
          name="password"
          value={password}
          placeholder={'Введите новый пароль'}
          extraClass={formStyles.input}
          onChange={handlePasswordChange}
        />
        <Input
          name="code"
          placeholder={'Введите код из письма'}
          value={code}
          extraClass={formStyles.input}
          onChange={handleCodeChange}
        />
        <Button htmlType="submit" type="primary" size="medium" style={{ marginBottom: '2rem' }}>
          Сохранить
        </Button>
        <p className={`text text_type_main-small text_color_inactive ${formStyles.loginText}`}>
          Вспомнили пароль? <a href="/login" className={formStyles.loginLink}>Войти</a>
        </p>
      </form>
    </div>
  );
}

export { ResetPassword };