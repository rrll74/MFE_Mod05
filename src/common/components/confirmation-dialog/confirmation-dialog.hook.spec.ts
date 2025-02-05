import { renderHook, act } from '@testing-library/react-hooks';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { createEmptyLookup } from 'common/models';

describe('useConfirmationDialog', () => {
  it('should initialize isOpen to false and itemToDelete to an empty lookup', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    const { isOpen, itemToDelete } = result.current;

    // Assert
    expect(isOpen).toBe(false);
    expect(itemToDelete).toEqual(createEmptyLookup());
  });

  it('should set isOpen to true and itemToDelete to the provided item when onOpenDialog is called', () => {
    // Arrange
    const testItem = { id: '1', name: 'Test Item' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(testItem);
    });

    const { isOpen, itemToDelete } = result.current;

    // Assert
    expect(isOpen).toBe(true);
    expect(itemToDelete).toEqual(testItem);
  });

  it('should set isOpen to false when onClose is called', () => {
    // Arrange
    const testItem = { id: '1', name: 'Test Item' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(testItem);
    });

    act(() => {
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toBe(false);
  });

  it('should set itemToDelete to an empty lookup when onAccept is called', () => {
    // Arrange
    const testItem = { id: '1', name: 'Test Item' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(testItem);
    });

    act(() => {
      result.current.onAccept();
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('should call onClose after onAccept', () => {
    //Arrange
    const testItem = { id: '1', name: 'Test Item' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(testItem);
    });

    act(() => {
      result.current.onAccept();
    });

    // Assert
    expect(result.current.isOpen).toBe(false);
  });
});
