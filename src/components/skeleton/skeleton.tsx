import { useAnimation } from '@hooks';
import { getClassName } from '@utils';

import './skeleton.styles.scss';

interface ISkeletonProps {
  count?: number;
}

function Skeleton(props: ISkeletonProps) {
  const { count = 10 } = props;
  const animated = useAnimation();
  const classNames = getClassName('skeleton', {
    'skeleton--animated': animated,
  });

  return (
    <ul className="flex flex-col h-full overflow-y-auto scrollbar-none">
      {Array.from({ length: count }).map((_, index) => (
        <li className={classNames} key={index} data-testid="skeleton-item" />
      ))}
    </ul>
  );
}

export default Skeleton;
