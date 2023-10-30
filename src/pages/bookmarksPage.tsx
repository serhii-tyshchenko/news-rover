import { selectBookmarksData } from 'store/selectors';

import { useAppSelector, useAppDispatch } from 'common/hooks';
import { doRemoveBookmark } from 'store/actions';
import { IconButton } from 'components/atoms';

import { isEmpty } from 'common/utils';

import { BaseLayout } from 'layout';

const formatTime = (date: Date) => {
  const rawDate = new Date(date);
  const hours = rawDate.getHours().toString().padStart(2, '0');
  const minutes = rawDate.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

function BookmarksPage() {
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector(selectBookmarksData);
  const handleClick = (link: string) => {
    dispatch(doRemoveBookmark(link));
  };

  return (
    <BaseLayout>
      {isEmpty(bookmarks) && (
        <div className="text-align-center">No bookmarks added.</div>
      )}
      {!isEmpty(bookmarks) && (
        <ul className="item-list" style={{ padding: '0.25rem' }}>
          {bookmarks.map((item: any) => (
            <li className="item" key={item.id}>
              <div className="d-flex">
                <span className="mr-1 color-secondary">
                  {formatTime(item.created)}
                </span>
                <IconButton
                  icon="bookmark"
                  title="Remove bookmark"
                  onClick={() => handleClick(item.link)}
                  size="small"
                  className="mr-1"
                />
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="color-primary mr-1"
                >
                  {item.title}
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </BaseLayout>
  );
}

export default BookmarksPage;
