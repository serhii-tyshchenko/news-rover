import { CardList, CardSkeleton } from '@components';
import { DEFAULT_CARD_COUNT } from '@constants';
import { useAnimation, useBreakpoints } from '@hooks';

interface ICardListSkeletonProps {
  cardCount?: number;
}

function CardListSkeleton(props: ICardListSkeletonProps) {
  const { cardCount = DEFAULT_CARD_COUNT } = props;
  const { isMd, isXl, is2xl } = useBreakpoints();
  const isAnimationEnabled = useAnimation();

  const showSecondCard = cardCount > 1 && isMd;
  const showThirdCard = cardCount > 2 && isXl;
  const showFourthCard = cardCount > 3 && is2xl;

  return (
    <CardList>
      <CardSkeleton animated={isAnimationEnabled} />
      {showSecondCard && <CardSkeleton animated={isAnimationEnabled} />}
      {showThirdCard && <CardSkeleton animated={isAnimationEnabled} />}
      {showFourthCard && <CardSkeleton animated={isAnimationEnabled} />}
    </CardList>
  );
}

export default CardListSkeleton;
