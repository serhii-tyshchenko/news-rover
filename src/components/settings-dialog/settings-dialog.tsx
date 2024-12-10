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
  EAnimation,
  EThumbnail,
  EAutoRefresh,
} from '@constants';
import { EControlSize } from '@types';

import { prepareOptions } from './settings-dialog.utils';

interface ISettingsDialogProps {
  opened: boolean;
  onClose: () => void;
}

function SettingsDialog(props: ISettingsDialogProps) {
  const { opened, onClose } = props;
  const dic = useLocalization();
  const isAnimationEnabled = useAnimation();

  const dispatch = useAppDispatch();
  const { locale, theme, thumbnail, autorefresh } =
    useAppSelector(selectSettingsData);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    dispatch(doUpdateSettings({ [name]: value }));
  };

  return (
    <Dialog opened={opened} onClose={onClose} title={dic.settings}>
      <div className="flex-grow-1 d-flex flex-direction-column gap-4">
        <div className="d-flex align-items-center justify-content-between">
          <span>{dic.theme}</span>
          <Select
            name="theme"
            value={theme}
            onChange={handleChange}
            options={prepareOptions(ETheme, dic.themes)}
            title={dic.changeLanguage}
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
            size={EControlSize.Small}
          />
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <span>{dic.language}</span>
          <Select
            name="locale"
            value={locale}
            onChange={handleChange}
            options={prepareOptions(ELanguage, dic.languages)}
            title={dic.changeLanguage}
          />
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <span>{dic.thumbnail}</span>
          <Toggle
            name="thumbnail"
            value={
              thumbnail === EThumbnail.Off ? EThumbnail.On : EThumbnail.Off
            }
            toggled={thumbnail === EThumbnail.On}
            onChange={handleChange}
            animated={isAnimationEnabled}
            size={EControlSize.Small}
          />
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <span>{dic.autorefresh}</span>
          <Toggle
            name="autorefresh"
            value={
              autorefresh === EAutoRefresh.Off
                ? EAutoRefresh.On
                : EAutoRefresh.Off
            }
            toggled={autorefresh === EAutoRefresh.On}
            onChange={handleChange}
            animated={isAnimationEnabled}
            size={EControlSize.Small}
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
