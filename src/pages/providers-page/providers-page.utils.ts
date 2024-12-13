import { TProvider, TDic } from '@types';

export const groupProvidersByCategory = (providers: TProvider[] = []) =>
  providers.reduce(
    (acc, provider) => {
      if (!acc[provider.category]) {
        acc[provider.category] = [];
      }
      acc[provider.category].push(provider);
      return acc;
    },
    {} as { [key: string]: TProvider[] },
  );

export const getCategoryTitle = (category: string, dic: TDic) => {
  const categoryToNameMap: { [key: string]: string } = {
    news: dic.category?.news,
    military: dic.category?.military,
    tech: dic.category?.technology,
    software_development: dic.category?.softwareDevelopment,
    space: dic.category?.space,
    science: dic.category?.science,
    business: dic.category?.business,
    blogs: dic.category?.blogs,
  };

  return (
    categoryToNameMap[category as keyof typeof categoryToNameMap] ?? category
  );
};
