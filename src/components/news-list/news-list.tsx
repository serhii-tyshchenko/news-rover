import { useLocalization, useAppSelector } from '@hooks';
import { Button } from '@components/ui';
import { TNewsItem } from '@types';
import { selectBookmarksData } from '@store/selectors';
import { checkIfBookmarked, getDateLabel } from './news-list.utils';
import NewsListItem from './news-list-item';

import './news-list.styles.scss';

interface INewsListProps {
  data: Record<string, TNewsItem[]>;
  onAddBookmark?: (item: TNewsItem) => void;
  onRemoveBookmark: (item: TNewsItem) => void;
  onLoadMoreClick?: () => void;
  showLoadMoreButton?: boolean;
}

function NewsList(props: INewsListProps) {
  const {
    data,
    onAddBookmark,
    onRemoveBookmark,
    onLoadMoreClick,
    showLoadMoreButton = false,
  } = props;
  const dic = useLocalization();
  const bookmarks = useAppSelector(selectBookmarksData);

  return (
    <ul className="news-list">
      {Object.keys(data).map((date) => (
        <>
          <li
            className="color-secondary font-weight-bold small mb-3"
            key={date}
          >
            {getDateLabel(new Date(date), dic)}
          </li>
          {data[date].map((item: TNewsItem) => (
            <NewsListItem
              key={item.link}
              data={item}
              bookmarked={checkIfBookmarked(bookmarks, item)}
              onAddBookmark={onAddBookmark}
              onRemoveBookmark={onRemoveBookmark}
            />
          ))}
        </>
      ))}
      {showLoadMoreButton && (
        <li className="text-center" key="button">
          <Button onClick={onLoadMoreClick} size="small" btnType="action">
            {dic.loadMore}
          </Button>
        </li>
      )}
    </ul>
  );
}

export default NewsList;
