import { TControlsConfig } from './card-controls/card-controls.types';

export type TCardProps = {
  title: string;
  className?: string;
  controlsConfig?: TControlsConfig;
  children: React.ReactNode;
};
