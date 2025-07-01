
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { usePersonnel } from "@/hooks/usePersonnel";
import type { PersonnelMember } from "@/hooks/usePersonnel";

interface EditPersonnelFormProps {
  personnel: PersonnelMember;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function EditPersonnelForm({ personnel, onSubmit, onCancel }: EditPersonnelFormProps) {
  const { updatePersonnel, isUpdating } = usePersonnel();
  const [formData, setFormData] = useState({
    firstName: personnel.firstName,
    lastName: personnel.lastName,
    grade: personnel.grade,
    caserne: personnel.caserne,
    email: personnel.email,
    status: personnel.status
  });

  const grades = [
    "Sapeur",
    "Sapeur 1ère classe",
    "Caporal",
    "Caporal-Chef",
    "Sergent",
    "Sergent-Chef",
    "Adjudant",
    "Adjudant-Chef",
    "Lieutenant",
    "Capitaine",
    "Commandant"
  ];

  const casernes = [
    "CS Principal",
    "CS Annexe",
    "CS Nord",
    "CS Sud",
    "CS Est",
    "CS Ouest"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const personnelData = {
      id: personnel.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      grade: formData.grade,
      caserne: formData.caserne,
      email: formData.email,
      status: formData.status
    };

    updatePersonnel(personnelData);
    onSubmit(personnelData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Modifier le personnel - {personnel.firstName} {personnel.lastName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                placeholder="Prénom"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                placeholder="Nom de famille"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">Grade *</Label>
              <Select value={formData.grade} onValueChange={(value) => setFormData({...formData, grade: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un grade" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="caserne">Caserne *</Label>
              <Select value={formData.caserne} onValueChange={(value) => setFormData({...formData, caserne: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une caserne" />
                </SelectTrigger>
                <SelectContent>
                  {casernes.map((caserne) => (
                    <SelectItem key={caserne} value={caserne}>{caserne}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="prenom.nom@sdis.fr"
                type="email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="En formation">En formation</SelectItem>
                  <SelectItem value="Congé">Congé</SelectItem>
                  <SelectItem value="Indisponible">Indisponible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isUpdating}>
              Annuler
            </Button>
            <Button type="submit" className="emergency-gradient text-white" disabled={isUpdating}>
              {isUpdating ? "Modification en cours..." : "Modifier le personnel"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
