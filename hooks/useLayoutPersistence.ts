import { useState, useEffect } from 'react';
import { layoutService } from '../services/layoutService';
import { Layout } from 'react-grid-layout';

const useLayoutPersistence = (
  key: string,
  defaultLayout: Layout[] = []
) => {
  const [layout, setLayout] = useState<Layout[]>(defaultLayout);
  const [isLoading, setIsLoading] = useState(true);

  // Load layout from persistence layer on mount
  useEffect(() => {
    const loadLayout = async () => {
      try {
        setIsLoading(true);
        const savedLayout = await layoutService.load(key);
        if (savedLayout) {
          setLayout(savedLayout);
        }
      } catch (error) {
        console.error(`Failed to load ${key} layout:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLayout();
  }, [key]);

  // Save layout to persistence layer
  const saveLayout = async (newLayout: Layout[]) => {
    try {
      setLayout(newLayout);
      await layoutService.save(key, newLayout);
      return true;
    } catch (error) {
      console.error(`Failed to save ${key} layout:`, error);
      return false;
    }
  };

  return {
    layout,
    isLoading,
    saveLayout,
  };
};

export default useLayoutPersistence;
