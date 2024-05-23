import { useEffect, useCallback, useState } from 'react';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import {
  useAppDispatch,
  useAppSelector,
  useLocalization,
  useAnimation,
} from '@hooks';
import { Card } from '@components/ui';
import { Skeleton } from '@components';
import { TNewsItem } from '@types';
import {
  selectProviderData,
  selectProviderIsLoading,
  selectProviderError,
} from '@store/selectors';
import {
  doAddBookmark,
  doRemoveBookmark,
  doRemoveProvider,
  doGetProviderNews,
} from '@store/actions';
import { DEFAULT_POSTS_LIMIT } from '@constants';

import NewsList from './news-list';
import { getConfig, groupDataByDay } from './news-card.utils';
import { INewsCardProps } from './news-card.types';

import './news-card.styles.scss';

function NewsCard({ provider }: INewsCardProps) {
  const dic = useLocalization();
  const [limit, setLimit] = useState(DEFAULT_POSTS_LIMIT);

  const dispatch = useAppDispatch();

  const providerData = useAppSelector(selectProviderData(provider.id));
  const loading = useAppSelector(selectProviderIsLoading(provider.id));
  const error = useAppSelector(selectProviderError(provider.id));
  const groupedData = groupDataByDay(providerData);

  useEffect(() => {
    if (isEmpty(providerData)) {
      dispatch(doGetProviderNews(provider.id));
    }
  }, [provider.id]);

  useEffect(() => {
    if (limit > DEFAULT_POSTS_LIMIT) {
      dispatch(doGetProviderNews(provider.id, limit));
    }
  }, [limit]);

  const animationEnabled = useAnimation();

  const handleAddBookmark = (item: TNewsItem) => {
    dispatch(
      doAddBookmark({
        id: uuidv4(),
        ...item,
      }),
    );
  };

  const handleRemoveBookmark = (item: TNewsItem) => {
    dispatch(doRemoveBookmark(item.link));
  };

  const handleRefresh = useCallback(() => {
    setLimit(DEFAULT_POSTS_LIMIT);
    dispatch(doGetProviderNews(provider.id));
  }, [provider.id]);

  const handleHideProvider = () => {
    dispatch(doRemoveProvider(provider.id));
  };

  const handleLoadMoreClick = () => {
    setLimit((prev) => prev + 10);
  };

  const controlsConfig = getConfig({
    dic,
    handleRefresh,
    handleHideProvider,
    showAnimation: animationEnabled && loading,
  });

  const shouldShowLoadMoreButton =
    !loading && !isEmpty(providerData) && limit <= providerData.length;

  return (
    <Card title={provider.name} controlsConfig={controlsConfig}>
      {loading && <Skeleton />}
      {!loading && !isEmpty(error) && (
        <div className="d-flex align-items-center justify-content-center h-100 p-2 text-center">
          {dic.genericError}
        </div>
      )}
      {!loading && isEmpty(error) && (
        <NewsList
          data={groupedData}
          onAddBookmark={handleAddBookmark}
          onRemoveBookmark={handleRemoveBookmark}
          onLoadMoreClick={handleLoadMoreClick}
          showLoadMoreButton={shouldShowLoadMoreButton}
        />
      )}
    </Card>
  );
}

export default NewsCard;
