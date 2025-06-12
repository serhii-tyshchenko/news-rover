import { isEmpty } from 'lodash';

import { Card, NewsList } from '@components';
import { noop } from '@constants';
import { useAppDispatch, useAppSelector, useLocalization } from '@hooks';
import { doRemoveBookmark, doUpdateBookmarksViewMode } from '@store/actions';
import { selectBookmarksData, selectBookmarksViewMode } from '@store/selectors';
import { EViewMode, TNewsItem } from '@types';
import { changeViewMode, groupDataByDay } from '@utils';

import { getControlsConfig } from './bookmarks-page.utils';

function BookmarksPage() {
  const dispatch = useAppDispatch();
  const dic = useLocalization();

  const bookmarks = useAppSelector(selectBookmarksData);
  const viewMode = useAppSelector(selectBookmarksViewMode);

  const handleRemoveBookmark = (item: TNewsItem) => {
    dispatch(doRemoveBookmark(item.link));
  };

  const onViewModeClick = () =>
    dispatch(
      doUpdateBookmarksViewMode(
        changeViewMode(viewMode ?? EViewMode.TitleOnly),
      ),
    );

  const controlsConfig = getControlsConfig({
    dic,
    onViewModeClick,
    viewMode,
  });

  return (
    <Card title={dic.bookmarks} controlsConfig={controlsConfig}>
      {isEmpty(bookmarks) && (
        <div className="flex items-center justify-center text-center grow">
          {dic.noBookmarks}
        </div>
      )}
      {!isEmpty(bookmarks) && (
        <div className="overflow-y-auto scrollbar-none">
          <NewsList
            providerId="bookmarks"
            data={groupDataByDay(bookmarks)}
            onAddBookmark={noop}
            onRemoveBookmark={handleRemoveBookmark}
            viewMode={viewMode ?? EViewMode.TitleOnly}
          />
        </div>
      )}
    </Card>
  );
}

export default BookmarksPage;
