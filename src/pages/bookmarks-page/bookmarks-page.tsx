import { isEmpty } from 'lodash';

import { NewsList } from '@components';
import { Card } from '@components/ui';
import { noop } from '@constants';
import { useAppDispatch, useAppSelector, useLocalization } from '@hooks';
import { doRemoveBookmark } from '@store/actions';
import { selectBookmarksData } from '@store/selectors';
import { TNewsItem } from '@types';
import { groupDataByDay } from '@utils';

function BookmarksPage() {
  const dispatch = useAppDispatch();
  const dic = useLocalization();
  const bookmarks = useAppSelector(selectBookmarksData);

  const handleRemoveBookmark = (item: TNewsItem) => {
    dispatch(doRemoveBookmark(item.link));
  };

  return (
    <Card title={dic.bookmarks}>
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
          />
        </div>
      )}
    </Card>
  );
}

export default BookmarksPage;
