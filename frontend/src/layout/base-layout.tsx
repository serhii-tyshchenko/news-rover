import { Outlet } from 'react-router-dom';

import { Header, Main } from './components';

function BaseLayout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default BaseLayout;
