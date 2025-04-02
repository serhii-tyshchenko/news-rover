import { first } from 'lodash';
import { TEnclosure, EEnclosureType } from '@types';

const byImageType = (enclosure: TEnclosure) =>
  enclosure.type === EEnclosureType.Image;

export const extractThumbnailUrl = (enclosures: TEnclosure[] = []) =>
  first(enclosures.filter(byImageType))?.url ?? null;

export const isValidResponse = (response: Response) => response.status === 200;

export const formatGetNewsByProviderResponse = (rawData: {
  data: any[];
  count: number;
}) => ({
  data: rawData.data.map((item) => ({
    created: item.created,
    title: item.title,
    link: item.link,
    thumbnail: extractThumbnailUrl(item?.enclosures),
  })),
  count: rawData.count,
});
