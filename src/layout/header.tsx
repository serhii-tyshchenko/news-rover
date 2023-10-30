import { useNavigate } from 'react-router';
import { IconButton } from 'components/atoms';
import { APP_NAME } from 'common/constants';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="d-flex align-items-center justify-content-between">
      <a href="/">{APP_NAME}</a>
      <nav>
        <IconButton
          icon="bookmark"
          onClick={() => navigate('/bookmarks')}
          title="Manage Bookmarks"
          size="big"
          className="mr-2"
        />
        <IconButton
          icon="rss"
          onClick={() => navigate('/providers')}
          title="Manage Providers"
          size="big"
        />
      </nav>
    </header>
  );
}

export default Header;
