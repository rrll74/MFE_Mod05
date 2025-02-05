import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component'; // Importa tu componente

describe('ConfirmationDialogComponent', () => {
  let mockOnAccept: jest.Mock;
  let mockOnClose: jest.Mock;
  const testLabels = { closeButton: 'Cancelar', acceptButton: 'Aceptar' };

  beforeEach(() => {
    mockOnAccept = jest.fn();
    mockOnClose = jest.fn();
  });

  it('should render the dialog with correct title and content', () => {
    // Arrange

    // Act
    render(
      <ConfirmationDialogComponent
        isOpen={true}
        onAccept={mockOnAccept}
        onClose={mockOnClose}
        title="Test Title"
        labels={testLabels}
        children={<p>Test Content</p>}
      />
    );

    // Assert
    expect(screen.getByRole('dialog')).toBeVisible();
    expect(
      screen.getByRole('heading', { name: 'Test Title' })
    ).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should call onClose when the close button is clicked', () => {
    // Arrange

    // Act
    render(
      <ConfirmationDialogComponent
        isOpen={true}
        onAccept={mockOnAccept}
        onClose={mockOnClose}
        title="Test Title"
        labels={testLabels}
        children={<p>Test Content</p>}
      />
    );

    const cancelButton = screen.getByRole('button', { name: 'Cancelar' });
    fireEvent.click(cancelButton);

    // Assert
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnAccept).not.toHaveBeenCalled();
  });

  it('should call onAccept when the accept button is clicked', () => {
    // Arrange

    // Act
    render(
      <ConfirmationDialogComponent
        isOpen={true}
        onAccept={mockOnAccept}
        onClose={mockOnClose}
        title="Test Title"
        labels={testLabels}
        children={<p>Test Content</p>}
      />
    );

    const acceptButton = screen.getByRole('button', { name: 'Aceptar' });
    fireEvent.click(acceptButton);

    // Assert
    expect(mockOnAccept).toHaveBeenCalledTimes(1);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should not render the dialog when isOpen is false', () => {
    // Arrange

    // Act
    render(
      <ConfirmationDialogComponent
        isOpen={false}
        onAccept={mockOnAccept}
        onClose={mockOnClose}
        title="Test Title"
        labels={testLabels}
        children={<p>Test Content</p>}
      />
    );

    // Assert
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument(); // queryByRole because this element could not be there
  });

  it('should render custom title content (ReactNode)', () => {
    // Arrange

    // Act
    const titleContent = <div>My Title</div>;
    render(
      <ConfirmationDialogComponent
        isOpen={true}
        onAccept={mockOnAccept}
        onClose={mockOnClose}
        title={titleContent} // Set a ReactNode
        labels={testLabels}
        children={<p>Test Content</p>}
      />
    );

    // Assert
    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('should render labels correctly', () => {
    // Arrange

    // Act
    const customLabels = { closeButton: 'Cerrar', acceptButton: 'Confirmar' };
    render(
      <ConfirmationDialogComponent
        isOpen={true}
        onAccept={mockOnAccept}
        onClose={mockOnClose}
        title="Test Title"
        labels={customLabels}
        children={<p>Test Content</p>}
      />
    );

    // Assert
    expect(screen.getByRole('button', { name: 'Cerrar' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Confirmar' })
    ).toBeInTheDocument();
  });
});
