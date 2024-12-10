import { ETheme, ELanguage } from '@constants';
import { TDic } from '@types';

const STR: TDic = {
  add: 'Add',
  addBookmark: 'Add bookmark',
  animation: 'Animation',
  autorefresh: 'Autorefresh',
  bookmarks: 'Bookmarks',
  category: {
    blogs: 'Blogs',
    business: 'Business',
    it: 'IT',
    military: 'Military',
    news: 'News',
    technology: 'Technology',
    science: 'Science',
    softwareDevelopment: 'IT',
    space: 'Space',
  },
  changeLanguage: 'Change language',
  changeTheme: 'Change theme',
  genericError: 'Something went wrong. Try again later.',
  hideProvider: 'Hide provider',
  home: 'Home',
  language: 'Language',
  languages: {
    [ELanguage.En]: 'English',
    [ELanguage.Uk]: 'Ukrainian',
  },
  loadMore: 'Load more',
  noBookmarks: 'No bookmarks',
  noNews: 'No news',
  noProviders: 'No providers added.',
  providers: 'Providers',
  refresh: 'Refresh',
  removeBookmark: 'Remove bookmark',
  settings: 'Settings',
  share: 'Share',
  showProvider: 'Show provider',
  thumbnail: 'Thumbnail',
  theme: 'Theme',
  themes: {
    [ETheme.System]: 'System',
    [ETheme.Light]: 'Light',
    [ETheme.Dark]: 'Dark',
    [ETheme.DarkBlue]: 'Dark Blue',
    [ETheme.DarkRed]: 'Dark Red',
  },
  today: 'Today',
  yesterday: 'Yesterday',
};

export default STR;
