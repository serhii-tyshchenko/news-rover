import { Dialog, Select } from '@components/ui';
import { useAppDispatch, useAppSelector, useLocalization } from '@hooks';
import { doUpdateSettings } from '@store/actions';
import { selectSettingsData } from '@store/selectors';
import { THEMES, LANGUAGES, APP_VERSION } from '@constants';

import { prepareOptions } from './settings-dialog.utils';

type TSettingsDialogProps = {
  opened: boolean;
  onClose: any;
};

function SettingsDialog(props: TSettingsDialogProps) {
  const { opened, onClose } = props;
  const dic = useLocalization();

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
        <div className="d-flex align-items-center justify-content-between">
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
      </div>
      <footer className="d-flex justify-content-between">
        <a
          href="https://github.com/serhii-tyshchenko"
          className="small"
          target="_blank"
        >
          &copy; Serhii Tyshchenko
        </a>
        <span className="small">{APP_VERSION}</span>
      </footer>
    </Dialog>
  );
}

export default SettingsDialog;
