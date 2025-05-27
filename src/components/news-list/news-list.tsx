import { Fragment } from 'react';

import { useAppSelector, useLocalization } from '@hooks';
import {
  selectBookmarksData,
  selectLocale,
  selectProviderById,
} from '@store/selectors';
import { TNewsItem } from '@types';
import { getDateLabel } from '@utils';

import NewsListItem from './news-list-item';
import { checkIfBookmarked } from './news-list.utils';

interface IProps {
  data: Record<string, TNewsItem[]>;
  providerId: string;
  onAddBookmark: (item: TNewsItem) => void;
  onRemoveBookmark: (item: TNewsItem) => void;
}

function NewsList(props: IProps) {
  const { data, providerId, onAddBookmark, onRemoveBookmark } = props;
  const dic = useLocalization();
  const bookmarks = useAppSelector(selectBookmarksData);
  const locale = useAppSelector(selectLocale);
  const providerSettings = useAppSelector(selectProviderById(providerId));

  return (
    <ul>
      {Object.keys(data).map((date) => (
        <Fragment key={`${providerId}-${date}`}>
          <li
            className="color-secondary font-bold text-sm mb-3"
            key={`${providerId}-${date}`}
          >
            {getDateLabel(new Date(date), dic, locale)}
          </li>
          {data[date].map((item: TNewsItem) => (
            <NewsListItem
              key={item.link}
              data={item}
              bookmarked={checkIfBookmarked(bookmarks, item)}
              viewMode={providerSettings?.viewMode}
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
