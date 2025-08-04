import NotFound from '~assets/images/not-found.png';

import { isEmpty } from 'lodash';

import { IconButton } from '@components/ui';
import { useLocalization } from '@hooks';
import { EControlSize, EIcon, EViewMode, TNewsItem } from '@types';
import { formatTime, getClassName, isWithinLastHour } from '@utils';

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
  const bookmarkIcon = bookmarked ? EIcon.Bookmark : EIcon.BookmarkEmpty;
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
    <li className="group mb-6">
      {shouldShowThumbnail && (
        <a href={url} target="_blank" rel="noreferrer" className="block mb-1">
          <img
            src={thumbnailUrl ?? ''}
            alt={title}
            className="w-full rounded-sm opacity-100 hover:opacity-70 transition-opacity duration-500"
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
        <span className="text-secondary">{itemTime}</span>
        <div className="flex flex-col gap-1 overflow-hidden">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="overflow-hidden text-ellipsis hover:underline"
          >
            {title}
          </a>
          {shouldShowDescription && (
            <p className="text-secondary text-sm text-ellipsis overflow-x-auto font-normal">
              {data.description}
            </p>
          )}
        </div>
        <div className="flex ml-auto shrink-0 gap-1 sm:invisible group-hover:visible">
          <IconButton
            icon={bookmarkIcon}
            title={bookmarkTitle}
            onClick={handleBookmarkClick}
            size={EControlSize.Small}
          />
          {isShareSupported && (
            <IconButton
              icon={EIcon.Share}
              title={dic.share}
              onClick={handleShareClick}
              size={EControlSize.Small}
            />
          )}
        </div>
      </div>
    </li>
  );
}

export default NewsListItem;
