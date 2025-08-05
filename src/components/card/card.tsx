import { isEmpty } from 'lodash';

import { getClassName } from '@utils';

import { CardControls } from './card-controls';
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

  const originalClassName = `w-full p-4 flex-shrink-0 snap-start flex
    flex-col rounded-none sm:rounded shadow h-full sm:h-[calc(100vh-5.25rem)] max-w-full
    sm:max-w-[80ch] justify-self-center bg-surface`;

  const classNames = getClassName(originalClassName, className);
  const hasControls = !isEmpty(controlsConfig);

  return (
    <article
      className={classNames}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <header className="flex justify-between items-center mb-4 gap-4">
        <h2 className="font-semibold text-2xl">{title}</h2>
        {hasControls && <CardControls config={controlsConfig} />}
      </header>
      {children}
    </article>
  );
}

export default Card;
