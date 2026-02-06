import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { uuidv4 } from '../lib/utils';

export interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  images: string[];
  brochureUrl?: string; // URL or base64
  estimatedCompletion: string; // ISO Date string YYYY-MM-DD
  startDate: string; // ISO Date string YYYY-MM-DD (for auto calculation)
  progress: number; // 0-100
  autoProgress: boolean;
  status: 'Planning' | 'Under Construction' | 'Completed';
  createdAt: string;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProjectById: (id: string) => Project | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('kb_projects');
    if (saved) return JSON.parse(saved);
    
    // Default Seed Data
    return [
      {
        id: '1',
        title: "Vipingo Development",
        location: "Vipingo, Kilifi",
        description: "An exclusive gated community featuring modern swahili-inspired villas, an 18-hole golf course, and private beach access. The epitome of coastal luxury living.",
        progress: 75,
        status: "Under Construction",
        estimatedCompletion: "2026-12-31",
        startDate: "2024-01-01",
        autoProgress: false,
        images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop"],
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: "The Nairobi Heights",
        location: "Upper Hill, Nairobi",
        description: "A 35-story residential tower redefining the Nairobi skyline. Smart-home enabled apartments with panoramic city views and world-class amenities.",
        progress: 40,
        status: "Under Construction",
        estimatedCompletion: "2027-06-30",
        startDate: "2025-01-01",
        autoProgress: true,
        images: ["https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop"],
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: "Dubai Marina Pearl",
        location: "Dubai Marina, UAE",
        description: "Ultra-luxury waterfront residences. Experience the future of living with sustainable architecture and unparalleled service in the heart of Dubai.",
        progress: 90,
        status: "Completed",
        estimatedCompletion: "2026-03-31",
        startDate: "2023-01-01",
        autoProgress: false,
        images: ["https://images.unsplash.com/photo-1512453979798-5ea904ac66de?q=80&w=2009&auto=format&fit=crop"],
        createdAt: new Date().toISOString()
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('kb_projects', JSON.stringify(projects));
  }, [projects]);

  // Auto-update progress for autoProgress projects
  useEffect(() => {
    const updateProgress = () => {
      setProjects(prevProjects => prevProjects.map(project => {
        if (project.autoProgress && project.status !== 'Completed') {
          const start = new Date(project.startDate).getTime();
          const end = new Date(project.estimatedCompletion).getTime();
          const now = new Date().getTime();
          
          if (now >= end) {
             return { ...project, progress: 100 };
          }
          
          if (now <= start) {
            return { ...project, progress: 0 };
          }

          const totalDuration = end - start;
          const elapsed = now - start;
          const newProgress = Math.min(Math.round((elapsed / totalDuration) * 100), 100);
          
          if (newProgress !== project.progress) {
            return { ...project, progress: newProgress };
          }
        }
        return project;
      }));
    };

    updateProgress(); // Run on mount
    const interval = setInterval(updateProgress, 1000 * 60 * 60); // Run every hour
    return () => clearInterval(interval);
  }, []);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const getProjectById = (id: string) => {
    return projects.find(p => p.id === id);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject, getProjectById }}>
      {children}
    </ProjectContext.Provider>
  );
};
