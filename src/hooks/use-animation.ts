import { useAppSelector } from '@hooks';
import { selectSettingsData } from '@store/selectors';
import { EAnimation } from '@constants';

const useAnimation = () => {
  const { animation } = useAppSelector(selectSettingsData);

  return animation == EAnimation.On;
};

export default useAnimation;
