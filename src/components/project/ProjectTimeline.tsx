
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '@/types';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import TimelineEntry from './TimelineEntry';

interface ProjectTimelineProps {
  project: Project;
  formatDate: (dateString: string) => string;
  formatTime: (minutes: number) => string;
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ project, formatDate, formatTime }) => {
  return (
    <Card className="notion-card border-theme-200">
      <CardHeader>
        <CardTitle className="font-handwritten">Development Timeline</CardTitle>
        <CardDescription>
          Journey started on {formatDate(project.createdAt)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {project.entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-muted/50 rounded-lg p-8 text-center">
            <Calendar size={32} className="text-muted-foreground mb-2" />
            <h3 className="font-medium font-handwritten mb-2">No entries yet</h3>
            <p className="text-muted-foreground mb-4">Start logging your development progress.</p>
            <Button asChild size="sm" className="bg-theme-500 hover:bg-theme-400 text-white">
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
                <TimelineEntry 
                  key={entry.id} 
                  entry={entry} 
                  formatDate={formatDate} 
                  formatTime={formatTime} 
                />
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectTimeline;
