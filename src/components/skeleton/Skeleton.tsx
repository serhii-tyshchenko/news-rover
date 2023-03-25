import { POSTS_LIMIT } from 'common/constants';
import './Skeleton.scss';

function Skeleton() {
  return (
    <ul>
      {Array.from({ length: POSTS_LIMIT }).map((_, index) => (
        <li className="skeleton" key={index} />
      ))}
    </ul>
  );
}

export default Skeleton;
