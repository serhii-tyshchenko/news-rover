import { isEmpty } from 'lodash';
import { selectBookmarksData } from '@store/selectors';
import { doRemoveBookmark } from '@store/actions';
import { useAppSelector, useAppDispatch, useLocalization } from '@hooks';
import { Card, CardList } from '@components/ui';
import { NewsList } from '@components';
import { BaseLayout } from '@layout';
import { groupDataByDay } from '@utils';
import { TNewsItem } from '@types';
import { noop } from '@constants';

function BookmarksPage() {
  const dispatch = useAppDispatch();
  const dic = useLocalization();
  const bookmarks = useAppSelector(selectBookmarksData);

  const handleRemoveBookmark = (item: TNewsItem) => {
    dispatch(doRemoveBookmark(item.link));
  };

  return (
    <BaseLayout>
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
    </BaseLayout>
  );
}

export default BookmarksPage;
