import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus, 
  Users, 
  FolderOpen, 
  Clock,
  CheckCircle
} from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { CreateProjectDialog } from "@/components/CreateProjectDialog";
import { DashboardNavigation } from "@/components/DashboardNavigation";

const AdminDashboard = () => {
  const [showCreateProject, setShowCreateProject] = useState(false);
  
  const projects = [
    {
      id: 1,
      title: "E-commerce Mobile App",
      description: "Building a React Native app for online shopping",
      status: "In Progress",
      progress: 65,
      interns: [
        { name: "Sarah Chen", avatar: "SC" },
        { name: "Mike Johnson", avatar: "MJ" }
      ],
      dueDate: "2024-10-15",
      lastUpdate: "2 hours ago"
    },
    {
      id: 2,
      title: "Data Analytics Dashboard",
      description: "Creating interactive charts and visualization tools",
      status: "Planning",
      progress: 25,
      interns: [
        { name: "Alex Rivera", avatar: "AR" },
        { name: "Emma Wilson", avatar: "EW" }
      ],
      dueDate: "2024-11-01",
      lastUpdate: "1 day ago"
    }
  ];

  const recentUpdates = [
    {
      id: 1,
      intern: "Sarah Chen",
      project: "E-commerce Mobile App",
      update: "Completed payment gateway integration",
      timestamp: "2 hours ago",
      status: "Completed"
    },
    {
      id: 2,
      intern: "Alex Rivera",
      project: "Data Analytics Dashboard",
      update: "Working on chart component library",
      timestamp: "4 hours ago",
      status: "In Progress"
    }
  ];

  const stats = [
    { title: "Active Projects", value: "12", icon: FolderOpen },
    { title: "Total Interns", value: "28", icon: Users },
    { title: "Pending Reviews", value: "5", icon: Clock },
    { title: "Completed", value: "18", icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavigation userRole="admin" />
      
      <main className="container mx-auto px-8 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening today</p>
          </div>
          <Button onClick={() => setShowCreateProject(true)} className="bg-primary hover:bg-primary-hover">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border border-border/60 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-primary rounded-lg">
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Projects */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Active Projects</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <div className="space-y-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} userRole="admin" />
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
            
            <Card className="border border-border/60 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20">
              <CardContent className="p-6 space-y-4">
                {recentUpdates.map((update) => (
                  <div key={update.id} className="pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {update.intern.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-foreground">{update.intern}</p>
                          <Badge variant="outline" className="text-xs">{update.status}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{update.project}</p>
                        <p className="text-sm text-foreground">{update.update}</p>
                        <p className="text-xs text-muted-foreground mt-1">{update.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <CreateProjectDialog 
        open={showCreateProject} 
        onOpenChange={setShowCreateProject} 
      />
    </div>
  );
};

export default AdminDashboard;
