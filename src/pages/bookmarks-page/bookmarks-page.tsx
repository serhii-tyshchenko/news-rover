import { selectBookmarksData } from 'store/selectors';
import { doRemoveBookmark } from 'store/actions';
import { useAppSelector, useAppDispatch, useLocalization } from 'common/hooks';
import { isEmpty } from 'lodash';
import { IconButton } from 'components/atoms';
import { BaseLayout } from 'layout';

import { formatTime } from './bookmarks-page.utils';

function BookmarksPage() {
  const dispatch = useAppDispatch();
  const dic = useLocalization();
  const bookmarks = useAppSelector(selectBookmarksData);
  const handleClick = (link: string) => {
    dispatch(doRemoveBookmark(link));
  };

  return (
    <BaseLayout>
      <section className="widget h-100">
        <h3 className="mb-4">{dic.bookmarks}</h3>
        {isEmpty(bookmarks) && (
          <div className="text-align-center">{dic.noBookmarks}</div>
        )}
        {!isEmpty(bookmarks) && (
          <ul className="bookmark-list">
            {bookmarks.map((item: any) => (
              <li className="item" key={item.id}>
                <span className="mr-2 color-secondary">
                  {formatTime(item.created)}
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
          </ul>
        )}
      </section>
    </BaseLayout>
  );
}

export default BookmarksPage;
