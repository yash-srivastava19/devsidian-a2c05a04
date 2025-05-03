
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus, Share2 } from 'lucide-react';

interface ProjectHeaderProps {
  project: Project;
  onShareClick: () => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project, onShareClick }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-sm mb-2">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Projects
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">{project.title}</span>
        </div>
        <h1 className="text-3xl font-handwritten font-bold">{project.title}</h1>
        <p className="text-muted-foreground mt-1">{project.description}</p>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onShareClick}
          className="notion-button"
        >
          <Share2 className="mr-1 h-4 w-4" />
          Share
        </Button>
        <Button asChild className="bg-theme-500 hover:bg-theme-400 text-white">
          <Link to={`/project/${project.id}/new-entry`}>
            <Plus className="mr-1 h-4 w-4" />
            Log Progress
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProjectHeader;
