import { render, screen } from '@testing-library/react';
import Icon from './Icon';

describe('Icon', () => {
  it('should render svg correctly', async () => {
    render(<Icon name="hamburger" className="test" />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });
});
