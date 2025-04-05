import { Fragment } from 'react';
import { useLocalization, useAppSelector } from '@hooks';
import { Button } from '@components/ui';
import { EControlSize, TNewsItem } from '@types';
import { selectBookmarksData, selectLocale } from '@store/selectors';
import { getDateLabel } from '@utils';

import { checkIfBookmarked } from './news-list.utils';
import NewsListItem from './news-list-item';

interface IProps {
  data: Record<string, TNewsItem[]>;
  providerId: string;
  onAddBookmark: (item: TNewsItem) => void;
  onRemoveBookmark: (item: TNewsItem) => void;
  onLoadMoreClick?: () => void;
  showLoadMoreButton?: boolean;
}

function NewsList(props: IProps) {
  const {
    data,
    providerId,
    onAddBookmark,
    onRemoveBookmark,
    onLoadMoreClick,
    showLoadMoreButton = false,
  } = props;
  const dic = useLocalization();
  const bookmarks = useAppSelector(selectBookmarksData);
  const locale = useAppSelector(selectLocale);

  return (
    <ul className="news-list pr-1 flex-grow-1 overflow-y-auto">
      {Object.keys(data).map((date) => (
        <Fragment key={`${providerId}-${date}`}>
          <li
            className="color-secondary font-weight-bold small mb-3"
            key={`${providerId}-${date}`}
          >
            {getDateLabel(new Date(date), dic, locale)}
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
        </Fragment>
      ))}
      {showLoadMoreButton && (
        <li className="text-center" key={`${providerId}-load-more`}>
          <Button
            onClick={onLoadMoreClick}
            size={EControlSize.Small}
            btnType="action"
          >
            {dic.loadMore}
          </Button>
        </li>
      )}
    </ul>
  );
}

export default NewsList;
