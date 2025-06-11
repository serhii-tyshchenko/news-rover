import { Mock, describe, expect, it, vi } from 'vitest';

import { useAnimation } from '@hooks';
import { render, screen } from '@testing-library/react';

import { AppLoader } from './app-loader';

vi.mock('~assets/images/logo96.png', () => ({
  default: 'logo.png',
}));

vi.mock('@hooks', () => ({
  useAnimation: vi.fn(),
}));

describe('AppLoader', () => {
  it('renders logo image with animation class when animation is enabled', () => {
    (useAnimation as Mock).mockReturnValue(true);

    render(<AppLoader />);
    const img = screen.getByAltText('Logo');
    expect(img).toBeInTheDocument();
    expect(img).toHaveClass('animation-pulse');
    expect(img).toHaveAttribute('src', 'logo.png');
  });

  it('renders logo image without animation class when animation is disabled', () => {
    (useAnimation as Mock).mockReturnValue(false);

    render(<AppLoader />);
    const img = screen.getByAltText('Logo');
    expect(img).toBeInTheDocument();
    expect(img).not.toHaveClass('animation-pulse');
    expect(img).toHaveAttribute('src', 'logo.png');
  });
});
