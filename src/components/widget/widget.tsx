import { useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import { useAppDispatch, useAppSelector, useLocalization } from '@hooks';
import { IconButton } from '@components/ui';
import { Skeleton } from '@components';
import { TProvider, TNews, TNewsItem } from '@types';
import { selectBookmarksData } from '@store/selectors';
import {
  doAddBookmark,
  doRemoveBookmark,
  doRemoveProvider,
} from '@store/actions';

import { Item } from './item';
import { fetchNews, checkIfBookmarked } from './widget.utils';

import './widget.scss';

type TWidgetProps = {
  provider: TProvider;
};

function Widget({ provider }: TWidgetProps) {
  const [news, setNews] = useState([] as TNews);
  const [isLoading, setIsLoading] = useState(false);
  const dic = useLocalization();
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector(selectBookmarksData);

  const handleAddBookmark = (item: TNewsItem) => {
    dispatch(
      doAddBookmark({
        id: uuidv4(),
        title: item.title,
        link: item.link,
        created: item.created,
      })
    );
  };

  const handleRemoveBookmark = (item: TNewsItem) => {
    dispatch(doRemoveBookmark(item.link));
  };

  const handleRefresh = useCallback(() => {
    fetchNews(provider.id, setNews, setIsLoading);
  }, [provider.id]);

  const handleHideProvider = () => {
    dispatch(doRemoveProvider(provider.id));
  };

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  return (
    <li className="widget">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>{provider.name}</h3>
        <div className="d-flex align-items-center">
          <IconButton
            icon="eye-off"
            title={dic.hideProvider}
            onClick={handleHideProvider}
            className="mr-2"
          />
          <IconButton
            icon="arrows-cw"
            title={dic.refresh}
            onClick={handleRefresh}
            className={isLoading ? 'animation-rotate' : ''}
          />
        </div>
      </div>
      {isLoading && <Skeleton />}
      {isEmpty(news) && !isLoading && <div>{dic.noNews}</div>}
      {!isEmpty(news) && !isLoading && (
        <ul className="item-list">
          {news.map((item: TNewsItem) => (
            <Item
              key={item.link}
              item={item}
              isBookmarked={checkIfBookmarked(bookmarks, item)}
              onAddBookmark={handleAddBookmark}
              onRemoveBookmark={handleRemoveBookmark}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Widget;
