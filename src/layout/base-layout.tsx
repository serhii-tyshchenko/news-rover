import { ReactNode } from 'react';

import Header from './header';
import Main from './main';

type TProps = {
  children: ReactNode;
};

function BaseLayout({ children }: TProps) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}

export default BaseLayout;
