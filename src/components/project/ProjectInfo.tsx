
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '@/types';
import { Calendar, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface ProjectInfoProps {
  project: Project;
  formatDate: (dateString: string) => string;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ project, formatDate }) => {
  return (
    <Card className="notion-card border-theme-200">
      <CardHeader>
        <CardTitle className="font-handwritten">Project Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-1 font-handwritten">Created</p>
          <p className="text-sm text-muted-foreground flex items-center">
            <Calendar size={14} className="mr-1" />
            {formatDate(project.createdAt)}
          </p>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-1 font-handwritten">Last Updated</p>
          <p className="text-sm text-muted-foreground flex items-center">
            <Calendar size={14} className="mr-1" />
            {formatDate(project.updatedAt)}
          </p>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-1 font-handwritten">Entries</p>
          <p className="text-sm text-muted-foreground">
            {project.entries.length} log entries
          </p>
        </div>
        
        {project.githubUrl && (
          <div>
            <p className="text-sm font-medium mb-1 font-handwritten">GitHub Repository</p>
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
            <p className="text-sm font-medium mb-1 font-handwritten">Live Demo</p>
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
        <Button variant="outline" className="w-full notion-button" asChild>
          <Link to={`/project/${project.id}/edit`}>
            Edit Project Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectInfo;
