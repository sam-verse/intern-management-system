import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { createProject, listUsers } from "@/lib/api";
import { format } from "date-fns";

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateProjectDialog = ({ open, onOpenChange }: CreateProjectDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goals: "",
    priority: "",
    estimatedDuration: "",
    deliverables: ""
  });
  const [dueDate, setDueDate] = useState<Date>();
  const [selectedInterns, setSelectedInterns] = useState<string[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const all = await listUsers();
        setUsers(all.filter(u => u.role === "intern"));
      } catch (e: any) {
        // ignore load error here
      }
    };
    if (open) load();
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createProject({
        title: formData.title,
        description: formData.description,
        status: "Planning",
        progress: 0,
        due_date: dueDate ? dueDate.toISOString().slice(0, 10) : null,
        intern_ids: selectedInterns.map((id) => Number(id)),
      });
      onOpenChange(false);
      setFormData({
        title: "",
        description: "",
        goals: "",
        priority: "",
        estimatedDuration: "",
        deliverables: ""
      });
      setDueDate(undefined);
      setSelectedInterns([]);
      // Optionally: trigger refresh via custom event
      window.dispatchEvent(new CustomEvent("projects:refresh"));
    } catch (err: any) {
      setError(err?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const availableInterns = users;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Project</DialogTitle>
          <DialogDescription>
            Set up a new project and assign team members to collaborate
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                placeholder="Enter project title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the project objectives and scope"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Estimated Duration</Label>
              <Select value={formData.estimatedDuration} onValueChange={(value) => setFormData({...formData, estimatedDuration: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                  <SelectItem value="3-4 weeks">3-4 weeks</SelectItem>
                  <SelectItem value="1-2 months">1-2 months</SelectItem>
                  <SelectItem value="3+ months">3+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goals">Project Goals</Label>
            <Textarea
              id="goals"
              placeholder="List the key learning objectives and milestones"
              value={formData.goals}
              onChange={(e) => setFormData({...formData, goals: e.target.value})}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliverables">Expected Deliverables</Label>
            <Textarea
              id="deliverables"
              placeholder="Specify what should be delivered (code, documentation, reports, etc.)"
              value={formData.deliverables}
              onChange={(e) => setFormData({...formData, deliverables: e.target.value})}
              rows={2}
            />
          </div>

          <div className="space-y-3">
            <Label>Assign Team Members</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded-lg p-3">
              {availableInterns.map((intern) => (
                <div key={intern.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={String(intern.id)}
                    checked={selectedInterns.includes(intern.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedInterns([...selectedInterns, String(intern.id)]);
                      } else {
                        setSelectedInterns(selectedInterns.filter(id => id !== String(intern.id)));
                      }
                    }}
                    className="rounded border-border"
                  />
                  <label htmlFor={intern.id} className="text-sm text-foreground cursor-pointer">
                    {intern.first_name || intern.username}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              <Plus className="h-4 w-4 mr-2" />
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        </form>
      </DialogContent>
    </Dialog>
  );
};