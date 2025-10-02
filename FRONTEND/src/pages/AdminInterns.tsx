import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Mail,
  Calendar,
  TrendingUp,
  Plus,
  Download,
  ArrowRight
} from "lucide-react";
import { DashboardNavigation } from "@/components/DashboardNavigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminInterns = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // Mock interns data
  const interns = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      avatar: "SC",
      department: "Engineering",
      status: "Active",
      joinDate: "2024-08-15",
      projects: ["E-commerce Mobile App", "API Gateway"],
      progress: 85,
      completedTasks: 12,
      totalTasks: 15,
      mentor: "John Smith",
      performance: "Excellent"
    },
    {
      id: 2,
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      avatar: "MJ",
      department: "Engineering",
      status: "Active",
      joinDate: "2024-08-20",
      projects: ["E-commerce Mobile App"],
      progress: 70,
      completedTasks: 8,
      totalTasks: 12,
      mentor: "Jane Doe",
      performance: "Good"
    },
    {
      id: 3,
      name: "Alex Rivera",
      email: "alex.rivera@company.com",
      avatar: "AR",
      department: "Data Science",
      status: "Active",
      joinDate: "2024-09-01",
      projects: ["Data Analytics Dashboard", "ML Model"],
      progress: 60,
      completedTasks: 6,
      totalTasks: 10,
      mentor: "Dr. Smith",
      performance: "Good"
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma.wilson@company.com",
      avatar: "EW",
      department: "Design",
      status: "On Leave",
      joinDate: "2024-07-10",
      projects: ["UI/UX Redesign"],
      progress: 40,
      completedTasks: 4,
      totalTasks: 10,
      mentor: "Lisa Park",
      performance: "Satisfactory"
    },
    {
      id: 5,
      name: "David Park",
      email: "david.park@company.com",
      avatar: "DP",
      department: "Marketing",
      status: "Completed",
      joinDate: "2024-06-01",
      projects: ["Social Media Campaign"],
      progress: 100,
      completedTasks: 15,
      totalTasks: 15,
      mentor: "Sarah Johnson",
      performance: "Excellent"
    }
  ];

  const filteredInterns = interns.filter(intern => {
    const matchesSearch = intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intern.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || intern.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesDepartment = departmentFilter === "all" || intern.department.toLowerCase() === departmentFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-status-completed/10 text-status-completed border-status-completed/20';
      case 'on leave': return 'bg-status-pending/10 text-status-pending-foreground border-status-pending/20';
      case 'completed': return 'bg-status-in-progress/10 text-status-in-progress border-status-in-progress/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance.toLowerCase()) {
      case 'excellent': return 'text-status-completed';
      case 'good': return 'text-primary';
      case 'satisfactory': return 'text-status-pending-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const stats = [
    { title: "Total Interns", value: interns.length.toString() },
    { title: "Active", value: interns.filter(i => i.status === "Active").length.toString() },
    { title: "Completed", value: interns.filter(i => i.status === "Completed").length.toString() },
    { title: "Avg Progress", value: Math.round(interns.reduce((acc, i) => acc + i.progress, 0) / interns.length) + "%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavigation userRole="admin" />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">Interns</h1>
            <p className="text-muted-foreground">Monitor and manage intern progress</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Intern
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
                      <TrendingUp className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search interns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on leave">On Leave</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="data science">Data Science</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Interns List */}
        <div className="space-y-4">
          {filteredInterns.map((intern) => (
            <Card key={intern.id} className="group border-0 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Intern Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-primary/10 text-primary text-lg font-medium">
                        {intern.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">{intern.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5" />
                          {intern.email}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          Joined {new Date(intern.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status & Department */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className={getStatusColor(intern.status)}>
                      {intern.status}
                    </Badge>
                    <Badge variant="outline">
                      {intern.department}
                    </Badge>
                  </div>

                  {/* Progress */}
                  <div className="flex flex-col min-w-32">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Progress</span>
                      <span className="font-medium text-foreground">{intern.progress}%</span>
                    </div>
                    <Progress value={intern.progress} className="h-1.5 mb-1" />
                    <div className="text-xs text-muted-foreground">
                      {intern.completedTasks}/{intern.totalTasks} tasks
                    </div>
                  </div>

                  {/* Performance */}
                  <div className="flex flex-col items-start lg:items-center min-w-24">
                    <div className="text-xs text-muted-foreground mb-1">Performance</div>
                    <div className={`text-sm font-medium ${getPerformanceColor(intern.performance)}`}>
                      {intern.performance}
                    </div>
                  </div>

                  {/* Action */}
                  <Button variant="ghost" size="sm" className="gap-2 group-hover:gap-3 transition-all">
                    View
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredInterns.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No interns found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminInterns;
