import { useAppSelector } from '@store/hooks';
import { selectSettingsData } from '@store/slices';

const useAnimation = () => {
  const { animation } = useAppSelector(selectSettingsData);

  return animation;
};

export default useAnimation;
