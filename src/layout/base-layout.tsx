import { ReactNode } from 'react';

import Header from './header';
import Main from './main';
import Footer from './footer';

type TProps = {
  children: ReactNode;
};

function BaseLayout({ children }: TProps) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

export default BaseLayout;
