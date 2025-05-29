type TControl = {
  icon: string;
  title: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

export type TControlsConfig = TControl[];

export type TCardControlsProps = {
  config?: TControlsConfig;
  testId?: string;
};
