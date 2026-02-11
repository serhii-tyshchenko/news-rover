import { useAppSelector } from '@hooks';
import { selectSettingsData } from '@store/selectors';

const useAnimation = () => {
  const { animation } = useAppSelector(selectSettingsData);

  return animation;
};

export default useAnimation;
