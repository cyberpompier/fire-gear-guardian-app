
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface AddPersonnelFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function AddPersonnelForm({ onSubmit, onCancel }: AddPersonnelFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    grade: "",
    caserne: "",
    phone: "",
    email: "",
    status: "Actif"
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
    onSubmit(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Ajouter un nouveau sapeur-pompier
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
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="06.12.34.56.78"
                type="tel"
              />
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

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="status">Statut</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger className="w-full md:w-1/3">
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
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit" className="emergency-gradient text-white">
              Ajouter le personnel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
