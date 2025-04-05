import { isEmpty } from 'lodash';
import { selectBookmarksData } from '@store/selectors';
import { doRemoveBookmark } from '@store/actions';
import { useAppSelector, useAppDispatch, useLocalization } from '@hooks';
import { Card, CardList } from '@components/ui';
import { NewsList } from '@components';
import { BaseLayout } from '@layout';
import { groupDataByDay } from '@utils';
import { TNewsItem } from '@types';

function BookmarksPage() {
  const dispatch = useAppDispatch();
  const dic = useLocalization();
  const bookmarks = useAppSelector(selectBookmarksData);
  const handleClick = (item: TNewsItem) => {
    dispatch(doRemoveBookmark(item.link));
  };

  return (
    <BaseLayout>
      <CardList>
        <Card title={dic.bookmarks}>
          {isEmpty(bookmarks) && (
            <div className="d-flex align-items-center justify-content-center text-center flex-grow-1">
              {dic.noBookmarks}
            </div>
          )}
          {!isEmpty(bookmarks) && (
            <NewsList
              data={groupDataByDay(bookmarks)}
              onRemoveBookmark={handleClick}
            />
          )}
        </Card>
      </CardList>
    </BaseLayout>
  );
}

export default BookmarksPage;
