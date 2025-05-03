
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProject } from '@/services/projectService';
import { Project } from '@/types';
import Layout from '@/components/Layout';
import ShareProject from '@/components/ShareProject';
import ProjectHeader from '@/components/project/ProjectHeader';
import ProjectTags from '@/components/project/ProjectTags';
import ProjectTimeline from '@/components/project/ProjectTimeline';
import ProjectInfo from '@/components/project/ProjectInfo';
import ProjectStats from '@/components/project/ProjectStats';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

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
        <ProjectHeader 
          project={project} 
          onShareClick={() => setShareDialogOpen(true)} 
        />

        <ProjectTags tags={project.tags} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ProjectTimeline 
              project={project} 
              formatDate={formatDate} 
              formatTime={formatTime} 
            />
          </div>
          
          <div>
            <ProjectInfo project={project} formatDate={formatDate} />
            <ProjectStats project={project} formatTime={formatTime} />
          </div>
        </div>
        
        {project && (
          <ShareProject
            project={project}
            isOpen={shareDialogOpen}
            onClose={() => setShareDialogOpen(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default ProjectDetail;
