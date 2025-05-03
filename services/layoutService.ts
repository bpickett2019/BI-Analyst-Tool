import { Layout } from 'react-grid-layout';

/**
 * Layout service interface
 * This can be extended in the future to support remote storage
 */
export interface ILayoutService {
  save(key: string, layout: Layout[]): Promise<boolean>;
  load(key: string): Promise<Layout[] | null>;
}

/**
 * Local storage implementation of layout service
 */
class LocalStorageLayoutService implements ILayoutService {
  private getStorageKey(key: string): string {
    return `insightflow_layout_${key}`;
  }

  async save(key: string, layout: Layout[]): Promise<boolean> {
    try {
      const storageKey = this.getStorageKey(key);
      localStorage.setItem(storageKey, JSON.stringify({
        layout,
        timestamp: new Date().toISOString()
      }));
      return true;
    } catch (error) {
      console.error('Failed to save layout to localStorage:', error);
      return false;
    }
  }

  async load(key: string): Promise<Layout[] | null> {
    try {
      const storageKey = this.getStorageKey(key);
      const data = localStorage.getItem(storageKey);
      if (!data) return null;
      
      const parsedData = JSON.parse(data);
      return parsedData.layout;
    } catch (error) {
      console.error('Failed to load layout from localStorage:', error);
      return null;
    }
  }
}

/**
 * Remote API implementation of layout service
 * This can be implemented later when backend is available
 */
class RemoteLayoutService implements ILayoutService {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async save(key: string, layout: Layout[]): Promise<boolean> {
    try {
      // This is a placeholder for future API implementation
      // const response = await fetch(`${this.apiUrl}/layouts/${key}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     layout,
      //     timestamp: new Date().toISOString()
      //   }),
      // });
      // return response.ok;
      
      // For now, fall back to localStorage
      return await localStorageService.save(key, layout);
    } catch (error) {
      console.error('Failed to save layout to remote API:', error);
      return false;
    }
  }

  async load(key: string): Promise<Layout[] | null> {
    try {
      // This is a placeholder for future API implementation
      // const response = await fetch(`${this.apiUrl}/layouts/${key}`);
      // if (!response.ok) return null;
      // const data = await response.json();
      // return data.layout;
      
      // For now, fall back to localStorage
      return await localStorageService.load(key);
    } catch (error) {
      console.error('Failed to load layout from remote API:', error);
      return null;
    }
  }
}

// Create singleton instances
const localStorageService = new LocalStorageLayoutService();
const remoteStorageService = new RemoteLayoutService('/api');

// Export the service we want to use
// This can be easily switched between local and remote
export const layoutService: ILayoutService = localStorageService;
