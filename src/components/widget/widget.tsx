import { useEffect, useCallback, useState } from 'react';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import {
  useAppDispatch,
  useAppSelector,
  useLocalization,
  useAnimation,
} from '@hooks';
import { Card, Button } from '@components/ui';
import { Skeleton } from '@components';
import { TNewsItem } from '@types';
import {
  selectBookmarksData,
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

import { Item } from './item';
import {
  checkIfBookmarked,
  getConfig,
  getDateLabel,
  groupDataByDay,
} from './widget.utils';
import { TWidgetProps } from './widget.types';

import './widget.scss';

function Widget({ provider }: TWidgetProps) {
  const dic = useLocalization();
  const [limit, setLimit] = useState(DEFAULT_POSTS_LIMIT);

  const dispatch = useAppDispatch();

  const bookmarks = useAppSelector(selectBookmarksData);
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

  const shouldShowContent = !loading && isEmpty(error);
  const shouldShowLoadMoreButton =
    !loading && !isEmpty(providerData) && limit <= providerData.length;
  const shouldShowError = !loading && !isEmpty(error);

  return (
    <Card title={provider.name} controlsConfig={controlsConfig}>
      {loading && <Skeleton />}
      {shouldShowError && (
        <div className="d-flex align-items-center justify-content-center h-100 p-2 text-center">
          {dic.genericError}
        </div>
      )}
      {shouldShowContent && (
        <ul className="item-list">
          {Object.keys(groupedData).map((date) => (
            <>
              <li
                className="color-secondary font-weight-bold small mb-3"
                key={`${provider.name}-${date}`}
              >
                {getDateLabel(new Date(date), dic)}
              </li>
              {groupedData[date].map((item: TNewsItem) => (
                <Item
                  key={item.link}
                  item={item}
                  bookmarked={checkIfBookmarked(bookmarks, item)}
                  onAddBookmark={handleAddBookmark}
                  onRemoveBookmark={handleRemoveBookmark}
                />
              ))}
            </>
          ))}
          {shouldShowLoadMoreButton && (
            <li className="text-center" key="button">
              <Button
                onClick={handleLoadMoreClick}
                size="small"
                btnType="action"
              >
                {dic.loadMore}
              </Button>
            </li>
          )}
        </ul>
      )}
    </Card>
  );
}

export default Widget;
