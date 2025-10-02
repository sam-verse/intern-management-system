import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { 
  TrendingUp, 
  Calendar as CalendarIcon, 
  Target,
  CheckCircle,
  Clock,
  Star,
  Award,
  FileText,
  MessageSquare,
  Download
} from "lucide-react";
import { DashboardNavigation } from "@/components/DashboardNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InternProgress = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock progress data
  const overallStats = {
    totalTasks: 25,
    completedTasks: 18,
    inProgressTasks: 4,
    pendingTasks: 3,
    overallProgress: 72,
    weeklyProgress: 12,
    averageRating: 4.2,
    totalFeedback: 15
  };

  const milestones = [
    {
      id: 1,
      title: "Onboarding Complete",
      description: "Completed all onboarding requirements",
      status: "completed",
      date: "2024-08-15",
      score: 95,
      feedback: "Excellent start! Quick to adapt to our processes."
    },
    {
      id: 2,
      title: "First Project Assignment",
      description: "Successfully assigned to E-commerce Mobile App project",
      status: "completed",
      date: "2024-08-20",
      score: 90,
      feedback: "Great enthusiasm and team collaboration."
    },
    {
      id: 3,
      title: "Technical Skills Assessment",
      description: "Mid-term evaluation of technical capabilities",
      status: "completed",
      date: "2024-09-15",
      score: 88,
      feedback: "Strong technical foundation with room for growth in advanced concepts."
    },
    {
      id: 4,
      title: "Project Milestone 1",
      description: "Complete user authentication module",
      status: "current",
      date: "2024-09-30",
      score: null,
      feedback: null
    },
    {
      id: 5,
      title: "Mid-Program Review",
      description: "Comprehensive evaluation of progress",
      status: "upcoming",
      date: "2024-10-15",
      score: null,
      feedback: null
    },
    {
      id: 6,
      title: "Final Project Presentation",
      description: "Present completed project to stakeholders",
      status: "upcoming",
      date: "2024-11-01",
      score: null,
      feedback: null
    }
  ];

  const recentActivity = [
    {
      date: "2024-09-25",
      type: "task_completed",
      title: "Completed User Authentication UI",
      project: "E-commerce Mobile App",
      rating: 4.5
    },
    {
      date: "2024-09-24",
      type: "feedback_received",
      title: "Received feedback from mentor",
      project: "E-commerce Mobile App",
      rating: 4.0
    },
    {
      date: "2024-09-23",
      type: "task_started",
      title: "Started Product Catalog Screen",
      project: "E-commerce Mobile App",
      rating: null
    },
    {
      date: "2024-09-22",
      type: "meeting_attended",
      title: "Weekly team standup",
      project: "E-commerce Mobile App",
      rating: null
    },
    {
      date: "2024-09-20",
      type: "skill_assessment",
      title: "React Native Skills Assessment",
      project: "Technical Training",
      rating: 4.2
    }
  ];

  const skillsProgress = [
    { skill: "React Native", current: 85, target: 90, category: "Technical" },
    { skill: "JavaScript/TypeScript", current: 90, target: 95, category: "Technical" },
    { skill: "API Integration", current: 75, target: 85, category: "Technical" },
    { skill: "Team Collaboration", current: 95, target: 95, category: "Soft Skills" },
    { skill: "Problem Solving", current: 80, target: 90, category: "Soft Skills" },
    { skill: "Communication", current: 88, target: 92, category: "Soft Skills" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-status-completed text-status-completed-foreground';
      case 'current': return 'bg-status-in-progress text-primary-foreground';
      case 'upcoming': return 'bg-status-pending text-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'current': return Target;
      case 'upcoming': return Clock;
      default: return Clock;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'task_completed': return CheckCircle;
      case 'feedback_received': return MessageSquare;
      case 'task_started': return Clock;
      case 'meeting_attended': return CalendarIcon;
      case 'skill_assessment': return Award;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavigation userRole="intern" />
      
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Progress Tracking</h1>
            <p className="text-muted-foreground">Monitor your learning journey and achievements</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
                  <p className="text-2xl font-bold text-foreground">
                    {overallStats.completedTasks}/{overallStats.totalTasks}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-status-completed" />
              </div>
              <div className="mt-4">
                <Progress value={(overallStats.completedTasks / overallStats.totalTasks) * 100} />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                  <p className="text-2xl font-bold text-foreground">{overallStats.overallProgress}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2">
                <p className="text-sm text-status-completed">+{overallStats.weeklyProgress}% this week</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold text-foreground">{overallStats.averageRating}</p>
                </div>
                <Star className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">Based on {overallStats.totalFeedback} reviews</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-foreground">{overallStats.inProgressTasks}</p>
                </div>
                <Clock className="h-8 w-8 text-status-in-progress" />
              </div>
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">{overallStats.pendingTasks} pending tasks</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="milestones" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="milestones" className="space-y-4">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Learning Roadmap</CardTitle>
                    <CardDescription>Track your progress through key milestones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {milestones.map((milestone, index) => {
                        const StatusIcon = getStatusIcon(milestone.status);
                        return (
                          <div key={milestone.id} className="relative">
                            {index < milestones.length - 1 && (
                              <div className="absolute left-4 top-12 w-px h-16 bg-border" />
                            )}
                            <div className="flex gap-4">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                milestone.status === 'completed' ? 'bg-status-completed text-status-completed-foreground' :
                                milestone.status === 'current' ? 'bg-primary text-primary-foreground' :
                                'bg-muted text-muted-foreground'
                              }`}>
                                <StatusIcon className="h-4 w-4" />
                              </div>
                              
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-3">
                                  <h3 className="font-semibold text-foreground">{milestone.title}</h3>
                                  <Badge className={getStatusColor(milestone.status)}>
                                    {milestone.status}
                                  </Badge>
                                  {milestone.score && (
                                    <Badge variant="outline">
                                      Score: {milestone.score}%
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{milestone.description}</p>
                                <p className="text-sm text-muted-foreground">
                                  {milestone.status === 'upcoming' ? 'Due: ' : 'Completed: '}
                                  {new Date(milestone.date).toLocaleDateString()}
                                </p>
                                {milestone.feedback && (
                                  <div className="p-3 bg-muted/50 rounded-lg">
                                    <p className="text-sm italic text-foreground">"{milestone.feedback}"</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Skills Development</CardTitle>
                    <CardDescription>Track your skill progression and targets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {["Technical", "Soft Skills"].map(category => (
                        <div key={category}>
                          <h3 className="font-semibold text-foreground mb-4">{category}</h3>
                          <div className="space-y-4">
                            {skillsProgress.filter(skill => skill.category === category).map(skill => (
                              <div key={skill.skill} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-foreground">{skill.skill}</span>
                                  <span className="text-sm text-muted-foreground">
                                    {skill.current}% / {skill.target}%
                                  </span>
                                </div>
                                <div className="relative">
                                  <Progress value={skill.current} className="h-2" />
                                  <div 
                                    className="absolute top-0 h-2 w-1 bg-primary-foreground border border-primary rounded-sm"
                                    style={{ left: `${skill.target}%`, transform: 'translateX(-50%)' }}
                                  />
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>Current</span>
                                  <span>Target</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest learning activities and achievements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => {
                        const ActivityIcon = getActivityIcon(activity.type);
                        return (
                          <div key={index} className="flex gap-4 p-4 border border-border rounded-lg">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <ActivityIcon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-foreground">{activity.title}</h4>
                                {activity.rating && (
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-primary fill-primary" />
                                    <span className="text-sm text-foreground">{activity.rating}</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{activity.project}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(activity.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border border-border"
                />
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tasks Completed</span>
                  <span className="text-sm font-medium text-foreground">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Hours Logged</span>
                  <span className="text-sm font-medium text-foreground">32</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Feedback Received</span>
                  <span className="text-sm font-medium text-foreground">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <span className="text-sm font-medium text-foreground">4.3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternProgress;