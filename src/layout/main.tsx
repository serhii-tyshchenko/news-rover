import { ReactNode } from 'react';

type MainProps = {
  children: ReactNode;
};

function Main({ children }: MainProps) {
  return <main>{children}</main>;
}

export default Main;
