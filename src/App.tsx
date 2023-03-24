import Widget from './Widget';

import './App.css';

const PROVIDERS = {
  CENSOR: {
    name: 'censor',
    title: 'Цензор',
  },
  LB: {
    name: 'lb',
    title: 'Lb.ua',
  },
  PRAVDA: {
    name: 'pravda',
    title: 'Українська правда',
  },
  NV: {
    name: 'nv',
    title: 'НВ',
  },
  ESPRESO: {
    name: 'espreso',
    title: 'Еспресо',
  },
  MILITARNYJ: {
    name: 'militarnyj',
    title: 'Мілітарний портал',
  },
  DEFENCE_UA: {
    name: 'defence_ua',
    title: 'Defense Express',
  },
};

function App() {
  return (
    <div className="container">
      <header>News Agregator</header>
      <main>
        <Widget provider={PROVIDERS.CENSOR} />
        <Widget provider={PROVIDERS.LB} />
        <Widget provider={PROVIDERS.NV} />
        <Widget provider={PROVIDERS.ESPRESO} />
        <Widget provider={PROVIDERS.MILITARNYJ} />
        <Widget provider={PROVIDERS.DEFENCE_UA} />
      </main>
    </div>
  );
}

export default App;
