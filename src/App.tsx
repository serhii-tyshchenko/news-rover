import { Widget } from 'components';
import { useTheme } from 'common/hooks';
import { PROVIDERS } from 'common/constants';

import './App.scss';

function App() {
  useTheme();

  return (
    <>
      <header>My News</header>
      <main>
        <Widget provider={PROVIDERS.CENSOR} />
        <Widget provider={PROVIDERS.LB} />
        <Widget provider={PROVIDERS.NV} />
        <Widget provider={PROVIDERS.ESPRESO} />
        <Widget provider={PROVIDERS.MILITARNYJ} />
        <Widget provider={PROVIDERS.DEFENCE_UA} />
      </main>
    </>
  );
}

export default App;
