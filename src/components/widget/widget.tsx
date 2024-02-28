import { useEffect, useCallback } from 'react';
import { isEmpty, groupBy } from 'lodash';
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

import { Item } from './item';
import { checkIfBookmarked, getConfig, getDateLabel } from './widget.utils';
import { TWidgetProps } from './widget.types';

import './widget.scss';

function Widget({ provider }: TWidgetProps) {
  const dic = useLocalization();

  const dispatch = useAppDispatch();

  const bookmarks = useAppSelector(selectBookmarksData);
  const providerData = useAppSelector(selectProviderData(provider.id));
  const groupByDay = groupBy(
    providerData.toSorted((a, b) => b.created - a.created),
    (item: TNewsItem) => new Date(item.created).toLocaleDateString(),
  );

  const isLoading = useAppSelector(selectProviderIsLoading(provider.id));
  const error = useAppSelector(selectProviderError(provider.id));

  const isAnimationEnabled = useAnimation();

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
    dispatch(doGetProviderNews(provider.id));
  }, [provider.id]);

  const handleHideProvider = () => {
    dispatch(doRemoveProvider(provider.id));
  };

  useEffect(() => {
    if (isEmpty(providerData)) {
      dispatch(doGetProviderNews(provider.id));
    }
  }, [provider.id]);

  const controlsConfig = getConfig({
    dic,
    handleRefresh,
    handleHideProvider,
    showAnimation: isAnimationEnabled && isLoading,
  });

  const shouldShowContent = !isLoading && isEmpty(error);
  const shouldShowError = !isLoading && !isEmpty(error);

  return (
    <Card title={provider.name} controlsConfig={controlsConfig}>
      {isLoading && <Skeleton />}
      {shouldShowError && (
        <div className="d-flex align-items-center justify-content-center h-100 p-2 text-center">
          {dic.genericError}
        </div>
      )}
      {shouldShowContent && (
        <ul className="item-list">
          {Object.keys(groupByDay).map((date) => (
            <>
              <li
                className="color-secondary font-weight-bold small mb-3"
                key={`${provider.name}-${date}`}
              >
                {getDateLabel(new Date(date), dic)}
              </li>
              {groupByDay[date].map((item: TNewsItem) => (
                <Item
                  key={item.link}
                  item={item}
                  isBookmarked={checkIfBookmarked(bookmarks, item)}
                  onAddBookmark={handleAddBookmark}
                  onRemoveBookmark={handleRemoveBookmark}
                />
              ))}
            </>
          ))}
        </ul>
      )}
    </Card>
  );
}

export default Widget;
