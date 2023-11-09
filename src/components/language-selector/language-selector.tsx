import { useLocalization } from '@hooks';
import { Select } from '@components/ui';

import { prepareOptions } from './language-selector.utils';
import useLanguageSelector from './useLanguageSelector';

function LanguageSelector() {
  const dic = useLocalization();
  const options = prepareOptions();
  const { currLanguage, onLanguageChange } = useLanguageSelector();

  return (
    <Select
      name="language-selector"
      value={currLanguage}
      onChange={onLanguageChange}
      options={options}
      className="mr-2 appearance-none"
      title={dic.changeLanguage}
    />
  );
}

export default LanguageSelector;
