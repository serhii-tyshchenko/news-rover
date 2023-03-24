import { useEffect, useState } from 'react';
import { TNews } from './App.types';
import { fetchNews } from './App.utils';

type TWidgetProps = {
  provider: {
    name: string;
    title: string;
  };
};

const convertDate = (date: Date) => {
  const rawDate = new Date(date);
  const hours = rawDate.getHours();
  const minutes = rawDate.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

function Widget({ provider }: TWidgetProps) {
  const [news, setNews] = useState([] as TNews);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNews(provider.name, setNews, setIsLoading);
  }, [provider]);

  return (
    <div className="widget">
      <div className="d-flex justify-content-between align-items-center">
        <h2>{provider.title}</h2>
        <button onClick={() => fetchNews(provider.name, setNews, setIsLoading)}>
          Refresh
        </button>
      </div>
      {isLoading && <div>Loading...</div>}
      {news.length === 0 && !isLoading && <div>No news</div>}
      {news.length > 0 && !isLoading && (
        <ul className="m-0">
          {news.map((item: any) => (
            <li key={item.title} className="mb-4 d-flex">
              <span className="mr-2">{convertDate(item.created)}</span>
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Widget;
