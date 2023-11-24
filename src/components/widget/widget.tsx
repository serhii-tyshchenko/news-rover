import { useEffect, useCallback } from 'react';
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
  selectBookmarksData,
  selectProviderData,
  selectProviderIsLoading,
} from '@store/selectors';
import {
  doAddBookmark,
  doRemoveBookmark,
  doRemoveProvider,
  doGetProviderNews,
} from '@store/actions';

import { Item } from './item';
import { checkIfBookmarked, getConfig } from './widget.utils';
import { TWidgetProps } from './widget.types';

import './widget.scss';

function Widget({ provider }: TWidgetProps) {
  const dic = useLocalization();

  const dispatch = useAppDispatch();

  const bookmarks = useAppSelector(selectBookmarksData);
  const providerData = useAppSelector(selectProviderData(provider.id));
  const isLoading = useAppSelector(selectProviderIsLoading(provider.id));

  const isAnimationEnabled = useAnimation();

  const handleAddBookmark = (item: TNewsItem) => {
    dispatch(
      doAddBookmark({
        id: uuidv4(),
        ...item,
      })
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

  return (
    <Card title={provider.name} controlsConfig={controlsConfig}>
      {isLoading && <Skeleton />}
      {!isLoading && (
        <ul className="item-list">
          {providerData.map((item: TNewsItem) => (
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
