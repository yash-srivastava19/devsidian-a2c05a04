
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ProjectTagsProps {
  tags: string[];
}

const ProjectTags: React.FC<ProjectTagsProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag, index) => (
        <Badge 
          key={index} 
          variant="secondary" 
          className="bg-theme-50 text-theme-500 dark:bg-theme-900 dark:text-theme-200 font-handwritten"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default ProjectTags;
