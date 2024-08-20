import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetError } from '../../services/reducers/userSlice';
import { RootState } from '../../services/store/store';
import formStyles from '../form.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch<any>(registerUser({ name, email, password }));
  };

  return (
    <div className={formStyles.wrapper}>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <h1 className={`${formStyles.heading} text text_type_main-medium`}>Регистрация</h1>
        <Input
          type="text"
          placeholder="Имя"
          name="name"
          value={name}
          extraClass={formStyles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        />
        <Input
          type="email"
          placeholder="E-mail"
          name="email"
          value={email}
          extraClass={formStyles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        />
        <PasswordInput
          name="password"
          value={password}
          extraClass={formStyles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        {error && <p className={`${formStyles.errorText} text text_type_main-small`}>{error}</p>}
        <Button htmlType="submit" type="primary" size="medium" style={{ marginBottom: '2rem' }} disabled={isLoading}>
          {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
        </Button>
        <p className={`p-4 text text_type_main-small text_color_inactive ${formStyles.loginText}`}>
          Уже зарегистрированы? <a href="/login" className={formStyles.loginLink}>Войти</a>
        </p>
      </form>
    </div>
  );
}

export { Register };
