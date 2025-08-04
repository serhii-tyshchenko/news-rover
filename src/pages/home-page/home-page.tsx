import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { isEmpty, isEqual } from 'lodash';

import { CardList, NewsCard } from '@components';
import { EmptyState, ErrorState } from '@components/ui';
import {
  useAppDispatch,
  useAppSelector,
  useDraggableList,
  useLocalization,
} from '@hooks';
import { doReorderProviders } from '@store/actions';
import {
  selectAddedProviders,
  selectProvidersData,
  selectProvidersError,
} from '@store/selectors';
import { ERoute, TAddedProvider, TProvider } from '@types';

function HomePage() {
  const dic = useLocalization();

  const dispatch = useAppDispatch();
  const availableProviders = useAppSelector(selectProvidersData) ?? [];
  const addedProviders = useAppSelector(selectAddedProviders);
  const error = useAppSelector(selectProvidersError);

  const handleReorder = useCallback(
    (reorderedProviders: TAddedProvider[]) => {
      if (isEqual(addedProviders, reorderedProviders)) {
        return;
      }
      dispatch(doReorderProviders(reorderedProviders));
    },
    [addedProviders, dispatch],
  );

  const {
    currentItems,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    checkIfDragging,
  } = useDraggableList<TAddedProvider>(addedProviders, handleReorder);

  const addedProvidersData = useMemo(
    () =>
      currentItems.map((addedProvider) =>
        availableProviders.find(
          (availableProvider: TProvider) =>
            availableProvider?.id === addedProvider.id,
        ),
      ),
    [availableProviders, currentItems],
  );

  const isDraggable = addedProvidersData.length > 1;

  if (!isEmpty(error)) {
    return <ErrorState>{dic.genericError}</ErrorState>;
  }

  if (isEmpty(addedProvidersData)) {
    return (
      <EmptyState>
        {dic.noProviders}&nbsp;
        <Link to={ERoute.Providers} className="text-accent hover:underline">
          {dic.add}
        </Link>
      </EmptyState>
    );
  }

  return (
    <CardList>
      {addedProvidersData.map((provider: TProvider, index) => (
        <NewsCard
          key={provider.id}
          provider={provider}
          onDragStart={handleDragStart(index)}
          onDragOver={handleDragOver(index)}
          onDragEnd={handleDragEnd}
          isDragging={checkIfDragging(index)}
          draggable={isDraggable}
        />
      ))}
    </CardList>
  );
}

export default HomePage;
