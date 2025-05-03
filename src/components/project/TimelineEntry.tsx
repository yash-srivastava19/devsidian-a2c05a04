
import React from 'react';
import { Entry } from '@/types';
import { Clock, ExternalLink } from 'lucide-react';
import MoodIcon from './MoodIcon';

interface TimelineEntryProps {
  entry: Entry;
  formatDate: (dateString: string) => string;
  formatTime: (minutes: number) => string;
}

const TimelineEntry: React.FC<TimelineEntryProps> = ({ entry, formatDate, formatTime }) => {
  return (
    <div className="relative">
      <div className="timeline-dot" />
      <div className="bg-card border-theme-200 rounded-md p-4 notion-card">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg flex items-center gap-2 font-handwritten">
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
              <p className="text-sm font-medium font-handwritten">Resources:</p>
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
  );
};

export default TimelineEntry;
