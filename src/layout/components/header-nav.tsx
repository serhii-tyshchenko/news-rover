import { IconButton } from '@components/ui';
import { EControlSize } from '@types';

interface HeaderNavProps {
  items: Array<{
    icon: string;
    onClick: () => void;
    title: string;
    active?: boolean;
  }>;
}

function HeaderNav({ items }: HeaderNavProps) {
  return (
    <nav className="flex gap-2">
      {items.map((item) => (
        <IconButton
          key={item.icon}
          icon={item.icon}
          onClick={item.onClick}
          title={item.title}
          size={EControlSize.Big}
          toggled={item.active}
        />
      ))}
    </nav>
  );
}

export default HeaderNav;
