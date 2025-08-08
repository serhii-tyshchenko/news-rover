import { CardList, CardSkeleton } from '@components';
import { useBreakpoints } from '@hooks';

function CardListSkeleton() {
  const { isMd, isXl, is2xl } = useBreakpoints();

  return (
    <CardList>
      <CardSkeleton />
      {isMd && <CardSkeleton />}
      {isXl && <CardSkeleton />}
      {is2xl && <CardSkeleton />}
    </CardList>
  );
}

export default CardListSkeleton;
