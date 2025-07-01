
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
import { CalendarIcon, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateAlertFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function CreateAlertForm({ onSubmit, onCancel }: CreateAlertFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    priority: "medium",
    targetDate: undefined as Date | undefined,
    affectedEpi: "",
    affectedPersonnel: "",
    description: "",
    autoReminder: true
  });

  const alertTypes = [
    "Expiration EPI",
    "Maintenance requise",
    "Formation échue",
    "Vérification en retard",
    "Remplacement nécessaire",
    "Mise à jour réglementaire"
  ];

  const priorities = [
    { value: "low", label: "Basse" },
    { value: "medium", label: "Moyenne" },
    { value: "high", label: "Haute" },
    { value: "critical", label: "Critique" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-primary" />
          Créer une nouvelle alerte
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Titre de l'alerte *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Ex: Expiration casque F1 - SP001"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type d'alerte *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  {alertTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priorité *</Label>
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

            <div className="space-y-2">
              <Label>Date limite</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.targetDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.targetDate ? format(formData.targetDate, "dd/MM/yyyy") : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.targetDate}
                    onSelect={(date) => setFormData({...formData, targetDate: date})}
                    initialFocus
                    className="p-3"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="affectedEpi">EPI concerné</Label>
              <Input
                id="affectedEpi"
                value={formData.affectedEpi}
                onChange={(e) => setFormData({...formData, affectedEpi: e.target.value})}
                placeholder="Ex: CSQ-2024-001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="affectedPersonnel">Personnel concerné</Label>
              <Input
                id="affectedPersonnel"
                value={formData.affectedPersonnel}
                onChange={(e) => setFormData({...formData, affectedPersonnel: e.target.value})}
                placeholder="Ex: Martin Dubois"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Décrivez le problème ou l'action requise..."
                rows={4}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit" className="emergency-gradient text-white">
              Créer l'alerte
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
