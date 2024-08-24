import React, { useState, ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetError } from '../../services/reducers/userSlice';
import { RootState } from '../../services/store/store';
import formStyles from '../form.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch<any>(loginUser({ email, password }))
  };

  return (
    <div className={formStyles.wrapper}>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <h1 className={`${formStyles.heading} text text_type_main-medium`}>Вход</h1>
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
          {isLoading ? 'Загрузка...' : 'Войти'}
        </Button>
        <p className={`text text_type_main-small text_color_inactive ${formStyles.loginText}`}>
          Вы — новый пользователь? <a href="/register" className={formStyles.loginLink}>Зарегистрироваться</a>
        </p>
        <p className={`text text_type_main-small text_color_inactive ${formStyles.loginText}`}>
          Забыли пароль? <a href="/forgot-password" className={formStyles.loginLink}>Восстановить пароль</a>
        </p>
      </form>
    </div>
  );
}

export { LoginPage };
