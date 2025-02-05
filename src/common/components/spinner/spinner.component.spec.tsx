import React from 'react';
import { render, screen } from '@testing-library/react';
import { usePromiseTracker } from 'react-promise-tracker';
import { SpinnerComponent } from './spinner.component';

// react-promise-tracker mock simulator
jest.mock('react-promise-tracker', () => ({
  usePromiseTracker: jest.fn(),
}));

describe('SpinnerComponent', () => {
  it('should render the spinner when promiseInProgress is true', () => {
    (usePromiseTracker as jest.Mock).mockReturnValue({
      promiseInProgress: true,
    }); // Simulamos true

    render(<SpinnerComponent />);

    expect(screen.getByRole('dialog')).toBeVisible(); // Modal MUI set to role="dialog"
    expect(screen.getByRole('status')).toBeInTheDocument(); // Loader set to role="status"
  });

  it('should not render the spinner when promiseInProgress is false', () => {
    (usePromiseTracker as jest.Mock).mockReturnValue({
      promiseInProgress: false,
    });

    render(<SpinnerComponent />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument(); // queryByRole: it shouldn't be there
    expect(screen.queryByRole('status')).not.toBeInTheDocument(); // queryByRole: it shouldn't be there
  });

  it('should apply the correct CSS classes', () => {
    (usePromiseTracker as jest.Mock).mockReturnValue({
      promiseInProgress: true,
    });
    render(<SpinnerComponent />);

    const modalElement = screen.getByRole('dialog');
    const loaderContainerElement = screen.getByRole('status').parentElement; // Get parent

    expect(modalElement.className.indexOf('modal') !== -1).toBeTruthy(); // Check class modal
    expect(
      loaderContainerElement.className.indexOf('loaderContainer') !== -1
    ).toBeTruthy(); // Check class loaderContainer
  });
});
