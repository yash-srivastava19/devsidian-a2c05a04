
import { Project, Entry } from '@/types';

// Mock data - would be replaced with actual API calls
let projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with React, Node.js and MongoDB',
    createdAt: '2024-04-28T12:00:00Z',
    updatedAt: '2024-05-02T15:30:00Z',
    userId: 'user1',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com/username/ecommerce',
    demoUrl: 'https://myecommerce-demo.com',
    isPublic: true,
    entries: [
      {
        id: 'e1',
        projectId: '1',
        title: 'Initial project setup',
        content: 'Today I set up the React project using Vite and configured the basic file structure. Installed necessary dependencies including React Router and Tailwind CSS.',
        createdAt: '2024-04-28T14:30:00Z',
        mood: 'productive',
        timeSpent: 120,
        codeSnippet: `npm create vite@latest my-project -- --template react-ts\ncd my-project\nnpm install\nnpm install react-router-dom tailwindcss`,
        resources: ['https://vitejs.dev/guide/', 'https://tailwindcss.com/docs/installation'],
      },
      {
        id: 'e2',
        projectId: '1',
        title: 'User authentication implementation',
        content: 'Implemented user authentication with JWT. Created login and signup forms, and set up authentication context for managing user state throughout the app.',
        createdAt: '2024-04-30T10:15:00Z',
        mood: 'learning',
        timeSpent: 180,
        codeSnippet: `const login = async (email, password) => {\n  const response = await fetch('/api/login', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ email, password })\n  });\n  return response.json();\n};`,
        resources: ['https://jwt.io/introduction'],
      },
      {
        id: 'e3',
        projectId: '1',
        title: 'Product listing page',
        content: 'Created product listing page with filtering and sorting functionality. Implemented pagination to handle large datasets efficiently.',
        createdAt: '2024-05-02T15:30:00Z',
        mood: 'productive',
        timeSpent: 240,
        resources: ['https://reactjs.org/docs/hooks-effect.html'],
      }
    ]
  },
  {
    id: '2',
    title: 'Weather Dashboard',
    description: 'A weather dashboard using OpenWeatherMap API with React',
    createdAt: '2024-04-25T09:00:00Z',
    updatedAt: '2024-05-01T11:20:00Z',
    userId: 'user1',
    tags: ['React', 'API Integration', 'Tailwind CSS'],
    githubUrl: 'https://github.com/username/weather-app',
    isPublic: true,
    entries: [
      {
        id: 'e4',
        projectId: '2',
        title: 'Project initialization',
        content: 'Started a new React project for a weather dashboard. Set up the basic structure and installed dependencies.',
        createdAt: '2024-04-25T10:30:00Z',
        mood: 'planning',
        timeSpent: 60,
      },
      {
        id: 'e5',
        projectId: '2',
        title: 'API integration',
        content: 'Integrated OpenWeatherMap API. Created service to fetch current weather and forecast data.',
        createdAt: '2024-04-27T14:00:00Z',
        mood: 'learning',
        timeSpent: 150,
        codeSnippet: `const fetchWeatherData = async (city) => {\n  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;\n  const response = await fetch(\n    \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}&units=metric\`\n  );\n  return response.json();\n};`,
      },
      {
        id: 'e6',
        projectId: '2',
        title: 'UI design implementation',
        content: 'Designed and implemented the UI using Tailwind CSS. Created responsive layout for different device sizes.',
        createdAt: '2024-05-01T11:20:00Z',
        mood: 'productive',
        timeSpent: 180,
      }
    ]
  }
];

export const getProjects = (): Promise<Project[]> => {
  return Promise.resolve(projects);
};

export const getProject = (id: string): Promise<Project | undefined> => {
  return Promise.resolve(projects.find(project => project.id === id));
};

export const createProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'entries'>): Promise<Project> => {
  const newProject: Project = {
    ...project,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    entries: []
  };
  
  projects = [...projects, newProject];
  return Promise.resolve(newProject);
};

export const addEntry = (projectId: string, entry: Omit<Entry, 'id' | 'projectId' | 'createdAt'>): Promise<Entry> => {
  const newEntry: Entry = {
    ...entry,
    id: Math.random().toString(36).substring(2, 9),
    projectId,
    createdAt: new Date().toISOString()
  };
  
  projects = projects.map(project => {
    if (project.id === projectId) {
      return {
        ...project,
        entries: [...project.entries, newEntry],
        updatedAt: new Date().toISOString()
      };
    }
    return project;
  });
  
  return Promise.resolve(newEntry);
};
