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
  ETheme,
  ELanguage,
  APP_VERSION,
  AUTHOR_NAME,
  AUTHOR_SITE,
} from '@constants';
import { EControlSize } from '@types';

import { SettingsGroup } from './components';

import { prepareOptions } from './settings-dialog.utils';

interface ISettingsDialogProps {
  opened: boolean;
  onClose: () => void;
}

type TChangeEvent = {
  target: {
    name: string;
    value: string;
    checked?: boolean;
  };
};

function SettingsDialog(props: ISettingsDialogProps) {
  const { opened, onClose } = props;
  const dic = useLocalization();
  const isAnimationEnabled = useAnimation();

  const dispatch = useAppDispatch();
  const { locale, theme, thumbnail, autorefresh } =
    useAppSelector(selectSettingsData);

  const handleChange = ({ target: { name, value, checked } }: TChangeEvent) => {
    const newValue = checked ? (value ? value : checked) : value;
    dispatch(doUpdateSettings({ [name]: newValue }));
  };

  return (
    <Dialog opened={opened} onClose={onClose} title={dic.settings}>
      <div className="d-flex flex-direction-column mb-4">
        <SettingsGroup label={dic.theme}>
          <Select
            name="theme"
            value={theme}
            onChange={handleChange}
            options={prepareOptions(ETheme, dic.themes)}
            title={dic.changeTheme}
          />
        </SettingsGroup>
        <SettingsGroup label={dic.animation}>
          <Toggle
            name="animation"
            toggled={isAnimationEnabled}
            onChange={handleChange}
            animated={isAnimationEnabled}
            size={EControlSize.Small}
            label={dic.animation}
          />
        </SettingsGroup>
        <SettingsGroup label={dic.language}>
          <Select
            name="locale"
            value={locale}
            onChange={handleChange}
            options={prepareOptions(ELanguage, dic.languages)}
            title={dic.changeLanguage}
          />
        </SettingsGroup>
        <SettingsGroup label={dic.thumbnail}>
          <Toggle
            name="thumbnail"
            toggled={thumbnail}
            onChange={handleChange}
            animated={isAnimationEnabled}
            size={EControlSize.Small}
            label={dic.thumbnail}
          />
        </SettingsGroup>
        <SettingsGroup label={dic.autorefresh}>
          <Toggle
            name="autorefresh"
            toggled={autorefresh}
            onChange={handleChange}
            animated={isAnimationEnabled}
            size={EControlSize.Small}
            label={dic.autorefresh}
          />
        </SettingsGroup>
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
