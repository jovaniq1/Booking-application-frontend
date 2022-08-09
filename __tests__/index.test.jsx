import { render, screen } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('Loading is first render', async () => {
    render(<Home />);

    const heading = await screen.findAllByRole('loading', { name: 'Loading' });

    expect(heading).not.toBeNull;
  });
});
