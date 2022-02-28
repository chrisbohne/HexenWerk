import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

const mockClose = jest.fn();

describe('Modal', () => {
  it('should show children and close button', () => {
    render(
      <Modal onClose={mockClose}>
        <div>Test</div>
      </Modal>
    );

    const elem = document.getElementById('modal');
    if (elem) {
      const { getByText } = within(elem);
      expect(getByText('Test')).toBeInTheDocument();
      expect(getByText('x')).toBeInTheDocument();

      userEvent.click(getByText('x'));
      expect(mockClose).toHaveBeenCalledTimes(1);
    }
  });
});
