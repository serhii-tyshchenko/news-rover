import { useLocalization } from '@hooks';
import { formatTime } from '@utils';
import { IconButton } from '@components/ui';
import { TNewsItem } from '@types';

type TItemProps = {
  item: TNewsItem;
  isBookmarked: boolean;
  onAddBookmark: (item: TNewsItem) => void;
  onRemoveBookmark: (item: TNewsItem) => void;
};

function Item(props: TItemProps) {
  const { item, isBookmarked, onAddBookmark, onRemoveBookmark } = props;
  const dic = useLocalization();

  const handleBookmarkClick = () => {
    isBookmarked ? onRemoveBookmark(item) : onAddBookmark(item);
  };

  const handleShareClick = () => {
    navigator.share({ title: item.title, url: item.link });
  };

  const isShareSupported = !!navigator.share;

  return (
    <li className="item">
      <span className="mr-2 color-secondary">{formatTime(item.created)}</span>
      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        className="color-primary mr-2"
      >
        {item.title}
      </a>
      <div className="d-flex ml-auto flex-shrink-0 gap-1">
        <IconButton
          icon={isBookmarked ? 'bookmark' : 'bookmark-empty'}
          title={isBookmarked ? dic.removeBookmark : dic.addBookmark}
          onClick={handleBookmarkClick}
          size="small"
          className="btn"
        />
        {isShareSupported && (
          <IconButton
            icon="share"
            title={dic.share}
            onClick={handleShareClick}
            size="small"
            className="btn"
          />
        )}
      </div>
    </li>
  );
}

export default Item;
