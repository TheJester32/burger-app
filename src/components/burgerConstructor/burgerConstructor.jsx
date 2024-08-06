import React from 'react';
import { CurrencyIcon, LockIcon, DragIcon, DeleteIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burgerConstructor.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';

function BurgerConstructor({ data, handleOrderDetailsOpen, handleIngredientDrop }) {
    const bun = data.filter(item => item.type === 'bun' && item._id === '643d69a5c3f7b9001cfa093c')[0];
    const mains = data.filter(item => item.type === 'main');
    const sauces = data.filter(item => item.type === 'sauce');

    return (
        <section className={burgerConstructorStyles.ingredients}>
            <ul className={burgerConstructorStyles.ingredients__default_list}>
                <li key={bun._id} className={`p-2 ${burgerConstructorStyles.ingredients__upper_bun}`}>
                    <div className={`${burgerConstructorStyles.ingredients__main_list_inner_wrapper} ${burgerConstructorStyles.ingredients__upper_bun_inner}`}>
                        <img src={bun.image_mobile} alt={bun.name} />
                        <p className={`text text_type_main-default ${burgerConstructorStyles.ingredients__name}`}>{`${bun.name} (верх)`}</p>
                        <div className={burgerConstructorStyles.ingredients__main_list_inner__secondary_wrapper}>
                            <div className={burgerConstructorStyles.ingredients__main_list_price_wrapper}>
                                <p className={`text text_type_digits-default ${burgerConstructorStyles.ingredients__main_list_price}`}>{bun.price}</p>
                                <CurrencyIcon />
                            </div>
                            <LockIcon type="secondary" />
                        </div>
                    </div>
                </li>
            </ul>
            <ul className={`custom-scroll ${burgerConstructorStyles.ingredients__main_list}`}>
                {sauces.map(sauce => (
                    <li key={sauce._id} className={`p-2`} onDrop={() => handleIngredientDrop(sauce._id)}>
                        <DragIcon />
                        <div className={`${burgerConstructorStyles.ingredients__main_list_inner_wrapper} ${burgerConstructorStyles.ingredients__default_bun_inner}`}>
                            <img src={sauce.image_mobile} alt={sauce.name} />
                            <p className={`text text_type_main-default ${burgerConstructorStyles.ingredients__name}`}>{sauce.name}</p>
                            <div className={burgerConstructorStyles.ingredients__main_list_inner__secondary_wrapper}>
                                <div className={burgerConstructorStyles.ingredients__main_list_price_wrapper}>
                                    <p className={`text text_type_digits-default ${burgerConstructorStyles.ingredients__main_list_price}`}>{sauce.price}</p>
                                    <CurrencyIcon />
                                </div>
                                <DeleteIcon />
                            </div>
                        </div>
                    </li>
                ))}
                {mains.map(main => (
                    <li key={main._id} className={`p-2`} onDrop={() => handleIngredientDrop(main._id)}>
                        <DragIcon />
                        <div className={`${burgerConstructorStyles.ingredients__main_list_inner_wrapper} ${burgerConstructorStyles.ingredients__default_bun_inner}`}>
                            <img src={main.image_mobile} alt={main.name} />
                            <p className={`text text_type_main-default ${burgerConstructorStyles.ingredients__name}`}>{main.name}</p>
                            <div className={burgerConstructorStyles.ingredients__main_list_inner__secondary_wrapper}>
                                <div className={burgerConstructorStyles.ingredients__main_list_price_wrapper}>
                                    <p className={`text text_type_digits-default ${burgerConstructorStyles.ingredients__main_list_price}`}>{main.price}</p>
                                    <CurrencyIcon className={burgerConstructorStyles.ingredients__currency} />
                                </div>
                                <DeleteIcon />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <ul className={burgerConstructorStyles.ingredients__default_list}>
                <li key={bun._id} className={`p-2 ${burgerConstructorStyles.ingredients__lower_bun}`}>
                    <div className={`${burgerConstructorStyles.ingredients__main_list_inner_wrapper} ${burgerConstructorStyles.ingredients__lower_bun_inner}`}>
                        <img src={bun.image_mobile} alt={bun.name} />
                        <p className={`text text_type_main-default ${burgerConstructorStyles.ingredients__name}`}>{`${bun.name} (низ)`}</p>
                        <div className={burgerConstructorStyles.ingredients__main_list_inner__secondary_wrapper}>
                            <div className={burgerConstructorStyles.ingredients__main_list_price_wrapper}>
                                <p className={`text text_type_digits-default ${burgerConstructorStyles.ingredients__main_list_price}`}>{bun.price}</p>
                                <CurrencyIcon />
                            </div>
                            <LockIcon type="secondary" />
                        </div>
                    </div>
                </li>
            </ul>
            <div className={burgerConstructorStyles.ingredients__final_price_container}>
                <div className={burgerConstructorStyles.ingredients__final_price_wrapper}>
                    <h2 className={`text text_type_digits-medium ${burgerConstructorStyles.ingredients__final_price_digit}`}>610</h2>
                    <CurrencyIcon />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={handleOrderDetailsOpen}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientType).isRequired,
    handleOrderDetailsOpen: PropTypes.func.isRequired,
    handleIngredientDrop: PropTypes.func.isRequired,
};

export { BurgerConstructor };