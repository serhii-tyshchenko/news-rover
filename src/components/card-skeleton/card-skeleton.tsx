import { Skeleton } from '@components/skeleton';
import { getClassName } from '@utils';

interface ICardSkeletonProps {
  className?: string;
}

function CardSkeleton(props: ICardSkeletonProps) {
  const { className = '' } = props;
  const rootClassName = getClassName(
    'w-full p-4 flex-shrink-0 snap-start flex flex-col rounded-none shadow h-full max-w-full justify-self-center bg-surface sm:h-[calc(100vh-5.25rem)] sm:max-w-[80ch] sm:rounded',
    className,
  );

  return (
    <article className={rootClassName}>
      {/* TODO Add animation */}
      <header className="flex justify-between items-center mb-4 gap-4">
        <div className="h-8 bg-skeleton block w-1/2 rounded" />
        <div className="flex gap-2">
          <div className="h-5 w-5 bg-skeleton rounded-full" />
          <div className="h-5 w-5 bg-skeleton rounded-full" />
          <div className="h-5 w-5 bg-skeleton rounded-full" />
        </div>
      </header>
      <Skeleton />
    </article>
  );
}

export default CardSkeleton;
