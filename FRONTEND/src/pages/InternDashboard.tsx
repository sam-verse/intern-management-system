import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  BookOpen,
  CheckCircle,
  Clock,
  TrendingUp
} from "lucide-react";
import { DashboardNavigation } from "@/components/DashboardNavigation";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const InternDashboard = () => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const navigate = useNavigate();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [updateData, setUpdateData] = useState({
    summary: "",
    status: "",
    notes: ""
  });
  
  const userName = localStorage.getItem("userName") || "Intern";
  
  const assignedProjects = [
    {
      id: 1,
      title: "E-commerce Mobile App",
      description: "Building a React Native app for online shopping",
      status: "In Progress",
      progress: 65,
      dueDate: "2024-10-15"
    },
    {
      id: 2,
      title: "Data Analytics Dashboard",
      description: "Creating interactive charts and visualization tools",
      status: "Planning",
      progress: 25,
      dueDate: "2024-11-01"
    }
  ];

  const stats = [
    { title: "Active Projects", value: "2", icon: BookOpen },
    { title: "Completed Tasks", value: "8", icon: CheckCircle },
    { title: "Pending Reviews", value: "3", icon: Clock },
    { title: "Overall Progress", value: "72%", icon: TrendingUp }
  ];

  const recentFeedback = [
    {
      id: 1,
      from: "Sarah Wilson",
      project: "E-commerce Mobile App",
      feedback: "Great progress on the payment integration!",
      timestamp: "2 hours ago"
    }
  ];

  const handleSubmitUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowUpdateForm(false);
    setUpdateData({ summary: "", status: "", notes: "" });
    setIsConfirmOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <DashboardNavigation userRole="intern" />

      {/* Hero Banner */}
      <section className="pt-20 pb-10 px-8 bg-background/40">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>
                Welcome back, <span className="text-primary">{userName}</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl mb-6" style={{ fontWeight: 300 }}>
                Track projects, share updates, and level up your internship journey.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => setShowUpdateForm(!showUpdateForm)} className="bg-primary hover:bg-primary-hover">
                  <Plus className="h-4 w-4 mr-2" /> Submit Update
                </Button>
                <Button variant="outline" className="" onClick={() => navigate('/intern/projects')}>View My Projects</Button>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
                <div className="order-1 flex-1 flex justify-center items-center w-full max-w-xl inset-4">
          <img
            src="/profile-img/profile.png"
            alt="Internship program hero"
            className="w-full h-auto object-cover rounded-3xl"
            style={{ maxHeight: '420px', minWidth: '260px', boxShadow: '0 0 60px hsl(var(--primary) / 0.25)' }}
          />
        </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Update Form - Modal */}
      <Dialog open={showUpdateForm} onOpenChange={setShowUpdateForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Update</DialogTitle>
            <DialogDescription>Share your current status and a brief summary.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitUpdate} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={updateData.status} onValueChange={(value) => setUpdateData({ ...updateData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Summary</label>
              <Textarea
                placeholder="Describe what you've been working on..."
                value={updateData.summary}
                onChange={(e) => setUpdateData({ ...updateData, summary: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="bg-primary hover:bg-primary-hover">Submit</Button>
              <Button type="button" variant="outline" onClick={() => setShowUpdateForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-10 max-w-7xl space-y-10">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <Card className="border border-white/10 bg-gradient-card shadow-card transition-all duration-500 ease-out group-hover:-translate-y-1 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-3xl font-semibold text-foreground">{stat.value}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-primary/10 text-primary shadow-orange-sm">
                      <stat.icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Projects */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">My Projects</h2>
              <Button variant="ghost" className="hover:bg-white/10" onClick={() => navigate('/intern/projects')}>View All</Button>
            </div>
            <div className="space-y-4">
              {assignedProjects.map((project) => (
                <Card key={project.id} className="border border-white/10 bg-gradient-glass shadow-elevated transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-md hover:shadow-primary/10 hover:border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                      <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">{project.status}</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground">{project.progress}%</span>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-0 rounded-md bg-gradient-primary opacity-10" />
                        <Progress value={project.progress} />
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border/50 flex justify-between text-sm text-muted-foreground">
                      <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-white/10 hover:text-orange-500"
                        onClick={() => navigate(`/intern/projects/${project.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Recent Feedback</h2>
            <Card className="border border-white/10 bg-gradient-glass shadow-card transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20">
              <CardContent className="p-6 space-y-5">
                {recentFeedback.map((feedback, idx) => (
                  <div key={feedback.id} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {feedback.from.split(' ')[0].charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{feedback.from}</p>
                        <p className="text-xs text-muted-foreground">{feedback.project}</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground">{feedback.feedback}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{feedback.timestamp}</p>
                      <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">Reply</Button>
                    </div>
                    {idx < recentFeedback.length - 1 && <div className="h-px bg-border/60 mt-3" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Submitted</DialogTitle>
            <DialogDescription>
              Your status update has been submitted successfully.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setIsConfirmOpen(false)} className="bg-primary hover:bg-primary-hover">OK</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InternDashboard;
