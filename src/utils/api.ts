import { first } from 'lodash';

import { EEnclosureType, TEnclosure, TRawNewsItem } from '@types';

const byImageType = (enclosure: TEnclosure) =>
  enclosure.type === EEnclosureType.Image;

export const extractThumbnailUrl = (enclosures: TEnclosure[] = []) =>
  first(enclosures.filter(byImageType))?.url ?? null;

export const isValidResponse = (response: Response) => response.status === 200;

export const formatNewsResponse = (rawData: {
  data: TRawNewsItem[];
  count: number;
}) => ({
  data: rawData.data.map((item) => ({
    created: item.created,
    title: item.title,
    link: item.link,
    thumbnail: extractThumbnailUrl(item?.enclosures),
    description: item.description,
  })),
  count: rawData.count,
});
