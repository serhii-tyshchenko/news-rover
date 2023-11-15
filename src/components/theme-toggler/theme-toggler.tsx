import { doUpdateSettings } from '@store/actions';
import { selectTheme } from '@store/selectors';
import { useAppDispatch, useAppSelector, useLocalization } from '@hooks';
import { THEMES, EIcon } from '@constants';

import { IconButton } from '@components/ui';

function ThemeToggler() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const dic = useLocalization();

  const handleThemeChange = () => {
    dispatch(
      doUpdateSettings({
        theme: theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT,
      })
    );
  };

  return (
    <IconButton
      icon={theme === THEMES.LIGHT ? EIcon.Moon : EIcon.Sun}
      onClick={handleThemeChange}
      title={dic.changeTheme}
      size="big"
      className="mr-2"
    />
  );
}

export default ThemeToggler;
