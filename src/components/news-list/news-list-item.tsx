import NotFound from '~assets/images/not-found.png';

import { isEmpty } from 'lodash';

import { IconButton } from '@components';
import { useLocalization } from '@hooks';
import { EControlSize, EViewMode, TNewsItem } from '@types';
import { formatTime, getClassName, isWithinLastHour } from '@utils';

import './news-list-item.styles.scss';

interface INewsListItemProps {
  data: TNewsItem;
  bookmarked: boolean;
  viewMode: EViewMode;
  onAddBookmark: (item: TNewsItem) => void;
  onRemoveBookmark: (item: TNewsItem) => void;
}

function NewsListItem(props: INewsListItemProps) {
  const { data, bookmarked, viewMode, onAddBookmark, onRemoveBookmark } = props;
  const {
    title,
    link: url,
    thumbnail: thumbnailUrl,
    created,
    description,
  } = data;

  const dic = useLocalization();

  const handleBookmarkClick = () =>
    bookmarked ? onRemoveBookmark(data) : onAddBookmark(data);

  const handleShareClick = () => {
    navigator.share({ title, url });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = NotFound;
  };

  const itemTime = formatTime(created);
  const bookmarkIcon = bookmarked ? 'bookmark' : 'bookmark-empty';
  const bookmarkTitle = bookmarked ? dic.removeBookmark : dic.addBookmark;

  const isShareSupported = !!navigator.share;
  const isTitleWithDescriptionMode =
    viewMode === EViewMode.TitleWithDescription;
  const isThumbnailMode = viewMode === EViewMode.TitleWithThumbnail;
  const isFullMode = viewMode === EViewMode.Full;
  const shouldShowThumbnail =
    !isEmpty(thumbnailUrl) && (isFullMode || isThumbnailMode);
  const shouldShowDescription =
    !isEmpty(description) && (isFullMode || isTitleWithDescriptionMode);
  const isFresh = isWithinLastHour(created);

  return (
    <li className="news-list-item">
      {shouldShowThumbnail && (
        <a href={url} target="_blank" rel="noreferrer" className="block mb-1">
          <img
            src={thumbnailUrl ?? ''}
            alt={title}
            className="w-full rounded-sm"
            loading="lazy"
            onError={handleImageError}
          />
        </a>
      )}
      <div
        className={getClassName('flex gap-2', {
          'font-semibold': isFresh,
        })}
      >
        <span className="color-secondary">{itemTime}</span>
        <div className="flex flex-col gap-1 overflow-hidden">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="color-primary overflow-hidden text-ellipsis"
          >
            {title}
          </a>
          {shouldShowDescription && (
            <p className="color-secondary text-sm text-ellipsis overflow-x-auto">
              {data.description}
            </p>
          )}
        </div>
        <div className="flex ml-auto shrink-0 gap-1">
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
