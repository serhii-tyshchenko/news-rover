import { useEffect, useState, useCallback } from 'react';

import { isEmpty } from 'common/utils';

import { IconButton } from 'components/atoms';
import { Skeleton } from 'components/molecules';

import { TProvider, TNews } from 'common/types';

import { fetchNews, formatTime } from './widget.utils';

import './widget.scss';

type TWidgetProps = {
  provider: TProvider;
};

function Widget({ provider }: TWidgetProps) {
  const [news, setNews] = useState([] as TNews);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = useCallback(() => {
    fetchNews(provider.id, setNews, setIsLoading);
  }, [provider.id]);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  return (
    <li className="widget">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>{provider.name}</h3>
        <IconButton
          icon="arrows-cw"
          title="Refresh"
          onClick={handleRefresh}
          className={isLoading ? 'animation-rotate' : ''}
        />
      </div>
      {isLoading && <Skeleton />}
      {isEmpty(news) && !isLoading && <div>No news</div>}
      {!isEmpty(news) && !isLoading && (
        <ul className="item-list">
          {news.map((item: any) => (
            <li key={item.title} className="item">
              {item?.enclosures[0]?.url && (
                <img
                  src={item?.enclosures[0]?.url}
                  alt={item.title}
                  className="item__image"
                  loading="lazy"
                />
              )}
              <div className="d-flex">
                <span className="mr-2 color-secondary">
                  {formatTime(item.created)}
                </span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="color-primary"
                >
                  {item.title}
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default Widget;
