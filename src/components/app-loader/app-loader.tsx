import logo from '~assets/images/logo96.png';

import { getClassName } from '@utils';

interface IProps {
  animated?: boolean;
}

function AppLoader({ animated }: IProps) {
  const classNames = getClassName(
    'absolute left-1/2 top-1/2 transform translate-x-[-50%] translate-y-[-50%]',
    { 'animate-scale': animated },
  );

  return <img src={logo} alt="Logo" className={classNames} />;
}

export { AppLoader };
