import { IconButton } from '@components/ui';
import { EControlSize, EIcon } from '@types';

interface IProps {
  items: Array<{
    icon: EIcon;
    onClick: () => void;
    title: string;
    active?: boolean;
  }>;
}

function HeaderNav(props: IProps) {
  const { items } = props;

  return (
    <nav className="flex gap-2">
      {items.map(({ icon, onClick, title, active }) => (
        <IconButton
          key={icon}
          icon={icon}
          onClick={onClick}
          title={title}
          size={EControlSize.Big}
          toggled={active}
        />
      ))}
    </nav>
  );
}

export default HeaderNav;
