import { useCallback, useMemo, useState } from 'react';

import { isEmpty } from 'lodash-es';

import { Card, NewsList, Skeleton } from '@components';
import { Button, ErrorState } from '@components/ui';
import { DEFAULT_POSTS_LIMIT } from '@constants';
import {
  useAnimation,
  useAppDispatch,
  useAppSelector,
  useLocalization,
} from '@hooks';
import { useProviderNewsData } from '@queries';
import {
  doAddBookmark,
  doRemoveBookmark,
  doRemoveProvider,
  doUpdateProvider,
} from '@store/actions';
import {
  selectLocale,
  selectProviderById,
  selectSettingsData,
} from '@store/selectors';
import { EControlSize, EViewMode, TNewsItem } from '@types';
import { changeViewMode, groupDataByDay } from '@utils';

import { INewsCardProps } from './news-card.types';
import { getControlsConfig } from './news-card.utils';

function NewsCard(props: INewsCardProps) {
  const {
    provider,
    onDragStart,
    onDragEnd,
    onDragOver,
    isDragging,
    draggable,
  } = props;
  const dic = useLocalization();
  const dispatch = useAppDispatch();

  const { autorefresh, autorefreshInterval } =
    useAppSelector(selectSettingsData);
  const providerSettings = useAppSelector(selectProviderById(provider.id));
  const locale = useAppSelector(selectLocale);
  const isAnimationEnabled = useAnimation();
  const viewMode = providerSettings?.viewMode ?? EViewMode.TitleOnly;

  const [limit, setLimit] = useState(DEFAULT_POSTS_LIMIT);

  const {
    isLoading,
    data: providerData,
    error,
    refetch,
    isFetching,
  } = useProviderNewsData({
    id: provider.id,
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
        viewMode: changeViewMode(viewMode),
      }),
    );
  }, [dispatch, provider.id, viewMode]);

  const handleHideProvider = () => {
    dispatch(doRemoveProvider(provider.id));
  };

  const handleLoadMoreClick = () => {
    setLimit((prev) => prev + 10);
  };

  const isDataLoading = isLoading || isFetching;
  const isEmptyData = isEmpty(providerData?.data);

  const shouldShowLoadMoreButton =
    !isEmptyData && limit <= (providerData?.count ?? 0);

  const shouldShowSkeleton = isDataLoading;
  const shouldShowError = !isDataLoading && !!error;
  const shouldShowEmptyState = !isDataLoading && !error && isEmptyData;
  const shouldShowContent = !shouldShowSkeleton && !error && !isEmptyData;

  const controlsConfig = getControlsConfig({
    dic,
    handleRefresh,
    handleHideProvider,
    onViewModeClick: handleViewModeChange,
    showAnimation: isAnimationEnabled,
    isLoading: isDataLoading,
    isEmptyData,
    viewMode,
  });

  const groupedData = useMemo(
    () => groupDataByDay(providerData?.data ?? [], dic, locale),
    [providerData?.data, dic, locale],
  );

  return (
    <Card
      title={provider.name}
      controlsConfig={controlsConfig}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      className={isDragging ? 'opacity-50' : ''}
    >
      {shouldShowSkeleton && (
        <Skeleton animated={isAnimationEnabled} count={DEFAULT_POSTS_LIMIT} />
      )}
      {shouldShowError && <ErrorState>{dic.genericError}</ErrorState>}
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
            viewMode={viewMode}
          />
          {shouldShowLoadMoreButton && (
            <Button
              onClick={handleLoadMoreClick}
              size={EControlSize.Small}
              variant="action"
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
