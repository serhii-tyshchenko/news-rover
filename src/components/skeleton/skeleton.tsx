import { getClassName } from '@utils';

import './skeleton.styles.scss';

interface ISkeletonProps {
  animated?: boolean;
  count: number;
}

function Skeleton(props: ISkeletonProps) {
  const { animated = true, count } = props;

  const classNames = getClassName('skeleton', {
    'skeleton--animated': animated,
  });

  return (
    <ul className="d-flex flex-direction-column h-100 overflow-y-auto pr-1">
      {Array.from({ length: count }).map((_, index) => (
        <li className={classNames} key={index} data-testid="skeleton-item" />
      ))}
    </ul>
  );
}

export default Skeleton;
