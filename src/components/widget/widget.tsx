import { useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  useAppDispatch,
  useAppSelector,
  useLocalization,
  useAnimation,
} from '@hooks';
import { Card } from '@components/ui';
import { Skeleton } from '@components';
import { TNews, TNewsItem } from '@types';
import { selectBookmarksData } from '@store/selectors';
import {
  doAddBookmark,
  doRemoveBookmark,
  doRemoveProvider,
} from '@store/actions';

import { Item } from './item';
import { fetchNews, checkIfBookmarked, getConfig } from './widget.utils';
import { TWidgetProps } from './widget.types';

import './widget.scss';

function Widget({ provider }: TWidgetProps) {
  const [news, setNews] = useState([] as TNews);
  const [isLoading, setIsLoading] = useState(false);
  const dic = useLocalization();
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector(selectBookmarksData);
  const isAnimationEnabled = useAnimation();

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

  const controlsConfig = getConfig({
    dic,
    handleRefresh,
    handleHideProvider,
    showAnimation: isAnimationEnabled && isLoading,
  });

  return (
    <Card title={provider.name} controlsConfig={controlsConfig}>
      {isLoading && <Skeleton />}
      {!isLoading && (
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
    </Card>
  );
}

export default Widget;
