
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CalendarIcon, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVerifications } from "@/hooks/useVerifications";
import type { Verification } from "@/hooks/useVerifications";

interface EditVerificationFormProps {
  verification: Verification;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function EditVerificationForm({ verification, onSubmit, onCancel }: EditVerificationFormProps) {
  const { updateVerification, isUpdating } = useVerifications();
  const [formData, setFormData] = useState({
    scheduledDate: new Date(verification.scheduledDate),
    status: verification.status,
    notes: verification.notes || ""
  });

  const statusOptions = [
    { value: "Planifié", label: "Planifié" },
    { value: "En cours", label: "En cours" },
    { value: "Terminé", label: "Terminé" },
    { value: "Annulé", label: "Annulé" },
    { value: "Report", label: "Reporté" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updateData = {
      scheduledDate: formData.scheduledDate.toISOString().split('T')[0],
      status: formData.status,
      notes: formData.notes
    };

    updateVerification({ id: verification.id, updates: updateData });
    onSubmit(updateData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit className="w-5 h-5 text-primary" />
          Modifier la vérification
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {verification.equipmentName} - {verification.assignedTo}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nouvelle date prévue *</Label>
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
                    onSelect={(date) => date && setFormData({...formData, scheduledDate: date})}
                    initialFocus
                    className="p-3"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
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
            <Button type="button" variant="outline" onClick={onCancel} disabled={isUpdating}>
              Annuler
            </Button>
            <Button type="submit" className="rescue-gradient text-white" disabled={isUpdating}>
              {isUpdating ? "Modification..." : "Modifier la vérification"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
