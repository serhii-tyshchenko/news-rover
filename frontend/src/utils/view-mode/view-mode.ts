import { EIcon, EViewMode } from '@types';

/**
 * Changes the view mode to the next mode in a predefined sequence.
 * The sequence of view modes is as follows:
 * - TitleOnly -> TitleWithDescription -> TitleWithThumbnail -> Full -> TitleOnly
 * This function can be used to cycle through different view modes in a user interface, allowing users to switch between different levels of detail for news items.
 * @param {EViewMode} viewMode - The current view mode that needs to be changed.
 * @returns {EViewMode} - The next view mode in the sequence.
 */
export const changeViewMode = (viewMode: EViewMode): EViewMode => {
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

/**
 * Retrieves the corresponding icon for a given view mode.
 * The icons are defined in the `EIcon` enum and are associated with specific view modes as follows:
 * - TitleOnly and TitleWithDescription use the ThList icon.
 * - TitleWithThumbnail and Full use the ThLarge icon.
 * This function can be used to display the appropriate icon in the user interface based on the current view mode.
 * @param {EViewMode} viewMode - The view mode for which to retrieve the icon.
 * @returns {EIcon} - The corresponding icon for the given view mode.
 */
export const getViewModeIcon = (viewMode: EViewMode): EIcon => {
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
