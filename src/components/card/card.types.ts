import { TControlsConfig } from './card-controls/card-controls.types';

export type TCardProps = {
  title: string;
  className?: string;
  controlsConfig?: TControlsConfig;
  children: React.ReactNode;
  draggable?: boolean;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
};
