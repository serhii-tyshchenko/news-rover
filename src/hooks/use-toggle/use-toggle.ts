import { useState } from 'react';

type UseToggleReturn = [boolean, () => void];

const useToggle = (initialValue: boolean = false): UseToggleReturn => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggleValue = () => {
    setValue((currentValue) => !currentValue);
  };

  return [value, toggleValue];
};

export default useToggle;
