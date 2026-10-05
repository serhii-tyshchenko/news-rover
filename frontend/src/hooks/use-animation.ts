import { useAppSelector } from '#store';
import { selectSettingsData } from '#store/slices';

const useAnimation = () => {
  const { animation } = useAppSelector(selectSettingsData);

  return animation;
};

export default useAnimation;
