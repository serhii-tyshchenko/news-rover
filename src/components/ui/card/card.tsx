import { TCardProps } from './card.types';
import { CardControls } from './card-controls';

import './card.styles.scss';

function Card(props: TCardProps) {
  const { title, children, controlsConfig = [] } = props;

  return (
    <div className="card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>{title}</h3>
        <CardControls config={controlsConfig} />
      </div>
      {children}
    </div>
  );
}

export default Card;
