import { useEffect } from 'react';
import { useAppDispatch } from 'common/hooks';
import { doGetProviders } from 'store/actions';
import { Widget } from 'components/organisms';
import { useTheme } from 'common/hooks';
import { PROVIDERS, APP_NAME } from 'common/constants';

import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(doGetProviders());
  }, [dispatch]);

  useTheme();

  return (
    <>
      <header>{APP_NAME}</header>
      <main>
        <Widget provider={PROVIDERS.CENSOR} />
        <Widget provider={PROVIDERS.LB} />
        <Widget provider={PROVIDERS.NV} />
        <Widget provider={PROVIDERS.ESPRESO} />
        <Widget provider={PROVIDERS.UNIAN} />
        <Widget provider={PROVIDERS.OBOZREVATEL} />
        <Widget provider={PROVIDERS.ARMYINFORM} />
        <Widget provider={PROVIDERS.MILITARNYJ} />
        <Widget provider={PROVIDERS.DEFENCE_UA} />
      </main>
    </>
  );
}

export default App;
