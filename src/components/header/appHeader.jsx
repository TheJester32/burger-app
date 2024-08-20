import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './header.module.css';

function Header() {
    return (
        <header className={headerStyles.header}>
            <nav className={headerStyles.header__navigation}>
                <div className={headerStyles.header__double_elements}>
                    <div className={`p-2 ${headerStyles.header__pair_elements}`}>
                        <BurgerIcon type="primary" />
                        <a className={`text text_type_main-default ${headerStyles.header__icons_text}`} id={headerStyles.header__icons_text} href='/'>
                            Конструктор
                        </a>
                    </div>
                    <div className={`p-2 ${headerStyles.header__pair_elements}`}>
                        <ListIcon type="primary" />
                        <a className={`text text_type_main-default ${headerStyles.header__icons_text_secondary}`} id={headerStyles.header__icons_text} href='/'>
                            Лента заказов
                        </a>
                    </div>
                </div>
                <div className={headerStyles.header__logo_wrapper}>
                    <Logo />
                </div>
                <div className={`p-2 ${headerStyles.header__pair_elements}`}>
                    <ProfileIcon type="primary" />
                    <a className={`text text_type_main-default ${headerStyles.header__icons_text_secondary}`} id={headerStyles.header__icons_text} href='/profile'>
                        Личный кабинет
                    </a>
                </div>
            </nav>
        </header>
    );
}

export { Header };