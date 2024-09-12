import React from "react";
import appStyles from "../../components/app/app.module.css";
import { Feed } from '../../components/feed/feedOrders';
import { FeedStats } from "../../components/feed/feedStats";
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store/store';

function FeedPage() {
    const {
      loading,
      error
    } = useSelector((state: RootState) => state.ingredients);

  return (
    <>
    {loading && <div>Загрузка...</div>}
    {error && <div>Ошибка: {error}</div>}
    <main className={appStyles.main}>
      <div className={appStyles.main__inner_content}>
        <Feed />
        <FeedStats />
      </div>
    </main>
    </>
  );
}

export { FeedPage };
