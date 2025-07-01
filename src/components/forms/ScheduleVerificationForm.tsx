
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CalendarIcon, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScheduleVerificationFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function ScheduleVerificationForm({ onSubmit, onCancel }: ScheduleVerificationFormProps) {
  const [formData, setFormData] = useState({
    epiId: "",
    verificationType: "",
    scheduledDate: undefined as Date | undefined,
    assignedTo: "",
    priority: "normal",
    notes: ""
  });

  const verificationTypes = [
    "Vérification périodique",
    "Contrôle de conformité",
    "Inspection après utilisation",
    "Test de fonctionnement",
    "Maintenance préventive"
  ];

  const priorities = [
    { value: "low", label: "Basse" },
    { value: "normal", label: "Normale" },
    { value: "high", label: "Haute" },
    { value: "urgent", label: "Urgente" }
  ];

  const mockPersonnel = [
    "Martin Dubois",
    "Sophie Laurent", 
    "Pierre Moreau",
    "Marie Durand",
    "Jean Lefebvre"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Planifier une vérification
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="epiId">EPI à vérifier *</Label>
              <Input
                id="epiId"
                value={formData.epiId}
                onChange={(e) => setFormData({...formData, epiId: e.target.value})}
                placeholder="Ex: CSQ-2024-001"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="verificationType">Type de vérification *</Label>
              <Select value={formData.verificationType} onValueChange={(value) => setFormData({...formData, verificationType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  {verificationTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date prévue *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.scheduledDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.scheduledDate ? format(formData.scheduledDate, "dd/MM/yyyy") : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.scheduledDate}
                    onSelect={(date) => setFormData({...formData, scheduledDate: date})}
                    initialFocus
                    className="p-3"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigné à *</Label>
              <Select value={formData.assignedTo} onValueChange={(value) => setFormData({...formData, assignedTo: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une personne" />
                </SelectTrigger>
                <SelectContent>
                  {mockPersonnel.map((person) => (
                    <SelectItem key={person} value={person}>{person}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priorité</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>{priority.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Informations complémentaires..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit" className="rescue-gradient text-white">
              Planifier la vérification
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
