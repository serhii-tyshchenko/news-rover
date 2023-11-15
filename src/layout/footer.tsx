import { APP_VERSION } from '@constants';

function Footer() {
  return (
    <footer className="d-flex align-items-center justify-content-between">
      <a href="https://github.com/serhii-tyshchenko">© Serhii Tyshchenko</a>
      <span>{APP_VERSION}</span>
    </footer>
  );
}

export default Footer;
