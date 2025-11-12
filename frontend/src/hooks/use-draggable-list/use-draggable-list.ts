import { useEffect, useState } from 'react';

const useDraggableList = <T>(
  items: T[],
  onDragEnd?: (reorderedItems: T[]) => void,
) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [currentItems, setCurrentItems] = useState<T[]>([]);

  useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  const handleDragStart = (index: number) => () => setDraggedIndex(index);

  const handleDragOver =
    (index: number) => (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();

      if (draggedIndex === null || draggedIndex === index) return;
      const newItems = [...currentItems];
      const [removed] = newItems.splice(draggedIndex, 1);
      newItems.splice(index, 0, removed);
      setDraggedIndex(index);
      setCurrentItems(newItems);
    };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    if (onDragEnd) {
      onDragEnd(currentItems);
    }
  };

  const checkIfDragging = (index: number) => draggedIndex === index;

  return {
    currentItems,
    checkIfDragging,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};

export default useDraggableList;
