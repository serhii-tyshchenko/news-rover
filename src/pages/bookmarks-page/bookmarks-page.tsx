import { isEmpty } from 'lodash';
import { selectBookmarksData } from '@store/selectors';
import { doRemoveBookmark } from '@store/actions';
import { useAppSelector, useAppDispatch, useLocalization } from '@hooks';
import { formatDate } from '@utils';
import { IconButton } from '@components/ui';
import { BaseLayout } from '@layout';

function BookmarksPage() {
  const dispatch = useAppDispatch();
  const dic = useLocalization();
  const bookmarks = useAppSelector(selectBookmarksData);
  const handleClick = (link: string) => {
    dispatch(doRemoveBookmark(link));
  };

  return (
    <BaseLayout>
      <div className="widget">
        <h3 className="mb-4">{dic.bookmarks}</h3>
        {isEmpty(bookmarks) && (
          <div className="d-flex align-items-center justify-content-center text-align-center flex-grow-1">
            {dic.noBookmarks}
          </div>
        )}
        {!isEmpty(bookmarks) && (
          <section className="bookmark-list">
            {bookmarks.map((item: any) => (
              <li className="item" key={item.id}>
                <span className="mr-2 color-secondary">
                  {formatDate(item.created)}
                </span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="color-primary mr-1"
                >
                  {item.title}
                </a>
                <IconButton
                  icon="bookmark"
                  title={dic.removeBookmark}
                  onClick={() => handleClick(item.link)}
                  className="ml-auto"
                />
              </li>
            ))}
          </section>
        )}
      </div>
    </BaseLayout>
  );
}

export default BookmarksPage;
