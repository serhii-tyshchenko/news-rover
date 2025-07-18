import { EIcon, EViewMode } from '@types';

const changeViewMode = (viewMode: EViewMode) => {
  switch (viewMode) {
    case EViewMode.TitleOnly:
      return EViewMode.TitleWithDescription;
    case EViewMode.TitleWithDescription:
      return EViewMode.TitleWithThumbnail;
    case EViewMode.TitleWithThumbnail:
      return EViewMode.Full;
    case EViewMode.Full:
      return EViewMode.TitleOnly;
    default:
      return EViewMode.TitleOnly;
  }
};

const getViewModeIcon = (viewMode: EViewMode) => {
  switch (viewMode) {
    case EViewMode.TitleOnly:
    case EViewMode.TitleWithDescription:
      return EIcon.ThList;
    case EViewMode.TitleWithThumbnail:
    case EViewMode.Full:
      return EIcon.ThLarge;
    default:
      return EIcon.ThList;
  }
};

export { changeViewMode, getViewModeIcon };
