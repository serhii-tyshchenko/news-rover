import { useCallback, useMemo, useState } from 'react';

import { isEmpty } from 'lodash';

import { NewsList, Skeleton } from '@components';
import { Button, Card } from '@components/ui';
import { DEFAULT_POSTS_LIMIT } from '@constants';
import {
  useAnimation,
  useAppDispatch,
  useAppSelector,
  useLocalization,
} from '@hooks';
import {
  doAddBookmark,
  doRemoveBookmark,
  doRemoveProvider,
  doUpdateProvider,
} from '@store/actions';
import { selectProviderById, selectSettingsData } from '@store/selectors';
import { EControlSize, TNewsItem } from '@types';
import { groupDataByDay } from '@utils';

import { useNewsProviderData } from './news-card.queries';
import { INewsCardProps } from './news-card.types';
import { changeViewMode, getConfig } from './news-card.utils';

function NewsCard({ provider }: INewsCardProps) {
  const dic = useLocalization();
  const dispatch = useAppDispatch();
  const { autorefresh, autorefreshInterval } =
    useAppSelector(selectSettingsData);
  const providerSettings = useAppSelector(selectProviderById(provider.id));
  const isAnimationEnabled = useAnimation();

  const [limit, setLimit] = useState(DEFAULT_POSTS_LIMIT);

  const {
    isLoading,
    data: providerData,
    error,
    refetch,
    isFetching,
  } = useNewsProviderData({
    url: provider.url,
    limit,
    autorefresh,
    autorefreshInterval,
  });

  const handleAddBookmark = (item: TNewsItem) => {
    dispatch(doAddBookmark(item));
  };

  const handleRemoveBookmark = (item: TNewsItem) => {
    dispatch(doRemoveBookmark(item.link));
  };

  const handleRefresh = useCallback(() => {
    setLimit(DEFAULT_POSTS_LIMIT);
    refetch();
  }, [refetch]);

  const handleViewModeChange = useCallback(() => {
    dispatch(
      doUpdateProvider(provider.id, {
        viewMode: changeViewMode(providerSettings?.viewMode),
      }),
    );
  }, [dispatch, provider.id, providerSettings?.viewMode]);

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
    onViewModeClick: handleViewModeChange,
    showAnimation: isAnimationEnabled && isDataLoading,
    viewMode: providerSettings?.viewMode,
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
        <div className="flex items-center justify-center h-full p-2 text-center color-danger">
          {dic.genericError}
        </div>
      )}
      {shouldShowEmptyState && (
        <div className="flex items-center justify-center text-center grow">
          {dic.noNews}
        </div>
      )}
      {shouldShowContent && (
        <div className="overflow-y-auto scrollbar-none">
          <NewsList
            providerId={provider.id}
            data={groupedData}
            onAddBookmark={handleAddBookmark}
            onRemoveBookmark={handleRemoveBookmark}
          />
          {shouldShowLoadMoreButton && (
            <Button
              onClick={handleLoadMoreClick}
              size={EControlSize.Small}
              btnType="action"
              className="block mx-auto"
            >
              {dic.loadMore}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}

export default NewsCard;
