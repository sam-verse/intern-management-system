import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Users, Calendar } from "lucide-react";
import { DashboardNavigation } from "@/components/DashboardNavigation";
import { CreateProjectDialog } from "@/components/CreateProjectDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { listProjects } from "@/lib/api";

export default function AdminProjects() {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await listProjects({
          status: statusFilter === "all" ? undefined : statusFilter,
          search: searchTerm || undefined,
        });
        setProjects(data);
      } catch (err: any) {
        setError(err?.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    load();
    const onRefresh = () => load();
    window.addEventListener("projects:refresh", onRefresh);
    return () => window.removeEventListener("projects:refresh", onRefresh);
  }, [statusFilter, searchTerm]);

  const filteredProjects = useMemo(() => {
    return projects;
  }, [projects]);

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavigation userRole="admin" />
      
      <main className="container mx-auto px-8 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground">Manage and track all projects</p>
          </div>
          <Button onClick={() => setShowCreateProject(true)} className="bg-primary hover:bg-primary-hover">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {loading && <div className="py-16 text-center text-muted-foreground">Loading projects...</div>}
          {error && <div className="py-16 text-center text-red-600">{error}</div>}
          {!loading && !error && filteredProjects.map((project: any) => (
            <Card key={project.id} className="border shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                  <Badge variant="outline">{project.status}</Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                  </div>

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{project.interns.length} member{project.interns.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {project.due_date
                          ? `Due ${new Date(project.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                          : "No due date"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex -space-x-2">
                      {project.interns.map((intern: any, index: number) => (
                        <Avatar key={index} className="h-8 w-8 border-2 border-background">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {(intern.first_name?.[0] || intern.username?.[0] || "?").toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm">Manage</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-lg font-semibold text-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filters" 
                : "Create your first project to get started"}
            </p>
          </div>
        )}
      </main>

      <CreateProjectDialog 
        open={showCreateProject} 
        onOpenChange={setShowCreateProject} 
      />
    </div>
  );
}
