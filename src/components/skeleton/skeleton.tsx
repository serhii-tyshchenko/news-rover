import { DEFAULT_POSTS_LIMIT } from '@constants';

import './skeleton.scss';

function Skeleton() {
  return (
    <ul>
      {Array.from({ length: DEFAULT_POSTS_LIMIT }).map((_, index) => (
        <li className="skeleton" key={index} />
      ))}
    </ul>
  );
}

export default Skeleton;
