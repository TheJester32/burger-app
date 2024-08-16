import React from 'react';
import loginStyles from './login.module.css';

 function LoginPage() {
  return (
    <div className={loginStyles.wrapper}>
      <form className={loginStyles.form}>
        <h1 className={loginStyles.heading}>Вход</h1>
      </form>
    </div>
  );
}

export { LoginPage };