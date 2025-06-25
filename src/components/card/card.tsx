import { getClassName } from '@utils';

import { CardControls } from './card-controls';
import './card.styles.scss';
import { TCardProps } from './card.types';

function Card(props: TCardProps) {
  const {
    title,
    children,
    className = '',
    controlsConfig = [],
    draggable = false,
    onDragStart,
    onDragOver,
    onDragEnd,
  } = props;

  const classNames = getClassName('card', className);

  return (
    <div
      className={classNames}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <div className="flex justify-between items-center mb-4 gap-4">
        <h3>{title}</h3>
        <CardControls config={controlsConfig} />
      </div>
      {children}
    </div>
  );
}

export default Card;
