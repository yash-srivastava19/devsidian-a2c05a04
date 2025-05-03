
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject } from '@/services/projectService';
import { Project, Entry } from '@/types';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { 
  Calendar, 
  Clock, 
  Code, 
  ExternalLink, 
  Github, 
  Plus, 
  Share2 
} from 'lucide-react';

const MoodIcon = ({ mood }: { mood: Entry['mood'] }) => {
  switch (mood) {
    case 'productive':
      return <span title="Productive">🚀</span>;
    case 'stuck':
      return <span title="Stuck">😓</span>;
    case 'learning':
      return <span title="Learning">📚</span>;
    case 'refactoring':
      return <span title="Refactoring">🔧</span>;
    case 'planning':
      return <span title="Planning">🗓️</span>;
    default:
      return null;
  }
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (id) {
          const data = await getProject(id);
          if (data) {
            setProject(data);
          }
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p>Loading project details...</p>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p>Project not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm mb-2">
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Projects
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">{project.title}</span>
            </div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-muted-foreground mt-1">{project.description}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-1 h-4 w-4" />
              Share
            </Button>
            <Button asChild>
              <Link to={`/project/${project.id}/new-entry`}>
                <Plus className="mr-1 h-4 w-4" />
                Log Progress
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-theme-50 text-theme-500 dark:bg-theme-900 dark:text-theme-200">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Development Timeline</CardTitle>
                <CardDescription>
                  Journey started on {formatDate(project.createdAt)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {project.entries.length === 0 ? (
                  <div className="flex flex-col items-center justify-center bg-muted/50 rounded-lg p-8 text-center">
                    <Calendar size={32} className="text-muted-foreground mb-2" />
                    <h3 className="font-medium mb-2">No entries yet</h3>
                    <p className="text-muted-foreground mb-4">Start logging your development progress.</p>
                    <Button asChild size="sm">
                      <Link to={`/project/${project.id}/new-entry`}>
                        Log Your First Entry
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="relative pl-8 space-y-8">
                    <div className="timeline-line" />
                    
                    {project.entries
                      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .map((entry) => (
                        <div key={entry.id} className="relative">
                          <div className="timeline-dot" />
                          <div className="bg-card border rounded-md p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-lg flex items-center gap-2">
                                {entry.title} 
                                <span className="text-xl"><MoodIcon mood={entry.mood} /></span>
                              </h3>
                              <time className="text-sm text-muted-foreground">
                                {formatDate(entry.createdAt)}
                              </time>
                            </div>
                            <div className="space-y-3">
                              <p className="text-sm">{entry.content}</p>
                              
                              {entry.codeSnippet && (
                                <pre className="code-snippet">
                                  <code>{entry.codeSnippet}</code>
                                </pre>
                              )}
                              
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock size={14} className="mr-1" />
                                <span>Time spent: {formatTime(entry.timeSpent)}</span>
                              </div>
                              
                              {entry.resources && entry.resources.length > 0 && (
                                <div className="space-y-1">
                                  <p className="text-sm font-medium">Resources:</p>
                                  <ul className="text-sm space-y-1">
                                    {entry.resources.map((resource, index) => (
                                      <li key={index}>
                                        <a 
                                          href={resource} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-theme-500 hover:underline flex items-center"
                                        >
                                          {resource.length > 50 ? resource.substring(0, 50) + '...' : resource}
                                          <ExternalLink size={12} className="ml-1" />
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Project Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Created</p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {formatDate(project.createdAt)}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Last Updated</p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {formatDate(project.updatedAt)}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Entries</p>
                  <p className="text-sm text-muted-foreground">
                    {project.entries.length} log entries
                  </p>
                </div>
                
                {project.githubUrl && (
                  <div>
                    <p className="text-sm font-medium mb-1">GitHub Repository</p>
                    <a 
                      href={project.githubUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-theme-500 hover:underline flex items-center"
                    >
                      <Github size={14} className="mr-1" />
                      View on GitHub
                      <ExternalLink size={12} className="ml-1" />
                    </a>
                  </div>
                )}
                
                {project.demoUrl && (
                  <div>
                    <p className="text-sm font-medium mb-1">Live Demo</p>
                    <a 
                      href={project.demoUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-theme-500 hover:underline flex items-center"
                    >
                      <ExternalLink size={14} className="mr-1" />
                      View Demo
                    </a>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/project/${project.id}/edit`}>
                    Edit Project Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Project Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-1">Total Time Spent</p>
                    <p className="text-2xl font-bold">
                      {formatTime(project.entries.reduce((acc, entry) => acc + entry.timeSpent, 0))}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Average Session Length</p>
                    <p className="text-lg">
                      {project.entries.length > 0 
                        ? formatTime(Math.round(project.entries.reduce((acc, entry) => acc + entry.timeSpent, 0) / project.entries.length)) 
                        : '0m'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Most Common Mood</p>
                    <div className="flex items-center">
                      {project.entries.length > 0 ? (
                        <>
                          <span className="text-xl mr-2">
                            <MoodIcon mood={(
                              Object.entries(
                                project.entries.reduce((acc, entry) => {
                                  acc[entry.mood] = (acc[entry.mood] || 0) + 1;
                                  return acc;
                                }, {} as Record<Entry['mood'], number>)
                              ).sort((a, b) => b[1] - a[1])[0][0] as Entry['mood']
                            )} />
                          </span>
                          <span className="capitalize">
                            {Object.entries(
                              project.entries.reduce((acc, entry) => {
                                acc[entry.mood] = (acc[entry.mood] || 0) + 1;
                                return acc;
                              }, {} as Record<Entry['mood'], number>)
                            ).sort((a, b) => b[1] - a[1])[0][0]}
                          </span>
                        </>
                      ) : (
                        'No data yet'
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
