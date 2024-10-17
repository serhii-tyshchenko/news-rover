import { isEmpty } from 'lodash';
import { selectSettingsData } from '@store/selectors';
import { useLocalization, useAppSelector } from '@hooks';
import { formatTime } from '@utils';
import { IconButton } from '@components/ui';
import { TNewsItem, EControlSize } from '@types';
import { EThumbnail } from '@constants';

import './news-list-item.styles.scss';

interface INewsListItemProps {
  data: TNewsItem;
  bookmarked: boolean;
  onAddBookmark: (item: TNewsItem) => void;
  onRemoveBookmark: (item: TNewsItem) => void;
}

function NewsListItem(props: INewsListItemProps) {
  const { data, bookmarked, onAddBookmark, onRemoveBookmark } = props;
  const { title, link: url, thumbnail: thumbnailUrl, created } = data;

  const dic = useLocalization();
  const { thumbnail } = useAppSelector(selectSettingsData);

  const handleBookmarkClick = () => {
    bookmarked ? onRemoveBookmark(data) : onAddBookmark(data);
  };

  const handleShareClick = () => {
    navigator.share({ title, url });
  };

  const bookmarkIcon = bookmarked ? 'bookmark' : 'bookmark-empty';
  const bookmarkTitle = bookmarked ? dic.removeBookmark : dic.addBookmark;

  const isShareSupported = !!navigator.share;
  const shouldShowThumbnail =
    thumbnail === EThumbnail.On && !isEmpty(thumbnailUrl);

  return (
    <li className="news-list-item">
      {shouldShowThumbnail && (
        <a href={url} target="_blank" rel="noreferrer" className="d-block mb-1">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-100 rounded"
            loading="lazy"
          />
        </a>
      )}
      <div className="d-flex gap-2">
        <span className="color-secondary">{formatTime(created)}</span>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="color-primary"
        >
          {title}
        </a>
        <div className="d-flex ml-auto flex-shrink-0 gap-1">
          <IconButton
            icon={bookmarkIcon}
            title={bookmarkTitle}
            onClick={handleBookmarkClick}
            size={EControlSize.Small}
            className="btn"
          />
          {isShareSupported && (
            <IconButton
              icon="share"
              title={dic.share}
              onClick={handleShareClick}
              size={EControlSize.Small}
              className="btn"
            />
          )}
        </div>
      </div>
    </li>
  );
}

export default NewsListItem;
