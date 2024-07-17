import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './header.module.css';

function Header() {
    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.header__container}>
                <div className={headerStyles.header__double_elements}>
                    <div className={`p-2 ${headerStyles.header__pair_elements}`}>
                        <BurgerIcon type="primary" />
                        <p className={`text text_type_main-default ${headerStyles.header__icons_text}`} id={headerStyles.header__icons_text}>
                            Конструктор
                        </p>
                    </div>
                    <div className={`p-2 ${headerStyles.header__pair_elements}`}>
                        <ListIcon type="secondary" />
                        <p className={`text text_type_main-default ${headerStyles.header__icons_text_secondary}`} id={headerStyles.header__icons_text}>
                            Лента заказов
                        </p>
                    </div>
                </div>
                <div className={headerStyles.header__logo_wrapper}>
                    <Logo />
                </div>
                <div className={`p-2 ${headerStyles.header__pair_elements}`}>
                    <ProfileIcon type="secondary" />
                    <p className={`text text_type_main-default ${headerStyles.header__icons_text_secondary}`} id={headerStyles.header__icons_text}>
                        Личный кабинет
                    </p>
                </div>
            </div>
        </header>
    );
}

export { Header };