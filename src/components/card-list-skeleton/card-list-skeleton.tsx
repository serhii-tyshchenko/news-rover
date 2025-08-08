import { CardList, CardSkeleton } from '@components';
import { useAnimation, useBreakpoints } from '@hooks';

function CardListSkeleton() {
  const { isMd, isXl, is2xl } = useBreakpoints();
  const isAnimationEnabled = useAnimation();

  return (
    <CardList>
      <CardSkeleton animated={isAnimationEnabled} />
      {isMd && <CardSkeleton animated={isAnimationEnabled} />}
      {isXl && <CardSkeleton animated={isAnimationEnabled} />}
      {is2xl && <CardSkeleton animated={isAnimationEnabled} />}
    </CardList>
  );
}

export default CardListSkeleton;
