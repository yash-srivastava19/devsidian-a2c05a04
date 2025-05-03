
import React from 'react';
import { Project, Entry } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MoodIcon from './MoodIcon';

interface ProjectStatsProps {
  project: Project;
  formatTime: (minutes: number) => string;
}

const ProjectStats: React.FC<ProjectStatsProps> = ({ project, formatTime }) => {
  const getMostCommonMood = (): Entry['mood'] | null => {
    if (project.entries.length === 0) return null;
    
    return Object.entries(
      project.entries.reduce((acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
        return acc;
      }, {} as Record<Entry['mood'], number>)
    ).sort((a, b) => b[1] - a[1])[0][0] as Entry['mood'];
  };

  const mostCommonMood = getMostCommonMood();

  return (
    <Card className="mt-4 notion-card border-theme-200">
      <CardHeader>
        <CardTitle className="font-handwritten">Project Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-1 font-handwritten">Total Time Spent</p>
            <p className="text-2xl font-bold">
              {formatTime(project.entries.reduce((acc, entry) => acc + entry.timeSpent, 0))}
            </p>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-1 font-handwritten">Average Session Length</p>
            <p className="text-lg">
              {project.entries.length > 0 
                ? formatTime(Math.round(project.entries.reduce((acc, entry) => acc + entry.timeSpent, 0) / project.entries.length)) 
                : '0m'}
            </p>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-1 font-handwritten">Most Common Mood</p>
            <div className="flex items-center">
              {project.entries.length > 0 && mostCommonMood ? (
                <>
                  <span className="text-xl mr-2">
                    <MoodIcon mood={mostCommonMood} />
                  </span>
                  <span className="capitalize">
                    {mostCommonMood}
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
  );
};

export default ProjectStats;
