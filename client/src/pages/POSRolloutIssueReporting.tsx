import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  MessageSquare,
  Plus,
  RefreshCw,
  Search,
  Tag,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Priority = "Low" | "Medium" | "High" | "Critical";
type Status = "Open" | "In Progress" | "Resolved" | "Closed";

interface Issue {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  storeId: string;
  reportedBy: string;
  assignedTo: string;
  team: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

const priorityColors: Record<Priority, string> = {
  Low: "bg-blue-500",
  Medium: "bg-yellow-500",
  High: "bg-orange-500",
  Critical: "bg-red-500",
};

const statusIcons: Record<Status, React.ReactNode> = {
  Open: <AlertCircle className="h-4 w-4 text-yellow-500" />,
  "In Progress": <Clock className="h-4 w-4 text-blue-500" />,
  Resolved: <CheckCircle className="h-4 w-4 text-green-500" />,
  Closed: <CheckCircle className="h-4 w-4 text-gray-500" />,
};

const mockIssues: Issue[] = [
  {
    id: "POS-001",
    title: "POS Terminal Not Booting",
    description:
      "The main POS terminal at checkout counter 3 is not powering on. We've tried different power outlets and cables, but the issue persists. This is causing significant delays in customer checkout times.",
    priority: "High",
    status: "Open",
    storeId: "STORE-001",
    reportedBy: "John Doe",
    assignedTo: "Sarah Tech",
    team: "Hardware Support",
    createdAt: "2023-06-15T10:30:00Z",
    updatedAt: "2023-06-15T10:30:00Z",
    tags: ["Hardware", "Power Issue"],
    comments: [
      {
        id: "c1",
        author: "Sarah Tech",
        content: "I'll be on-site within the hour to diagnose the issue.",
        createdAt: "2023-06-15T11:00:00Z",
      },
    ],
  },
  {
    id: "POS-002",
    title: "Receipt Printer Jam",
    description:
      "The receipt printer at checkout counter 2 is consistently jamming. We've tried clearing the paper path and reloading the paper roll, but the problem keeps occurring.",
    priority: "Medium",
    status: "In Progress",
    storeId: "STORE-002",
    reportedBy: "Jane Smith",
    assignedTo: "Mike Fix",
    team: "Hardware Support",
    createdAt: "2023-06-14T15:45:00Z",
    updatedAt: "2023-06-15T09:15:00Z",
    tags: ["Hardware", "Printer"],
    comments: [
      {
        id: "c2",
        author: "Mike Fix",
        content:
          "I've ordered a replacement print head. It should arrive tomorrow.",
        createdAt: "2023-06-15T10:00:00Z",
      },
    ],
  },
  {
    id: "POS-003",
    title: "Barcode Scanner Malfunction",
    description:
      "Handheld barcode scanner in the inventory area is not reading barcodes correctly. It's either missing scans or reading incorrect product codes.",
    priority: "Low",
    status: "Resolved",
    storeId: "STORE-003",
    reportedBy: "Mike Johnson",
    assignedTo: "Lisa Debug",
    team: "Software Support",
    createdAt: "2023-06-13T11:20:00Z",
    updatedAt: "2023-06-14T16:30:00Z",
    tags: ["Hardware", "Scanner", "Inventory"],
    comments: [
      {
        id: "c3",
        author: "Lisa Debug",
        content: "The issue was resolved by updating the scanner's firmware.",
        createdAt: "2023-06-14T16:25:00Z",
      },
    ],
  },
  {
    id: "POS-004",
    title: "Payment Processing Error",
    description:
      "Credit card transactions are being declined despite valid cards. This is affecting all POS terminals in the store.",
    priority: "Critical",
    status: "Open",
    storeId: "STORE-001",
    reportedBy: "Sarah Lee",
    assignedTo: "Tom Network",
    team: "Network Support",
    createdAt: "2023-06-15T08:00:00Z",
    updatedAt: "2023-06-15T08:00:00Z",
    tags: ["Network", "Payments", "Urgent"],
    comments: [
      {
        id: "c4",
        author: "Tom Network",
        content:
          "I'm checking the network connectivity and will contact our payment gateway provider.",
        createdAt: "2023-06-15T08:30:00Z",
      },
    ],
  },
];

export default function POSRolloutIssueReporting() {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>(mockIssues);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState<Priority | "All">("All");
  const [filterStatus, setFilterStatus] = useState<Status | "All">("All");
  const [newComment, setNewComment] = useState("");
  const [isNewTicketDialogOpen, setIsNewTicketDialogOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    priority: "Low",
    storeId: "",
  });

