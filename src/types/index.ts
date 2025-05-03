
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  isPublic: boolean;
  entries: Entry[];
}

export interface Entry {
  id: string;
  projectId: string;
  title: string;
  content: string;
  createdAt: string;
  mood: 'productive' | 'stuck' | 'learning' | 'refactoring' | 'planning';
  timeSpent: number; // minutes
  codeSnippet?: string;
  resources?: string[];
}
