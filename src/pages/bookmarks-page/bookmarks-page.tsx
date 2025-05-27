import { isEmpty } from 'lodash';

import { NewsList } from '@components';
import { Card, CardList } from '@components/ui';
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
    <CardList>
      <Card title={dic.bookmarks}>
        {isEmpty(bookmarks) && (
          <div className="flex items-center justify-center text-center grow">
            {dic.noBookmarks}
          </div>
        )}
        {!isEmpty(bookmarks) && (
          <NewsList
            providerId="bookmarks"
            data={groupDataByDay(bookmarks)}
            onAddBookmark={noop}
            onRemoveBookmark={handleRemoveBookmark}
          />
        )}
      </Card>
    </CardList>
  );
}

export default BookmarksPage;
