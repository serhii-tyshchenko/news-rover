import { TNewsItem, TBookmark } from '@types';
import { TGetConfig } from './widget.types';

const isToday = (someDate: Date) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

const isYesterday = (someDate: Date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    someDate.getDate() === yesterday.getDate() &&
    someDate.getMonth() === yesterday.getMonth() &&
    someDate.getFullYear() === yesterday.getFullYear()
  );
};

export const getDateLabel = (date: Date) => {
  if (isToday(date)) {
    return null;
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  return date.toLocaleDateString();
};

export const checkIfBookmarked = (
  bookmarks: Array<TBookmark>,
  item: TNewsItem,
) => bookmarks.some((bookmark) => bookmark.link === item.link);

export const getConfig = ({
  dic,
  handleHideProvider,
  handleRefresh,
  showAnimation,
}: TGetConfig) => [
  {
    icon: 'eye-off',
    title: dic.hideProvider,
    onClick: handleHideProvider,
  },
  {
    icon: 'arrows-cw',
    title: dic.refresh,
    onClick: handleRefresh,
    className: showAnimation ? 'animation-rotate' : '',
  },
];
