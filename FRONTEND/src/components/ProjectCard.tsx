import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Intern {
  name: string;
  avatar: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  progress: number;
  interns: Intern[];
  dueDate: string;
  lastUpdate: string;
}

interface ProjectCardProps {
  project: Project;
  userRole: "admin" | "intern";
}

export const ProjectCard = ({ project, userRole }: ProjectCardProps) => {
  const navigate = useNavigate();
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-status-completed/10 text-status-completed border-status-completed/20';
      case 'in progress':
        return 'bg-status-in-progress/10 text-status-in-progress border-status-in-progress/20';
      case 'blocked':
        return 'bg-status-blocked/10 text-status-blocked border-status-blocked/20';
      case 'planning':
        return 'bg-status-pending/10 text-status-pending-foreground border-status-pending/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="group bg-gradient-card border border-border/50 rounded-2xl p-7 shadow-card hover:shadow-elevated transition-all duration-300 hover:border-primary/30 cursor-pointer">
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
        <Badge variant="outline" className={`ml-4 font-semibold ${getStatusColor(project.status)}`}>
          {project.status}
        </Badge>
      </div>

      {/* Progress */}
      <div className="space-y-3 mb-5">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">Progress</span>
          <span className="text-sm font-bold text-foreground">{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="h-2" />
      </div>

      {/* Meta Info */}
      <div className="flex items-center justify-between text-sm mb-5">
        <div className="flex items-center gap-2 text-muted-foreground font-medium">
          <Users className="h-4 w-4" />
          <span>{project.interns.length} member{project.interns.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground font-medium">
          <Calendar className="h-4 w-4" />
          <span>{new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Team Avatars & Action */}
      <div className="flex items-center justify-between pt-5 border-t border-border/50">
        <div className="flex -space-x-2">
          {project.interns.slice(0, 4).map((intern, index) => (
            <Avatar key={index} className="h-8 w-8 border-2 border-background">
              <AvatarFallback className="text-xs bg-primary/10 text-primary font-medium">
                {intern.avatar}
              </AvatarFallback>
            </Avatar>
          ))}
          {project.interns.length > 4 && (
            <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground">+{project.interns.length - 4}</span>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 group-hover:gap-3 transition-all font-semibold group-hover:text-primary"
          onClick={(e) => {
            e.stopPropagation();
            if (userRole === "intern") {
              navigate(`/intern/projects/${project.id}`);
            }
          }}
        >
          View
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};
