import React from 'react';
import { useDrop } from 'react-dnd';
import { CurrencyIcon, LockIcon, DragIcon, DeleteIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burgerConstructor.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';

function BurgerConstructor({ data, handleOrderDetailsOpen, handleIngredientDrop }) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'ingredient',
        drop: (item) => {
            handleIngredientDrop(item.id, item.type);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    const bun = data.find(item => item.type === 'bun');
    const mains = data.filter(item => item.type !== 'bun');

    const totalPrice = data.reduce((acc, item) => acc + item.price, 0);

    return (
        <section className={burgerConstructorStyles.ingredients} ref={drop}>
            <ul className={burgerConstructorStyles.ingredients__default_list}>
                {bun ? (
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
                ) : (
                    <li className={`p-2 ${burgerConstructorStyles.ingredients__upper_bun}`} style={{ backgroundColor: isOver ? '#2ffdc8' : 'transparent' }}>
                        <div className={`${burgerConstructorStyles.ingredients__main_list_inner_wrapper} ${burgerConstructorStyles.empty_constructor_text}`}>
                            <p className={`text text_type_main-medium`}>Здесь могла бы быть ваша булочка</p>
                        </div>
                    </li>
                )}
            </ul>
            <ul className={`custom-scroll ${burgerConstructorStyles.ingredients__main_list}`}>
                {mains.length ? (
                    mains.map(main => (
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
                    ))
                ) : (
                    <li className={`p-2 ${burgerConstructorStyles.ingredients__main_list}`}>
                        <div className={`${burgerConstructorStyles.ingredients__main_list_inner_wrapper} ${burgerConstructorStyles.empty_constructor_text}`}>
                            <p className={`text text_type_main-medium`} style={{ backgroundColor: isOver ? '#2ffdc8' : 'transparent' }}>Перетащите ваши ингредиенты сюда</p>
                        </div>
                    </li>
                )}
            </ul>
            <ul className={burgerConstructorStyles.ingredients__default_list}>
                {bun ? (
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
                ) : (
                    <li className={`p-2 ${burgerConstructorStyles.ingredients__lower_bun}`} style={{ backgroundColor: isOver ? '#2ffdc8' : 'transparent' }}>
                        <div className={`${burgerConstructorStyles.ingredients__main_list_inner_wrapper} ${burgerConstructorStyles.empty_constructor_text}`}>
                            <p className={`text text_type_main-medium`}>Здесь могла бы быть ваша булочка</p>
                        </div>
                    </li>
                )}
            </ul>
            <div className={burgerConstructorStyles.ingredients__final_price_container}>
                <div className={burgerConstructorStyles.ingredients__final_price_wrapper}>
                    <h2 className={`text text_type_digits-medium ${burgerConstructorStyles.ingredients__final_price_digit}`}>{totalPrice}</h2>
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
