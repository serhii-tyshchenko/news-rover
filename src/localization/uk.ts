import { TDic } from '@types';
import { ETheme, ELanguage } from '@constants';

const STR: TDic = {
  add: 'Додати',
  addBookmark: 'Додати закладку',
  animation: 'Анімація',
  autorefresh: 'Автооновлення',
  bookmarks: 'Закладки',
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
  changeLanguage: 'Змінити мову',
  changeTheme: 'Змінити тему',
  genericError: 'Щось пішло не так. Спробуйте пізніше.',
  hideProvider: 'Приховати провайдера',
  home: 'Головна',
  language: 'Мова',
  languages: {
    [ELanguage.En]: 'Англійська',
    [ELanguage.Uk]: 'Українська',
  },
  loadMore: 'Завантажити ще',
  noBookmarks: 'Немає закладок',
  noNews: 'Немає новин',
  noProviders: 'Немає провайдерів.',
  providers: 'Провайдери',
  removeBookmark: 'Видалити закладку',
  refresh: 'Оновити',
  settings: 'Налаштування',
  share: 'Поділитися',
  showProvider: 'Показати провайдера',
  theme: 'Тема',
  themes: {
    [ETheme.System]: 'Системна',
    [ETheme.Light]: 'Світла',
    [ETheme.Dark]: 'Темна',
    [ETheme.DarkBlue]: 'Темно-синя',
    [ETheme.DarkRed]: 'Темно-червона',
  },
  thumbnail: 'Мініатюра',
  today: 'Сьогодні',
  yesterday: 'Вчора',
};

export default STR;
