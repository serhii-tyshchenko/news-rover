import { groupBy } from 'lodash';
import { TNewsItem, TBookmark, TDic } from '@types';
import { isToday, isYesterday } from '@utils';
import { TGetConfig } from './news-card.types';

export const getDateLabel = (date: Date, dic: TDic) => {
  if (isToday(date)) {
    return dic.today;
  }
  if (isYesterday(date)) {
    return dic.yesterday;
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

export const groupDataByDay = (data: TNewsItem[]) =>
  groupBy(
    data.toSorted((a, b) => b.created - a.created),
    (item: TNewsItem) => new Date(item.created).toLocaleDateString(),
  );
