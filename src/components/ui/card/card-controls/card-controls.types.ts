type TControl = {
  icon: string;
  title: string;
  onClick: () => void;
};

export type TControlsConfig = TControl[];

export type TCardControlsProps = {
  config?: TControlsConfig;
  testId?: string;
};
