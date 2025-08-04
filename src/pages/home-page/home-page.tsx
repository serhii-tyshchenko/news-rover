import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { isEmpty, isEqual } from 'lodash';

import { CardList, NewsCard } from '@components';
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
    return (
      <div className="flex items-center justify-center h-full p-2 text-center text-danger">
        {dic.genericError}
      </div>
    );
  }

  if (isEmpty(addedProvidersData)) {
    return (
      <div className="flex items-center justify-center h-full p-2 text-center">
        {dic.noProviders}&nbsp;
        <Link to={ERoute.Providers} className="text-accent hover:underline">
          {dic.add}
        </Link>
      </div>
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
