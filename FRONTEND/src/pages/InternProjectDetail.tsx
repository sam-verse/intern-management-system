import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardNavigation } from "@/components/DashboardNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

type Project = {
  id: number;
  title: string;
  description: string;
  status: string;
  progress: number;
  myRole: string;
  dueDate: string;
};

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "E-commerce Mobile App",
    description:
      "Building a React Native app for online shopping with payment integration. Includes auth, catalog, cart, payments, and order tracking.",
    status: "In Progress",
    progress: 65,
    myRole: "Frontend Developer",
    dueDate: "2024-10-15",
  },
  {
    id: 2,
    title: "Data Analytics Dashboard",
    description:
      "Creating interactive charts and data visualization tools using React, Charting libs, and REST APIs.",
    status: "Planning",
    progress: 25,
    myRole: "Data Analyst",
    dueDate: "2024-11-01",
  },
];

const InternProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = useMemo(() => {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) return undefined;
    return MOCK_PROJECTS.find((p) => p.id === numericId);
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavigation userRole="intern" />

      {/* Back button positioned below the header, outside the main content container */}
      <div className="container mx-auto px-6 pt-4 max-w-7xl">
        <Button variant="ghost" className="px-0 text-foreground hover:text-orange-500 hover:bg-transparent" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>

      <div className="container mx-auto px-6 pb-8 max-w-5xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Project Details</h1>
            <p className="text-muted-foreground">View information about your project</p>
          </div>
        </div>

        {!project ? (
          <Card className="border shadow-sm">
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Project not found</h3>
              <p className="text-muted-foreground mb-4">The project you are looking for does not exist.</p>
              <Button onClick={() => navigate("/intern/projects")}>Go to Projects</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="border shadow-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-foreground">{project.title}</CardTitle>
                    <div className="mt-2 flex items-center gap-3">
                      <Badge variant="outline">{project.status}</Badge>
                      <span className="text-sm text-muted-foreground">Role: {project.myRole}</span>
                      <span className="text-sm text-muted-foreground">Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">{project.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Overall Progress</span>
                    <span className="text-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>

                {/* Placeholder sections for tasks, mentors, files, etc. */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border">
                    <CardHeader>
                      <CardTitle className="text-base">Tasks</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Link upcoming tasks, checklists, and status here.
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader>
                      <CardTitle className="text-base">Mentor Notes</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Display mentor feedback and guidance here.
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternProjectDetail;


