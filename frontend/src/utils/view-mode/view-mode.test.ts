import { describe, expect, it } from 'vitest';

import { EViewMode } from '@types';

import { changeViewMode, getViewModeIcon } from './view-mode';

describe('changeViewMode', () => {
  it('should change TitleOnly to TitleWithDescription', () => {
    expect(changeViewMode(EViewMode.TitleOnly)).toBe(
      EViewMode.TitleWithDescription,
    );
  });

  it('should change TitleWithDescription to TitleWithThumbnail', () => {
    expect(changeViewMode(EViewMode.TitleWithDescription)).toBe(
      EViewMode.TitleWithThumbnail,
    );
  });

  it('should change TitleWithThumbnail to Full', () => {
    expect(changeViewMode(EViewMode.TitleWithThumbnail)).toBe(EViewMode.Full);
  });

  it('should change Full to TitleOnly', () => {
    expect(changeViewMode(EViewMode.Full)).toBe(EViewMode.TitleOnly);
  });

  it('should return TitleOnly for unknown view mode', () => {
    expect(changeViewMode(undefined as unknown as EViewMode)).toBe(
      EViewMode.TitleOnly,
    );
    expect(changeViewMode(null as unknown as EViewMode)).toBe(
      EViewMode.TitleOnly,
    );
    expect(changeViewMode('random' as unknown as EViewMode)).toBe(
      EViewMode.TitleOnly,
    );
  });
});

describe('getViewModeIcon', () => {
  it('returns "th-list" for TitleOnly', () => {
    expect(getViewModeIcon(EViewMode.TitleOnly)).toBe('th-list');
  });

  it('returns "th-list" for TitleWithDescription', () => {
    expect(getViewModeIcon(EViewMode.TitleWithDescription)).toBe('th-list');
  });

  it('returns "th-large" for TitleWithThumbnail', () => {
    expect(getViewModeIcon(EViewMode.TitleWithThumbnail)).toBe('th-large');
  });

  it('returns "th-large" for Full', () => {
    expect(getViewModeIcon(EViewMode.Full)).toBe('th-large');
  });
});
