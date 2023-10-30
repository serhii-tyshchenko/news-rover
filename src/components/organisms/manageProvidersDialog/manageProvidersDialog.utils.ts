import { TProvider } from 'common/types';

export const groupProvidersByCategory = (providers: TProvider[]) => {
  const groupedProviders = providers.reduce((acc, provider) => {
    if (!acc[provider.category]) {
      acc[provider.category] = [];
    }
    acc[provider.category].push(provider);
    return acc;
  }, {} as { [key: string]: TProvider[] });

  return groupedProviders;
};
