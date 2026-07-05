import { IconButton } from '@components/ui';
import { EControlSize, EIcon } from '@types';

interface IProps {
  data: Array<{
    icon: EIcon;
    onClick: () => void;
    title: string;
    active?: boolean;
  }>;
}

function HeaderNav(props: IProps) {
  const { data } = props;

  return (
    <nav className="flex gap-2">
      {data.map(({ icon, onClick, title, active }) => (
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
