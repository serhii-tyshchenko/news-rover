import { TDic } from '@types';
import { ETheme, ELanguage } from '@constants';

const STR: TDic = {
  home: 'Головна',
  add: 'Додати',
  autorefresh: 'Автооновлення',
  changeLanguage: 'Змінити мову',
  changeTheme: 'Змінити тему',
  refresh: 'Оновити',
  loadMore: 'Завантажити ще',
  providers: 'Провайдери',
  showProvider: 'Показати провайдера',
  noProviders: 'Немає провайдерів.',
  hideProvider: 'Приховати провайдера',
  bookmarks: 'Закладки',
  addBookmark: 'Додати закладку',
  removeBookmark: 'Видалити закладку',
  noBookmarks: 'Немає закладок',
  share: 'Поділитися',
  settings: 'Налаштування',
  theme: 'Тема',
  themes: {
    [ETheme.System]: 'Системна',
    [ETheme.Light]: 'Світла',
    [ETheme.Dark]: 'Темна',
    [ETheme.DarkBlue]: 'Темно-синя',
    [ETheme.DarkRed]: 'Темно-червона',
  },
  thumbnail: 'Мініатюра',
  language: 'Мова',
  languages: {
    [ELanguage.En]: 'Англійська',
    [ELanguage.Uk]: 'Українська',
  },
  animation: 'Анімація',
  category: {
    blogs: 'Блоги',
    business: 'Бізнес',
    it: 'Ай Ті',
    military: 'Війна',
    news: 'Новини',
    science: 'Наука',
    softwareDevelopment: 'Ай Ті',
    space: 'Космос',
    technology: 'Технології',
  },
  noNews: 'Немає новин',
  genericError: 'Щось пішло не так. Спробуйте пізніше.',
  today: 'Сьогодні',
  yesterday: 'Вчора',
};

export default STR;
