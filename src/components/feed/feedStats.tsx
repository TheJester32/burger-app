import React from "react";
import feedStyles from "./feed.module.css";

function FeedStats() {
  return (
    <>
      <section className={feedStyles.feedStats}>
        <div className={`${feedStyles.feedStats__lists}`}>
          <div>
            <p className="text text_type_main-medium">Готовы:</p>
            <ul>
              <li
                className={`text text_type_digits-default ${feedStyles.feedStats__lists_ready}`}
              >
                034533
              </li>
              <li
                className={`text text_type_digits-default ${feedStyles.feedStats__lists_ready}`}
              >
                034533
              </li>
              <li
                className={`text text_type_digits-default ${feedStyles.feedStats__lists_ready}`}
              >
                034533
              </li>
              <li
                className={`text text_type_digits-default ${feedStyles.feedStats__lists_ready}`}
              >
                034533
              </li>
              <li
                className={`text text_type_digits-default ${feedStyles.feedStats__lists_ready}`}
              >
                034533
              </li>
              <li
                className={`text text_type_digits-default ${feedStyles.feedStats__lists_ready}`}
              >
                034533
              </li>
              <li
                className={`text text_type_digits-default ${feedStyles.feedStats__lists_ready}`}
              >
                034533
              </li>
              <li
                className={`text text_type_digits-default ${feedStyles.feedStats__lists_ready}`}
              >
                034533
              </li>
            </ul>
          </div>
          <div>
            <p className="text text_type_main-medium">В работе:</p>
            <ul>
              <li className="text text_type_digits-default">034538</li>
              <li className="text text_type_digits-default">034538</li>
              <li className="text text_type_digits-default">034538</li>
              <li className="text text_type_digits-default">034538</li>
              <li className="text text_type_digits-default">034538</li>
              <li className="text text_type_digits-default">034538</li>
            </ul>
          </div>
        </div>
        <div className={`${feedStyles.feedStats__total_wrapper}`}>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className={`text text_type_digits-large`}>28 752</p>
        </div>
        <div className={`${feedStyles.feedStats__total_wrapper}`}>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className={`text text_type_digits-large`}>138</p>
        </div>
      </section>
    </>
  );
}

export { FeedStats };
