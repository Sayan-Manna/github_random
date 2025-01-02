import React, { useState } from "react";
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
import { AlertCircle, CheckCircle, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";

type Priority = "Low" | "Medium" | "High";

const priorityColors: Record<Priority, string> = {
  Low: "bg-green-500",
  Medium: "bg-yellow-500",
  High: "bg-red-500",
};

const availableTags = [
  "Hardware",
  "Software",
  "Network",
  "POS",
  "Inventory",
  "Payment",
];

export default function CreateTicket() {
  const [newTicket, setNewTicket] = useState<NewTicket>({
    title: "",
    description: "",
    priority: "Low",
    storeId: "",
    assignedTeam: "",
    createdAt: new Date().toISOString(),
    tags: [],
    photo: undefined,
  });
  const [errors, setErrors] = useState<Partial<NewTicket>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<NewTicket> = {};
    if (!newTicket.title.trim()) newErrors.title = "Title is required";
    if (!newTicket.description.trim())
      newErrors.description = "Description is required";
    if (!newTicket.storeId.trim()) newErrors.storeId = "Store ID is required";
    if (!newTicket.assignedTeam.trim())
      newErrors.assignedTeam = "Assigned team is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real application, you would send this data to your backend
      console.log("Submitting new ticket:", newTicket);
      setIsSubmitted(true);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof NewTicket]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePriorityChange = (value: Priority) => {
    setNewTicket((prev) => ({ ...prev, priority: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewTicket((prev) => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const handleTagToggle = (tag: string) => {
    setNewTicket((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-zinc-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-100 rounded-lg shadow-2xl p-8 max-w-md w-full text-center"
        >
          <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">
            Ticket Created Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Your ticket has been submitted and our team will review it shortly.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-black text-white hover:bg-gray-800"
          >
            Create Another Ticket
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-container  w-full">
      <PageHeader />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-800 rounded-lg shadow-2xl p-8 w-full max-w-none"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white text-left">
            Create New Ticket
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title" className="text-white font-semibold">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={newTicket.title}
                onChange={handleInputChange}
                className={`mt-1 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter a concise title for the issue"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div>
              <Label htmlFor="storeId" className="text-white font-semibold">
                Store ID
              </Label>
              <Input
                id="storeId"
                name="storeId"
                value={newTicket.storeId}
                onChange={handleInputChange}
                className={`mt-1 ${
                  errors.storeId ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter the store ID"
              />
              {errors.storeId && (
                <p className="text-red-500 text-sm mt-1">{errors.storeId}</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="description" className="text-white font-semibold">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={newTicket.description}
              onChange={handleInputChange}
              className={`mt-1 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              rows={4}
              placeholder="Provide a detailed description of the issue"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="photo" className="text-white font-semibold">
                Upload Photo
              </Label>
              <div className="mt-1 flex items-center">
                <Input
                  id="photo"
                  name="photo"
                  type="file"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  accept="image/*"
                />
                <Label
                  htmlFor="photo"
                  className="cursor-pointer bg-black border border-gray-300 rounded-md py-2 px-4 inline-flex items-center text-sm font-medium text-gray-600 hover:bg-gray-50 w-full"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  {newTicket.photo ? newTicket.photo.name : "Choose a file"}
                </Label>
              </div>
            </div>
            <div>
              <Label htmlFor="priority" className="text-gray-700 font-semibold">
                Priority
              </Label>
              <Select
                value={newTicket.priority}
                onValueChange={handlePriorityChange}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(priorityColors).map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      <div className="flex items-center">
                        <Badge
                          className={`${
                            priorityColors[priority as Priority]
                          } text-white mr-2`}
                        >
                          {priority}
                        </Badge>
                        {priority}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label
              htmlFor="assignedTeam"
              className="text-gray-700 font-semibold"
            >
              Assign to Team
            </Label>
            <Input
              id="assignedTeam"
              name="assignedTeam"
              value={newTicket.assignedTeam}
              onChange={handleInputChange}
              className={`mt-1 ${
                errors.assignedTeam ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter the team name"
            />
            {errors.assignedTeam && (
              <p className="text-red-500 text-sm mt-1">{errors.assignedTeam}</p>
            )}
          </div>
          <div>
            <Label className="text-white font-semibold">Tags</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={newTicket.tags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer bg-gray-600"
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-gray-300 font-semibold">Created At</Label>
            <Input
              value={new Date(newTicket.createdAt).toLocaleString()}
              readOnly
              className="mt-1 bg-zinc-600"
            />
          </div>
          <Button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Create Ticket
          </Button>
        </form>
        <Alert
          variant="info"
          className="mt-6 bg-gray-200 border border-gray-300"
        >
          <AlertCircle className="h-4 w-4 text-gray-600" />
          <AlertTitle className="text-gray-800 font-semibold">
            Important Note
          </AlertTitle>
          <AlertDescription className="text-gray-700">
            Please provide as much detail as possible in the description to help
            our support team address the issue quickly and effectively.
          </AlertDescription>
        </Alert>
      </motion.div>
    </div>
  );
}
