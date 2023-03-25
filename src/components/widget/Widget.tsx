import { useEffect, useState } from 'react';
import { Skeleton } from 'components';
import { TNews } from 'App.types';
import { isEmptyArray } from 'common/utils';
import { fetchNews, convertDate } from './Widget.utils';

import './Widget.css';

type TWidgetProps = {
  provider: {
    name: string;
    title: string;
  };
};

function Widget({ provider }: TWidgetProps) {
  const [news, setNews] = useState([] as TNews);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNews(provider.name, setNews, setIsLoading);
  }, [provider]);

  return (
    <div className="widget">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{provider.title}</h2>
        <button
          type="button"
          onClick={() => fetchNews(provider.name, setNews, setIsLoading)}
        >
          Refresh
        </button>
      </div>
      {isLoading && <Skeleton />}
      {isEmptyArray(news) && !isLoading && <div>No news</div>}
      {!isEmptyArray(news) && !isLoading && (
        <ul>
          {news.map((item: any) => (
            <li key={item.title}>
              <span className="mr-2">{convertDate(item.created)}</span>
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Widget;
