import { TDic, TProvider } from '@types';

const getCategoryTitle = (category: string, dic: TDic) => {
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

export const groupProvidersByCategory = (
  providers: TProvider[] = [],
  locale: string,
  dic: TDic,
) =>
  [...new Set<string>(providers.map(({ category }) => category))]
    .map((category) => ({
      category,
      title: getCategoryTitle(category, dic),
      data: providers
        .filter((provider) => provider.category === category)
        .sort((a, b) => a.name.localeCompare(b.name, locale)),
    }))
    .sort((a, b) => a.title.localeCompare(b.title, locale));
