
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '@/services/projectService';
import { Project } from '@/types';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';
import { Calendar, Code, GitBranch, Plus } from 'lucide-react';

const Index = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Your Dev Journey</h1>
          <Button asChild>
            <Link to="/new-project">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p>Loading projects...</p>
          ) : projects.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center bg-muted/50 rounded-lg p-12 text-center">
              <Code size={48} className="text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-4">Start documenting your development journey by creating a new project.</p>
              <Button asChild>
                <Link to="/new-project">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Project
                </Link>
              </Button>
            </div>
          ) : (
            projects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>
                    <Link to={`/project/${project.id}`} className="hover:text-theme-500 transition-colors">
                      {project.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-theme-50 text-theme-500 dark:bg-theme-900 dark:text-theme-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>Created {formatDate(project.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <GitBranch size={14} className="mr-1" />
                      <span>{project.entries.length} entries</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link to={`/project/${project.id}`}>
                      View Journey
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
