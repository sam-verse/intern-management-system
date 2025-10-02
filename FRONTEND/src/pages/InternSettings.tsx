import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Save,
  Upload,
  ChevronLeft
} from "lucide-react";
import { DashboardNavigation } from "@/components/DashboardNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const InternSettings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    name: localStorage.getItem("userName") || "Intern User",
    email: localStorage.getItem("userEmail") || "intern@company.com",
    phone: "+1 (555) 123-4567",
    university: "Tech University",
    major: "Computer Science",
    graduationYear: "2025",
    bio: "Passionate software development intern eager to learn and contribute to innovative projects.",
    linkedin: "https://linkedin.com/in/intern-user",
    github: "https://github.com/intern-user",
    portfolio: "https://intern-user.dev"
  });

  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "English",
    timezone: "UTC-8",
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    mentorFeedback: true,
    projectUpdates: true,
    reminderEmails: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "team",
    showEmail: false,
    showPhone: false,
    allowMentorContact: true,
    shareProgress: true,
    dataCollection: true
  });

  const handleSaveProfile = () => {
    localStorage.setItem("userName", profileData.name);
    localStorage.setItem("userEmail", profileData.email);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Updated",
      description: "Your preferences have been saved successfully.",
    });
  };

  const handleSavePrivacy = () => {
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy settings have been updated successfully.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export Initiated",
      description: "Your data export will be ready for download shortly.",
    });
  };

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

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        {/* <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div> */}

        <Tabs defaultValue="profile" className="space-y-6">
         

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-card max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your personal details and professional links.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="university">University</Label>
                      <Input 
                        id="university"
                        value={profileData.university}
                        onChange={(e) => setProfileData({...profileData, university: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="major">Major</Label>
                      <Input 
                        id="major"
                        value={profileData.major}
                        onChange={(e) => setProfileData({...profileData, major: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="graduation">Graduation Year</Label>
                      <Input 
                        id="graduation"
                        value={profileData.graduationYear}
                        onChange={(e) => setProfileData({...profileData, graduationYear: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Professional Links</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <Input 
                        id="linkedin"
                        value={profileData.linkedin}
                        onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                        placeholder="https://linkedin.com/in/yourname"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub Profile</Label>
                      <Input 
                        id="github"
                        value={profileData.github}
                        onChange={(e) => setProfileData({...profileData, github: e.target.value})}
                        placeholder="https://github.com/yourname"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="portfolio">Portfolio Website</Label>
                      <Input 
                        id="portfolio"
                        value={profileData.portfolio}
                        onChange={(e) => setProfileData({...profileData, portfolio: e.target.value})}
                        placeholder="https://yourname.dev"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio"
                    placeholder="Tell us about yourself and your goals..."
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} className="shadow-orange">
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default InternSettings;