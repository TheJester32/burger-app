import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useAppSelector } from "../../services/store/hooks";
import IngredientDetails from '../../components/modals/ingredientModal/ingredientDetails';

function IngredientPage() {
  const { id } = useParams();
  const location = useLocation();
  const { allIngredients, loading, error } = useAppSelector((state) => state.ingredients);

  useEffect(() => {
    if (!location.state?.modal) {
      localStorage.removeItem('viewedIngredient');
    }
  }, [location.state]);

  const ingredient = allIngredients.find((item: { _id: string | undefined; }) => item._id === id);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка загрузки ингредиентов: {error}</p>;
  }

  if (!ingredient) {
    return <p>Ингредиент не найден</p>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '6rem' }}>
      <IngredientDetails ingredient={ingredient} />
    </div>
  );
}

export { IngredientPage };
