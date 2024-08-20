import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import formStyles from '../form.module.css';
import profileStyles from './profile.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { logoutUser, updateUserProfile } from '../../services/reducers/userSlice';
import { RootState } from '../../services/store/store';
import { AppDispatch } from '../../services/store/store';

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        const resultAction = await dispatch(logoutUser(refreshToken)).unwrap();
        if (resultAction.success) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        } else {
          console.error('Ошибка выхода из системы:', resultAction.message);
        }
      } catch (error) {
        console.error('Ошибка выхода из системы:', error);
      }
    }
    navigate('/login');
  };

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserProfile({ name, email, password }));
  };

  return (
    <div className={profileStyles.profile_content}>
      <div className={profileStyles.profile_list}>
        <ul>
          <li className='text text_type_main-large p-2'>
            <a href='/profile'>Профиль</a>
          </li>
          <li className='text text_type_main-large p-2'>
            <a href='/profile/orders'>История заказов</a>
          </li>
          <li className='text text_type_main-large p-2'>
            <p onClick={handleLogout}>Выход</p>
          </li>
        </ul>
        <p className='text text_type_main-default text_color_inactive p-2'
          style={{
            width: 350,
            marginTop: '2rem',
          }}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={formStyles.wrapper}>
        <form className={formStyles.form} onSubmit={handleProfileUpdate}>
          <Input
            type="text"
            placeholder="Имя"
            name="name"
            value={name}
            icon={'EditIcon'}
            extraClass={formStyles.input}
            onChange={handleNameChange} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
            value={email}
            icon={'EditIcon'}
            extraClass={formStyles.input}
            onChange={handleEmailChange} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          <Input
            name="password"
            value={password}
            placeholder="Пароль"
            icon={'EditIcon'}
            extraClass={formStyles.input}
            onChange={handlePasswordChange} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
        </form>
      </div>
    </div>
  );
}

export { Profile };
