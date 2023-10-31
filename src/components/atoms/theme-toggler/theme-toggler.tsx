import { doUpdateSettings } from 'store/actions';
import { selectTheme } from 'store/selectors';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { THEMES } from 'common/constants';

import { IconButton } from '../icon-button';

function ThemeToggler() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const handleThemeChange = () => {
    dispatch(
      doUpdateSettings({
        theme: theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT,
      })
    );
  };

  return (
    <IconButton
      icon={theme === THEMES.LIGHT ? 'moon' : 'sun'}
      onClick={handleThemeChange}
      title="Change Theme"
      size="big"
      className="mr-2"
    />
  );
}

export default ThemeToggler;
