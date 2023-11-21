type TControl = {
  icon: string;
  title: string;
  onClick: () => void;
  className?: string;
};

export type TControlsConfig = TControl[];

export type TCardControlsProps = {
  config?: TControlsConfig;
  testId?: string;
};
