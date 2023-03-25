import { Widget } from 'components';

import { PROVIDERS } from 'common/constants';

import './App.css';

function App() {
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
