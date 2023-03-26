import { useEffect, useState } from 'react';
import { Skeleton } from 'components';
import { IconButton } from 'components/atoms';
import { TNews } from 'App.types';
import { isEmpty } from 'common/utils';
import { fetchNews, convertDate } from './Widget.utils';

import './Widget.scss';

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
        <IconButton
          icon="arrows-cw"
          title="Refresh"
          onClick={() => fetchNews(provider.name, setNews, setIsLoading)}
          className={isLoading ? 'loading' : ''}
        />
      </div>
      {isLoading && <Skeleton />}
      {isEmpty(news) && !isLoading && <div>No news</div>}
      {!isEmpty(news) && !isLoading && (
        <ul>
          {news.map((item: any) => (
            <li key={item.title} className="d-flex">
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
