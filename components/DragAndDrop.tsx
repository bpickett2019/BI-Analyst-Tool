import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

// Define the types for drag and drop
export const ItemTypes = {
  CHART: 'chart',
  FILTER: 'filter',
  TABLE: 'table',
  TEXT: 'text'
};

// Draggable component
interface DraggableItemProps {
  id: string;
  type: string;
  name: string;
  icon: string;
  children?: React.ReactNode;
  className?: string;
}

export const DraggableItem: React.FC<DraggableItemProps> = ({ 
  id, 
  type, 
  name, 
  icon, 
  children,
  className = ''
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { id, type, name, icon },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  if (children) {
    return (
      <div 
        ref={drag} 
        className={`${className} ${isDragging ? 'opacity-50' : ''}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div 
      ref={drag} 
      className={`component-card bg-white border border-gray-200 p-2 rounded flex flex-col items-center ${isDragging ? 'opacity-50' : ''} ${className}`}
    >
      <div className="w-8 h-8 flex items-center justify-center text-primary mb-1">
        <i className={`${icon} ri-lg`}></i>
      </div>
      <span className="text-xs">{name}</span>
    </div>
  );
};

// Drop zone component
interface DropZoneProps {
  id: string;
  accept: string[];
  onDrop: (item: any) => void;
  isActive?: boolean;
  children?: React.ReactNode;
  className?: string;
  emptyContent?: React.ReactNode;
}

export const DropZone: React.FC<DropZoneProps> = ({ 
  id, 
  accept, 
  onDrop, 
  isActive = false, 
  children,
  className = '',
  emptyContent 
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept,
    drop: (item) => {
      onDrop(item);
      return { id };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  }));

  const isDroppable = isOver && canDrop;

  return (
    <div 
      ref={drop} 
      className={`
        drop-zone 
        ${isActive ? 'active' : ''} 
        ${isDroppable ? 'can-drop' : ''} 
        ${className}
      `}
    >
      {children || (emptyContent || (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <i className="ri-drag-drop-line text-gray-300 text-3xl mb-2"></i>
          <span className="text-gray-400 text-sm">Drop components here</span>
        </div>
      ))}
    </div>
  );
};