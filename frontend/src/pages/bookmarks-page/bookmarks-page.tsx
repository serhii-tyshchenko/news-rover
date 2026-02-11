import { isEmpty, noop } from 'lodash-es';

import { Card, NewsList } from '@components';
import { EmptyState } from '@components/ui';
import { useAppDispatch, useAppSelector, useLocalization } from '@hooks';
import { doRemoveBookmark, doUpdateBookmarksViewMode } from '@store/actions';
import {
  selectBookmarksData,
  selectBookmarksViewMode,
  selectLocale,
} from '@store/selectors';
import { EViewMode, TNewsItem } from '@types';
import { changeViewMode, getViewModeIcon, groupDataByDay } from '@utils';

function BookmarksPage() {
  const dispatch = useAppDispatch();
  const dic = useLocalization();

  const bookmarks = useAppSelector(selectBookmarksData);
  const viewMode =
    useAppSelector(selectBookmarksViewMode) ?? EViewMode.TitleOnly;
  const locale = useAppSelector(selectLocale);
  const noData = isEmpty(bookmarks);

  const handleRemoveBookmark = (item: TNewsItem) => {
    dispatch(doRemoveBookmark(item.link));
  };

  const handleViewModeClick = () =>
    dispatch(doUpdateBookmarksViewMode(changeViewMode(viewMode)));

  const controlsConfig = [
    {
      icon: getViewModeIcon(viewMode),
      title: dic.viewMode,
      onClick: handleViewModeClick,
      disabled: noData,
    },
  ];

  if (noData) {
    return <EmptyState>{dic.noBookmarks}</EmptyState>;
  }

  return (
    <Card title={dic.bookmarks} controlsConfig={controlsConfig}>
      <div className="overflow-y-auto scrollbar-none">
        <NewsList
          providerId="bookmarks"
          data={groupDataByDay(bookmarks, dic, locale)}
          onAddBookmark={noop}
          onRemoveBookmark={handleRemoveBookmark}
          viewMode={viewMode}
        />
      </div>
    </Card>
  );
}

export default BookmarksPage;
