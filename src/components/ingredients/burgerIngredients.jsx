import React, { useState } from 'react';
import { CurrencyIcon, LockIcon, DragIcon, DeleteIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import doneImage from '../../images/done.png';
import burgeringredientsStyles from './burgerIngredients.module.css';
import { ingredientType } from '../../utils/types';
import IngredientDetails from '../modals/ingredientDetails';

function BurgerIngredients({ data }) {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpen = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const bun = data.filter(item => item.type === 'bun' && item._id === '643d69a5c3f7b9001cfa093c')[0];
    const mains = data.filter(item => item.type === 'main');
    const sauces = data.filter(item => item.type === 'sauce');

    BurgerIngredients.propTypes = ingredientType;

    return (
        <section className={burgeringredientsStyles.ingredients}>
            <ul className={burgeringredientsStyles.ingredients__default_list}>
                <li key={bun._id} className={`p-2 ${burgeringredientsStyles.ingredients__upper_bun}`}>
                    <div className={`${burgeringredientsStyles.ingredients__main_list_inner_wrapper} ${burgeringredientsStyles.ingredients__upper_bun_inner}`}>
                        <img src={bun.image_mobile} alt={bun.name} />
                        <p className={`text text_type_main-default ${burgeringredientsStyles.ingredients__name}`}>{`${bun.name} (верх)`}</p>
                        <div className={burgeringredientsStyles.ingredients__main_list_inner__secondary_wrapper}>
                            <div className={burgeringredientsStyles.ingredients__main_list_price_wrapper}>
                                <p className={`text text_type_digits-default ${burgeringredientsStyles.ingredients__main_list_price}`}>{bun.price}</p>
                                <CurrencyIcon />
                            </div>
                            <LockIcon type="secondary" />
                        </div>
                    </div>
                </li>
            </ul>
            <ul className={`custom-scroll ${burgeringredientsStyles.ingredients__main_list}`}>
                {sauces.map(sauce => (
                    <li key={sauce._id} className={`p-2`}>
                        <DragIcon />
                        <div className={`${burgeringredientsStyles.ingredients__main_list_inner_wrapper} ${burgeringredientsStyles.ingredients__default_bun_inner}`}>
                            <img src={sauce.image_mobile} alt={sauce.name} />
                            <p className={`text text_type_main-default ${burgeringredientsStyles.ingredients__name}`}>{sauce.name}</p>
                            <div className={burgeringredientsStyles.ingredients__main_list_inner__secondary_wrapper}>
                                <div className={burgeringredientsStyles.ingredients__main_list_price_wrapper}>
                                    <p className={`text text_type_digits-default ${burgeringredientsStyles.ingredients__main_list_price}`}>{sauce.price}</p>
                                    <CurrencyIcon />
                                </div>
                                <DeleteIcon />
                            </div>
                        </div>
                    </li>
                ))}
                {mains.map(main => (
                    <li key={main._id} className={`p-2`}>
                        <DragIcon />
                        <div className={`${burgeringredientsStyles.ingredients__main_list_inner_wrapper} ${burgeringredientsStyles.ingredients__default_bun_inner}`}>
                            <img src={main.image_mobile} alt={main.name} />
                            <p className={`text text_type_main-default ${burgeringredientsStyles.ingredients__name}`}>{main.name}</p>
                            <div className={burgeringredientsStyles.ingredients__main_list_inner__secondary_wrapper}>
                                <div className={burgeringredientsStyles.ingredients__main_list_price_wrapper}>
                                    <p className={`text text_type_digits-default ${burgeringredientsStyles.ingredients__main_list_price}`}>{main.price}</p>
                                    <CurrencyIcon className={burgeringredientsStyles.ingredients__currency} />
                                </div>
                                <DeleteIcon />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <ul className={burgeringredientsStyles.ingredients__default_list}>
                <li key={bun._id} className={`p-2 ${burgeringredientsStyles.ingredients__lower_bun}`}>
                    <div className={`${burgeringredientsStyles.ingredients__main_list_inner_wrapper} ${burgeringredientsStyles.ingredients__lower_bun_inner}`}>
                        <img src={bun.image_mobile} alt={bun.name} />
                        <p className={`text text_type_main-default ${burgeringredientsStyles.ingredients__name}`}>{`${bun.name} (низ)`}</p>
                        <div className={burgeringredientsStyles.ingredients__main_list_inner__secondary_wrapper}>
                            <div className={burgeringredientsStyles.ingredients__main_list_price_wrapper}>
                                <p className={`text text_type_digits-default ${burgeringredientsStyles.ingredients__main_list_price}`}>{bun.price}</p>
                                <CurrencyIcon />
                            </div>
                            <LockIcon type="secondary" />
                        </div>
                    </div>
                </li>
            </ul>
            <div className={burgeringredientsStyles.ingredients__final_price_container}>
                <div className={burgeringredientsStyles.ingredients__final_price_wrapper}>
                    <h2 className={`text text_type_digits-medium ${burgeringredientsStyles.ingredients__final_price_digit}`}>610</h2>
                    <CurrencyIcon />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={() => handleOpen()}>
                    Оформить заказ
                </Button>
            </div>
            <IngredientDetails isOpen={isModalOpen} handleClose={handleClose}>
                <div className={`${burgeringredientsStyles.ingredients__modal_wrapper}`}>
                    <div className={burgeringredientsStyles.ingredients__modal_inner}>
                        <h3 className="text text_type_digits-large p-10">034536</h3>
                        <p className='text text_type_main-medium p-4'>идентификатор заказа</p>
                        <img
                            className={burgeringredientsStyles.ingredients__modal_inner_done}
                            src={doneImage}
                            alt="Иконка готово."
                        />
                        <p className="text text_type_main-small p-2">Ваш заказ начали готовить</p>
                        <p className="text text_type_main-small text_color_inactive p-2">Дождитесь готовности на орбитальной станции</p>
                    </div>
                </div>
            </IngredientDetails>
        </section>
    );
}

export { BurgerIngredients };