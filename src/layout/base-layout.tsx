import { Outlet } from 'react-router-dom';

import Header from './header';
import Main from './main';

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
