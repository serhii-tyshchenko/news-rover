import { useCallback, useState } from 'react';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from 'react-query';
import { useAppDispatch, useLocalization, useAnimation } from '@hooks';
import { getNewsByProvider } from '@core/api';
import { Card } from '@components/ui';
import { Skeleton, NewsList } from '@components';
import { TNewsItem } from '@types';
import { groupDataByDay } from '@utils';
import {
  doAddBookmark,
  doRemoveBookmark,
  doRemoveProvider,
} from '@store/actions';
import { DEFAULT_POSTS_LIMIT } from '@constants';

import { useNewsProviderData } from './news-card.queries';
import { getConfig } from './news-card.utils';
import { INewsCardProps } from './news-card.types';

import './news-card.styles.scss';

function NewsCard({ provider }: INewsCardProps) {
  const dic = useLocalization();
  const dispatch = useAppDispatch();
  const isAnimationEnabled = useAnimation();

  const [limit, setLimit] = useState(DEFAULT_POSTS_LIMIT);

  const {
    isLoading,
    data: providerData,
    error,
    refetch,
    isFetching,
  } = useNewsProviderData(provider.id, limit);

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
    refetch();
  }, [refetch]);

  const handleHideProvider = () => {
    dispatch(doRemoveProvider(provider.id));
  };

  const handleLoadMoreClick = () => {
    setLimit((prev) => prev + 10);
  };

  const isDataLoading = isLoading || isFetching;

  const controlsConfig = getConfig({
    dic,
    handleRefresh,
    handleHideProvider,
    showAnimation: isAnimationEnabled && isDataLoading,
  });

  const shouldShowLoadMoreButton =
    !isEmpty(providerData?.data) && limit <= (providerData?.count ?? 0);

  return (
    <Card title={provider.name} controlsConfig={controlsConfig}>
      {isDataLoading && (
        <Skeleton animated={isAnimationEnabled} count={DEFAULT_POSTS_LIMIT} />
      )}
      {!isDataLoading && !isEmpty(error) && (
        <div className="d-flex align-items-center justify-content-center h-100 p-2 text-center text-danger">
          {dic.genericError}
        </div>
      )}
      {!isDataLoading && isEmpty(error) && (
        <NewsList
          data={groupDataByDay(providerData?.data ?? [])}
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
