import './card-list.styles.scss';

function CardList({ children }: { children: React.ReactNode }) {
  return <section className="card-list">{children}</section>;
}

export default CardList;
