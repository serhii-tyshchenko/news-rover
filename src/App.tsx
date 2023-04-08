import { useEffect } from 'react';

import { doGetProviders, doUpdateProviders } from 'store/actions';
import {
  selectProvidersData,
  selectProvidersIsLoading,
  selectAddedProviders,
} from 'store/selectors';

import {
  useTheme,
  useToggle,
  useAppDispatch,
  useAppSelector,
} from 'common/hooks';

import { isEmpty } from 'common/utils';

import { IconButton } from 'components/atoms';
import { Widget, ManageProvidersDialog } from 'components/organisms';

import { TAddedProviders, TProvider } from 'common/types';

import { APP_NAME } from 'common/constants';

import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectProvidersIsLoading);
  const providers = useAppSelector(selectProvidersData);
  const addedProvidersIds: TAddedProviders =
    useAppSelector(selectAddedProviders);

  const addedProviders = providers?.filter((provider: TProvider) =>
    addedProvidersIds?.includes(provider.id)
  );

  useEffect(() => {
    dispatch(doGetProviders());
  }, [dispatch]);

  const [opened, toggleOpened] = useToggle(false);

  useTheme();

  const handleConfirm = (addedProviders: TAddedProviders) => {
    dispatch(doUpdateProviders(addedProviders));
  };

  return (
    <>
      <header className="d-flex align-items-center justify-content-between p-2">
        {APP_NAME}
        <IconButton
          icon="cog"
          onClick={toggleOpened}
          title="Manage Providers"
          size="big"
        />
      </header>
      <main>
        {isLoading && <div className="text-align-center">Loading...</div>}
        {!isLoading && isEmpty(addedProviders) && (
          <div className="text-align-center">
            No providers added. Click settings icon to add.
          </div>
        )}
        {!isLoading && !isEmpty(addedProviders) && (
          <ul className="widget-list">
            {addedProviders.map((provider: TProvider) => (
              <Widget key={provider.id} provider={provider} />
            ))}
          </ul>
        )}
      </main>
      {opened ? (
        <ManageProvidersDialog
          onClose={toggleOpened}
          onConfirm={handleConfirm}
        />
      ) : null}
    </>
  );
}

export default App;
