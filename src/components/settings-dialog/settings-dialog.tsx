import { Dialog, Select, Toggle } from '@components/ui';
import {
  APP_VERSION,
  AUTHOR_NAME,
  AUTHOR_SITE,
  AUTOREFRESH_INTERVAL_OPTIONS,
  DEFAULT_AUTOREFERSH_INTERVAL,
} from '@constants';
import {
  useAnimation,
  useAppDispatch,
  useAppSelector,
  useLocalization,
} from '@hooks';
import { doUpdateSettings } from '@store/actions';
import { selectSettingsData } from '@store/selectors';
import { EControlSize, ELanguage, ETheme } from '@types';
import { prepareOptions } from '@utils';

import { SettingsGroup } from './components';

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
  const { locale, theme, autorefresh, autorefreshInterval } =
    useAppSelector(selectSettingsData);

  const handleStringChange = ({ target: { name, value } }: TChangeEvent) => {
    dispatch(doUpdateSettings({ [name]: value }));
  };

  const handleNumberChange = ({ target: { name, value } }: TChangeEvent) => {
    dispatch(doUpdateSettings({ [name]: Number(value) }));
  };

  const handleBooleanChange = ({ target: { name, checked } }: TChangeEvent) => {
    dispatch(doUpdateSettings({ [name]: checked }));
  };

  return (
    <Dialog opened={opened} onClose={onClose} title={dic.settings}>
      <div className="flex flex-col grow">
        <SettingsGroup label={dic.theme}>
          <Select
            name="theme"
            value={theme}
            onChange={handleStringChange}
            options={prepareOptions(ETheme, dic.themes)}
            title={dic.changeTheme}
          />
        </SettingsGroup>
        <SettingsGroup label={dic.animation}>
          <Toggle
            name="animation"
            toggled={isAnimationEnabled}
            onChange={handleBooleanChange}
            animated={isAnimationEnabled}
            size={EControlSize.Small}
            label={dic.animation}
          />
        </SettingsGroup>
        <SettingsGroup label={dic.language}>
          <Select
            name="locale"
            value={locale}
            onChange={handleStringChange}
            options={prepareOptions(ELanguage, dic.languages)}
            title={dic.changeLanguage}
          />
        </SettingsGroup>
        <SettingsGroup label={dic.autorefresh}>
          <Toggle
            name="autorefresh"
            toggled={autorefresh}
            onChange={handleBooleanChange}
            animated={isAnimationEnabled}
            size={EControlSize.Small}
            label={dic.autorefresh}
          />
        </SettingsGroup>
        {autorefresh && (
          <SettingsGroup label={dic.autorefreshInterval}>
            <Select
              name="autorefreshInterval"
              value={autorefreshInterval ?? DEFAULT_AUTOREFERSH_INTERVAL}
              onChange={handleNumberChange}
              options={AUTOREFRESH_INTERVAL_OPTIONS}
              title={dic.changeAutorefreshInterval}
            />
          </SettingsGroup>
        )}
      </div>
      <footer className="flex justify-between">
        <a href={AUTHOR_SITE} className="text-sm" target="_blank">
          &copy; {AUTHOR_NAME}
        </a>
        <span className="text-sm">{APP_VERSION}</span>
      </footer>
    </Dialog>
  );
}

export default SettingsDialog;
