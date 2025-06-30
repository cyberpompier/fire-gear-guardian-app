
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddEpiFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function AddEpiForm({ onSubmit, onCancel }: AddEpiFormProps) {
  const [formData, setFormData] = useState({
    type: "",
    serialNumber: "",
    assignedTo: "",
    purchaseDate: undefined as Date | undefined,
    nextCheck: undefined as Date | undefined,
    status: "Bon état"
  });

  const epiTypes = [
    "Casque F1",
    "Tenue de feu",
    "Bottes",
    "Gants",
    "ARI (Appareil Respiratoire)",
    "Lampe",
    "Hache",
    "Corde"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Ajouter un nouvel EPI
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type d'EPI *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  {epiTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serialNumber">Numéro de série *</Label>
              <Input
                id="serialNumber"
                value={formData.serialNumber}
                onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                placeholder="Ex: CSQ-2024-001"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigné à</Label>
              <Input
                id="assignedTo"
                value={formData.assignedTo}
                onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                placeholder="Nom du sapeur-pompier"
              />
            </div>

            <div className="space-y-2">
              <Label>Date d'achat</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.purchaseDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.purchaseDate ? format(formData.purchaseDate, "dd/MM/yyyy") : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.purchaseDate}
                    onSelect={(date) => setFormData({...formData, purchaseDate: date})}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Prochaine vérification</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.nextCheck && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.nextCheck ? format(formData.nextCheck, "dd/MM/yyyy") : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.nextCheck}
                    onSelect={(date) => setFormData({...formData, nextCheck: date})}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">État</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bon état">Bon état</SelectItem>
                  <SelectItem value="À vérifier">À vérifier</SelectItem>
                  <SelectItem value="À remplacer">À remplacer</SelectItem>
                  <SelectItem value="En maintenance">En maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit" className="fire-gradient text-white">
              Ajouter l'EPI
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