  useEffect(() => {
    let filtered = issues;

    if (searchTerm) {
      filtered = filtered.filter(
        (issue) =>
          issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.storeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterPriority !== "All") {
      filtered = filtered.filter((issue) => issue.priority === filterPriority);
    }

    if (filterStatus !== "All") {
      filtered = filtered.filter((issue) => issue.status === filterStatus);
    }

    setFilteredIssues(filtered);
  }, [issues, searchTerm, filterPriority, filterStatus]);

  const handleIssueSelect = (issue: Issue) => {
    setSelectedIssue(issue);
    setIsLeftPanelOpen(false);
  };

  const handleStatusUpdate = (newStatus: Status) => {
    if (selectedIssue) {
      const updatedIssues = issues.map((issue) =>
        issue.id === selectedIssue.id
          ? { ...issue, status: newStatus, updatedAt: new Date().toISOString() }
          : issue
      );
      setIssues(updatedIssues);
      setSelectedIssue({
        ...selectedIssue,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const handlePriorityUpdate = (newPriority: Priority) => {
    if (selectedIssue) {
      const updatedIssues = issues.map((issue) =>
        issue.id === selectedIssue.id
          ? {
              ...issue,
              priority: newPriority,
              updatedAt: new Date().toISOString(),
            }
          : issue
      );
      setIssues(updatedIssues);
      setSelectedIssue({
        ...selectedIssue,
        priority: newPriority,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const handleAssignedToUpdate = (newAssignedTo: string) => {
    if (selectedIssue) {
      const updatedIssues = issues.map((issue) =>
        issue.id === selectedIssue.id
          ? {
              ...issue,
              assignedTo: newAssignedTo,
              updatedAt: new Date().toISOString(),
            }
          : issue
      );
      setIssues(updatedIssues);
      setSelectedIssue({
        ...selectedIssue,
        assignedTo: newAssignedTo,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const handleTeamUpdate = (newTeam: string) => {
    if (selectedIssue) {
      const updatedIssues = issues.map((issue) =>
        issue.id === selectedIssue.id
          ? { ...issue, team: newTeam, updatedAt: new Date().toISOString() }
          : issue
      );
      setIssues(updatedIssues);
      setSelectedIssue({
        ...selectedIssue,
        team: newTeam,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const handleAddComment = () => {
    if (selectedIssue && newComment.trim() !== "") {
      const newCommentObj: Comment = {
        id: `c${selectedIssue.comments.length + 1}`,
        author: "Current User", // In a real app, this would be the logged-in user
        content: newComment,
        createdAt: new Date().toISOString(),
      };
      const updatedIssue = {
        ...selectedIssue,
        comments: [...selectedIssue.comments, newCommentObj],
        updatedAt: new Date().toISOString(),
      };
      const updatedIssues = issues.map((issue) =>
        issue.id === selectedIssue.id ? updatedIssue : issue
      );
      setIssues(updatedIssues);
      setSelectedIssue(updatedIssue);
      setNewComment("");
    }
  };

  const handleCreateNewTicket = (newTicket: any) => {
    const newIssue: Issue = {
      id: `POS-${issues.length + 1}`,
      title: newTicket.title,
      description: newTicket.description,
      priority: newTicket.priority,
      status: "Open",
      storeId: newTicket.storeId,
      reportedBy: "Current User",
      assignedTo: "",
      team: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
      comments: [],
    };
    setIssues([...issues, newIssue]);
    setIsNewTicketDialogOpen(false);
    setNewTicket({ title: "", description: "", priority: "Low", storeId: "" });
  };

  return (
    <div className="flex h-screen w-full bg-zinc-950">
      {/* Left Panel */}
      <AnimatePresence>
        {isLeftPanelOpen && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "25%" }}
            exit={{ width: 0 }}
            className="bg-zinc-800 shadow-md"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Issues</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsLeftPanelOpen(false)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
                <div className="flex space-x-2">
                  <Select
                    value={filterPriority}
                    onValueChange={(value) =>
                      setFilterPriority(value as Priority | "All")
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Priorities</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={filterStatus}
                    onValueChange={(value) =>
                      setFilterStatus(value as Status | "All")
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Statuses</SelectItem>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <ScrollArea className="h-[calc(100vh-130px)]">
              <div className="p-4 space-y-2">
                {filteredIssues.map((issue) => (
                  <Card
                    key={issue.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedIssue?.id === issue.id
                        ? "ring-2 ring-blue-500"
                        : ""
                    }`}
                    onClick={() => handleIssueSelect(issue)}
                  >
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {issue.title}
                          </CardTitle>
                          <CardDescription>{issue.id}</CardDescription>
                        </div>
                        <Badge
                          className={`${
                            priorityColors[issue.priority]
                          } text-white`}
                        >
                          {issue.priority}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          {statusIcons[issue.status]}
                          <span className="ml-1">{issue.status}</span>
                        </div>
                        <span>{issue.storeId}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Middle Panel */}
      <div className="flex-1 overflow-hidden">
        {selectedIssue ? (
          <div className="h-full flex flex-col">
            <div className="bg-zinc-800 shadow-sm p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsLeftPanelOpen(true)}
                  className="mr-2"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <h2 className="text-2xl font-bold">{selectedIssue.title}</h2>
              </div>
              <Badge
                className={`${
                  priorityColors[selectedIssue.priority]
                } text-white`}
              >
                {selectedIssue.priority}
              </Badge>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p>{selectedIssue.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Status</Label>
                      <div className="flex items-center mt-1">
                        {statusIcons[selectedIssue.status]}
                        <span className="ml-2">{selectedIssue.status}</span>
                      </div>
                    </div>
                    <div>
                      <Label>Store ID</Label>
                      <p className="mt-1">{selectedIssue.storeId}</p>
                    </div>
                    <div>
                      <Label>Reported By</Label>
                      <p className="mt-1">{selectedIssue.reportedBy}</p>
                    </div>
                    <div>
                      <Label>Assigned To</Label>
                      <p className="mt-1">{selectedIssue.assignedTo}</p>
                    </div>
                    <div>
                      <Label>Team</Label>
                      <p className="mt-1">{selectedIssue.team}</p>
                    </div>
                    <div>
                      <Label>Created At</Label>
                      <p className="mt-1">
                        {new Date(selectedIssue.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedIssue.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Comments</h3>
                  <div className="space-y-4">
                    {selectedIssue.comments.map((comment) => (
                      <Card key={comment.id}>
                        <CardHeader className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage
                                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.author}`}
                                />
                                <AvatarFallback>
                                  {comment.author[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-sm font-semibold">
                                  {comment.author}
                                </CardTitle>
                                <CardDescription className="text-xs">
                                  {new Date(comment.createdAt).toLocaleString()}
                                </CardDescription>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p>{comment.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button className="mt-2" onClick={handleAddComment}>
                      Add Comment
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Select an issue to view details</p>
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div className="w-1/4 bg-neutral-900 shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Issue Management</h2>
        {selectedIssue && (
          <div className="space-y-6">
            <div>
              <Label>Update Status</Label>
              <Select
                value={selectedIssue.status}
                onValueChange={handleStatusUpdate}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Update Priority</Label>
              <Select
                value={selectedIssue.priority}
                onValueChange={handlePriorityUpdate}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Assign To</Label>
              <Select
                value={selectedIssue.assignedTo}
                onValueChange={handleAssignedToUpdate}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sarah Tech">Sarah Tech</SelectItem>
                  <SelectItem value="Mike Fix">Mike Fix</SelectItem>
                  <SelectItem value="Lisa Debug">Lisa Debug</SelectItem>
                  <SelectItem value="Tom Network">Tom Network</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Assign Team</Label>
              <Select
                value={selectedIssue.team}
                onValueChange={handleTeamUpdate}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hardware Support">
                    Hardware Support
                  </SelectItem>
                  <SelectItem value="Software Support">
                    Software Support
                  </SelectItem>
                  <SelectItem value="Network Support">
                    Network Support
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedIssue.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" className="mt-2">
                <Plus className="h-4 w-4 mr-2" /> Add Tag
              </Button>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">Activity History</h3>
              <ScrollArea className="h-48">
                <div className="space-y-4">
                  {/* Mock activity history items */}
                  <div className="flex items-start">
                    <Clock className="h-4 w-4 mt-1 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm">Status updated to "In Progress"</p>
                      <p className="text-xs text-gray-500">
                        2023-06-15 11:30:00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <User className="h-4 w-4 mt-1 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm">Assigned to Sarah Tech</p>
                      <p className="text-xs text-gray-500">
                        2023-06-15 11:00:00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MessageSquare className="h-4 w-4 mt-1 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm">New comment added</p>
                      <p className="text-xs text-gray-500">
                        2023-06-15 10:45:00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Tag className="h-4 w-4 mt-1 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm">Tag "Hardware" added</p>
                      <p className="text-xs text-gray-500">
                        2023-06-15 10:30:00
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        )}
      </div>

      {/* New Ticket Dialog */}
      <Dialog
        open={isNewTicketDialogOpen}
        onOpenChange={setIsNewTicketDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Ticket</DialogTitle>
            <DialogDescription>
              Enter the details for the new issue ticket.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                onChange={(e) =>
                  setNewTicket({ ...newTicket, title: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                className="col-span-3"
                onChange={(e) =>
                  setNewTicket({ ...newTicket, description: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select
                onValueChange={(value) =>
                  setNewTicket({ ...newTicket, priority: value as Priority })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="storeId" className="text-right">
                Store ID
              </Label>
              <Input
                id="storeId"
                className="col-span-3"
                onChange={(e) =>
                  setNewTicket({ ...newTicket, storeId: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => handleCreateNewTicket(newTicket)}
            >
              Create Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
