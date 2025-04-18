import { useCallback, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import {
  useAppDispatch,
  useAppSelector,
  useLocalization,
  useAnimation,
} from '@hooks';
import { selectSettingsData, selectProviderById } from '@store/selectors';
import { Card, Button } from '@components/ui';
import { Skeleton, NewsList } from '@components';
import { TNewsItem, EControlSize, EViewMode } from '@types';
import { groupDataByDay } from '@utils';
import {
  doAddBookmark,
  doRemoveBookmark,
  doRemoveProvider,
  doUpdateProvider,
} from '@store/actions';
import { DEFAULT_POSTS_LIMIT } from '@constants';

import { useNewsProviderData } from './news-card.queries';
import { getConfig, changeViewMode } from './news-card.utils';
import { INewsCardProps } from './news-card.types';

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
        <div className="pr-1 overflow-y-auto">
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
