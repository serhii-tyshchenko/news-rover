import { getClassName } from '@utils';

interface ISkeletonProps {
  animated?: boolean;
  count?: number;
  testId?: string;
}

function Skeleton(props: ISkeletonProps) {
  const { animated = true, count = 10, testId = 'skeleton-list' } = props;

  const rootClassName = getClassName(
    'flex flex-col h-full overflow-y-auto scrollbar-none gap-6',
    {
      'animate-pulse': animated,
    },
  );

  return (
    <ul className={rootClassName} data-testid={testId}>
      {Array.from({ length: count }).map((_, index) => (
        <li className="rounded bg-skeleton grow min-h-16" key={index} />
      ))}
    </ul>
  );
}

export default Skeleton;
