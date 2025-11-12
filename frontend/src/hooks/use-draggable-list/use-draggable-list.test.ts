import { act, renderHook } from '@testing-library/react';

import useDraggableList from './use-draggable-list';

describe('useDraggableList', () => {
  const initialItems = ['a', 'b', 'c', 'd'];

  it('should initialize with provided items', () => {
    const { result } = renderHook(() => useDraggableList(initialItems));
    expect(result.current.currentItems).toEqual(initialItems);
  });

  it('should update currentItems when items prop changes', () => {
    const { result, rerender } = renderHook(
      ({ items }) => useDraggableList(items),
      { initialProps: { items: initialItems } },
    );
    const newItems = ['x', 'y', 'z'];
    rerender({ items: newItems });
    expect(result.current.currentItems).toEqual(newItems);
  });

  it('should set draggedIndex on handleDragStart', () => {
    const { result } = renderHook(() => useDraggableList(initialItems));
    act(() => {
      result.current.handleDragStart(2)();
    });
    // Dragged index is not exposed, but checkIfDragging should reflect it
    expect(result.current.checkIfDragging(2)).toBe(true);
    expect(result.current.checkIfDragging(1)).toBe(false);
  });

  it('should reorder items on handleDragOver', () => {
    const { result } = renderHook(() => useDraggableList(initialItems));
    act(() => {
      result.current.handleDragStart(1)();
    });
    act(() => {
      // Simulate drag over index 3
      result.current.handleDragOver(3)({
        preventDefault: () => {},
      } as React.DragEvent<HTMLElement>);
    });
    expect(result.current.currentItems).toEqual(['a', 'c', 'd', 'b']);
    // Dragged index should now be 3
    expect(result.current.checkIfDragging(3)).toBe(true);
  });

  it('should not reorder if draggedIndex is null or same as target', () => {
    const { result } = renderHook(() => useDraggableList(initialItems));
    // Drag over without drag start
    act(() => {
      result.current.handleDragOver(2)({
        preventDefault: () => {},
      } as React.DragEvent<HTMLElement>);
    });
    expect(result.current.currentItems).toEqual(initialItems);

    // Drag start and drag over same index
    act(() => {
      result.current.handleDragStart(1)();
      result.current.handleDragOver(1)({
        preventDefault: () => {},
      } as React.DragEvent<HTMLElement>);
    });
    expect(result.current.currentItems).toEqual(initialItems);
  });

  it('should call onDragEnd with reordered items', () => {
    const onDragEnd = vi.fn();
    const { result } = renderHook(() =>
      useDraggableList(initialItems, onDragEnd),
    );
    act(() => {
      result.current.handleDragStart(0)();
      result.current.handleDragOver(2)({
        preventDefault: () => {},
      } as React.DragEvent<HTMLElement>);
      result.current.handleDragEnd();
    });
    expect(onDragEnd).toHaveBeenCalledWith(['a', 'b', 'c', 'd']);
    expect(result.current.checkIfDragging(2)).toBe(false);
  });
});
