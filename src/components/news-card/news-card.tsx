import { useCallback, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import {
  useAppDispatch,
  useAppSelector,
  useLocalization,
  useAnimation,
} from '@hooks';
import { selectSettingsData } from '@store/selectors';
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

function NewsCard({ provider }: INewsCardProps) {
  const dic = useLocalization();
  const dispatch = useAppDispatch();
  const { autorefresh } = useAppSelector(selectSettingsData);
  const isAnimationEnabled = useAnimation();

  const [limit, setLimit] = useState(DEFAULT_POSTS_LIMIT);

  const {
    isLoading,
    data: providerData,
    error,
    refetch,
    isFetching,
  } = useNewsProviderData(provider.url, limit, autorefresh);

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

  const shouldShowSkeleton = isDataLoading;
  const shouldShowError = !isDataLoading && !!error;
  const shouldShowEmptyState =
    !isDataLoading && !error && isEmpty(providerData?.data);
  const shouldShowContent =
    !shouldShowSkeleton && !error && !isEmpty(providerData?.data);

  const groupedData = useMemo(
    () => groupDataByDay(providerData?.data ?? []),
    [providerData?.data],
  );

  return (
    <Card title={provider.name} controlsConfig={controlsConfig}>
      {shouldShowSkeleton && (
        <Skeleton animated={isAnimationEnabled} count={DEFAULT_POSTS_LIMIT} />
      )}
      {shouldShowError && (
        <div className="d-flex align-items-center justify-content-center h-100 p-2 text-center text-danger">
          {dic.genericError}
        </div>
      )}
      {shouldShowEmptyState && (
        <div className="d-flex align-items-center justify-content-center text-center flex-grow-1">
          {dic.noNews}
        </div>
      )}
      {shouldShowContent && (
        <NewsList
          providerId={provider.id}
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
