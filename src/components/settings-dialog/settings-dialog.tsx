import { Dialog, Select, Toggle } from '@components/ui';
import {
  useAppDispatch,
  useAppSelector,
  useLocalization,
  useAnimation,
} from '@hooks';
import { doUpdateSettings } from '@store/actions';
import { selectSettingsData } from '@store/selectors';
import {
  THEMES,
  LANGUAGES,
  APP_VERSION,
  AUTHOR_NAME,
  AUTHOR_SITE,
  EAnimation,
} from '@constants';

import { TSettingsDialogProps } from './settings-dialog.types';
import { prepareOptions } from './settings-dialog.utils';

function SettingsDialog(props: TSettingsDialogProps) {
  const { opened, onClose } = props;
  const dic = useLocalization();
  const isAnimationEnabled = useAnimation();

  const dispatch = useAppDispatch();
  const { locale, theme } = useAppSelector(selectSettingsData);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    dispatch(doUpdateSettings({ [name]: value }));
  };

  return (
    <Dialog opened={opened} onClose={onClose} title={dic.settings}>
      <div className="flex-grow-1">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <span>{dic.theme}</span>
          <Select
            name="theme"
            value={theme}
            onChange={handleChange}
            options={prepareOptions(THEMES)}
            title={dic.changeLanguage}
            noArrow
          />
        </div>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <span>{dic.language}</span>
          <Select
            name="locale"
            value={locale}
            onChange={handleChange}
            options={prepareOptions(LANGUAGES)}
            title={dic.changeLanguage}
            noArrow
          />
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <span>{dic.animation}</span>
          <Toggle
            name="animation"
            value={isAnimationEnabled ? EAnimation.Off : EAnimation.On}
            toggled={isAnimationEnabled}
            onChange={handleChange}
            animated={isAnimationEnabled}
            size="small"
          />
        </div>
      </div>
      <footer className="d-flex justify-content-between">
        <a href={AUTHOR_SITE} className="small" target="_blank">
          &copy; {AUTHOR_NAME}
        </a>
        <span className="small">{APP_VERSION}</span>
      </footer>
    </Dialog>
  );
}

export default SettingsDialog;
