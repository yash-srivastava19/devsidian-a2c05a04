
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy, Share2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Project } from '@/types';

interface ShareProjectProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ShareProject: React.FC<ShareProjectProps> = ({ project, isOpen, onClose }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/project/${project.id}`;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied",
        description: "The project link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `DevJourney: ${project.title}`,
          text: `Check out my developer journey for ${project.title}!`,
          url: shareUrl,
        });
        toast({
          title: "Shared successfully",
          description: "Your project has been shared.",
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast({
            title: "Failed to share",
            description: "There was an error sharing your project.",
            variant: "destructive",
          });
        }
      }
    } else {
      handleCopyLink();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="handwritten text-xl">Share Your Journey</DialogTitle>
          <DialogDescription>
            Share your development journey for "{project.title}" with others.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="embed">Embed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="link" className="mt-4">
            <div className="flex items-center space-x-2">
              <Input 
                readOnly 
                value={shareUrl}
                className="flex-1"
              />
              <Button 
                size="icon" 
                onClick={handleCopyLink}
                variant="outline"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="embed" className="mt-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Copy this code to embed your project timeline on your personal website or blog.
              </p>
              <div className="bg-theme-50 dark:bg-theme-900 p-3 rounded-md border border-theme-100 dark:border-theme-800">
                <code className="text-sm break-all">
                  {`<iframe src="${shareUrl}/embed" width="100%" height="500" style="border: 1px solid #eaeaea; border-radius: 8px;" title="${project.title} Dev Journey"></iframe>`}
                </code>
              </div>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `<iframe src="${shareUrl}/embed" width="100%" height="500" style="border: 1px solid #eaeaea; border-radius: 8px;" title="${project.title} Dev Journey"></iframe>`
                  );
                  toast({
                    title: "Embed code copied",
                    description: "The embed code has been copied to your clipboard.",
                  });
                }}
              >
                Copy Embed Code
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {navigator.share && (
            <Button onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareProject;
