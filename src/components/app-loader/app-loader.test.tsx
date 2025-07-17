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

    render(<AppLoader animated />);
    const img = screen.getByAltText('Logo');
    expect(img).toBeInTheDocument();
    expect(img).toHaveClass('animate-scale');
    expect(img).toHaveAttribute('src', 'logo.png');
  });

  it('renders logo image without animation class when animation is disabled', () => {
    (useAnimation as Mock).mockReturnValue(false);

    render(<AppLoader animated={false} />);
    const img = screen.getByAltText('Logo');
    expect(img).toBeInTheDocument();
    expect(img).not.toHaveClass('animate-scale');
    expect(img).toHaveAttribute('src', 'logo.png');
  });
});
