import { Fragment } from 'react';

import { useAppSelector } from '@hooks';
import { selectBookmarksData } from '@store/selectors';
import { EViewMode, TNewsItem } from '@types';

import NewsListItem from './news-list-item';
import { checkIfBookmarked } from './news-list.utils';

interface IProps {
  data: Record<string, TNewsItem[]>;
  providerId: string;
  onAddBookmark: (item: TNewsItem) => void;
  onRemoveBookmark: (item: TNewsItem) => void;
  viewMode?: EViewMode;
}

function NewsList(props: IProps) {
  const {
    data,
    providerId,
    onAddBookmark,
    onRemoveBookmark,
    viewMode = EViewMode.TitleOnly,
  } = props;
  const bookmarks = useAppSelector(selectBookmarksData);

  return (
    <ul>
      {Object.keys(data).map((date) => (
        <Fragment key={`${providerId}-${date}`}>
          <li
            className="text-secondary font-bold text-sm bg-surface sticky top-0 z-10 pb-3"
            key={`${providerId}-${date}`}
          >
            {date}
          </li>
          {data[date].map((item: TNewsItem) => (
            <NewsListItem
              key={item.link}
              data={item}
              bookmarked={checkIfBookmarked(bookmarks, item)}
              viewMode={viewMode}
              onAddBookmark={onAddBookmark}
              onRemoveBookmark={onRemoveBookmark}
            />
          ))}
        </Fragment>
      ))}
    </ul>
  );
}

export default NewsList;
