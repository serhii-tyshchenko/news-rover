import { Fragment } from 'react';

import { useAppSelector, useLocalization } from '@hooks';
import { selectBookmarksData, selectLocale } from '@store/selectors';
import { EViewMode, TNewsItem } from '@types';
import { getDateLabel } from '@utils';

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
  const dic = useLocalization();
  const bookmarks = useAppSelector(selectBookmarksData);
  const locale = useAppSelector(selectLocale);

  return (
    <ul>
      {Object.keys(data).map((date) => (
        <Fragment key={`${providerId}-${date}`}>
          <li
            className="color-secondary font-bold text-sm background-secondary sticky top-0 z-10 pb-3"
            key={`${providerId}-${date}`}
          >
            {getDateLabel(new Date(date), dic, locale)}
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
