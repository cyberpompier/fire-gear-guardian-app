
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Shield, 
  Users, 
  Activity, 
  AlertTriangle,
  Calendar,
  Plus
} from "lucide-react";

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: "epi" | "personnel" | "verification" | "alert" | null;
}

export function QuickActionModal({ isOpen, onClose, actionType }: QuickActionModalProps) {
  const [formData, setFormData] = useState({
    type: "",
    serialNumber: "",
    assignedTo: "",
    priority: "",
    description: "",
    dueDate: ""
  });

  const getModalContent = () => {
    switch (actionType) {
      case "epi":
        return {
          title: "Ajouter un EPI rapidement",
          icon: Shield,
          color: "text-blue-600",
          fields: (
            <>
              <Select onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Type d'équipement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casque">Casque F1</SelectItem>
                  <SelectItem value="tenue">Tenue de feu</SelectItem>
                  <SelectItem value="ari">ARI</SelectItem>
                  <SelectItem value="bottes">Bottes</SelectItem>
                  <SelectItem value="gants">Gants</SelectItem>
                </SelectContent>
              </Select>
              
              <Input
                placeholder="Numéro de série"
                value={formData.serialNumber}
                onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
              />
              
              <Select onValueChange={(value) => setFormData({...formData, assignedTo: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Attribuer à" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="martin">Martin Dubois</SelectItem>
                  <SelectItem value="sophie">Sophie Laurent</SelectItem>
                  <SelectItem value="pierre">Pierre Moreau</SelectItem>
                </SelectContent>
              </Select>
            </>
          )
        };

      case "personnel":
        return {
          title: "Ajouter un sapeur-pompier",
          icon: Users,
          color: "text-green-600",
          fields: (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Prénom" />
                <Input placeholder="Nom" />
              </div>
              
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sapeur">Sapeur</SelectItem>
                  <SelectItem value="caporal">Caporal</SelectItem>
                  <SelectItem value="sergent">Sergent</SelectItem>
                  <SelectItem value="adjudant">Adjudant</SelectItem>
                </SelectContent>
              </Select>
              
              <Input placeholder="Email professionnel" type="email" />
            </>
          )
        };

      case "verification":
        return {
          title: "Programmer une vérification",
          icon: Activity,
          color: "text-orange-600",
          fields: (
            <>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Équipement à vérifier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="epi1">Casque F1 - CSQ-2023-001</SelectItem>
                  <SelectItem value="epi2">Tenue feu - TF-2022-085</SelectItem>
                  <SelectItem value="epi3">ARI - ARI-2023-023</SelectItem>
                </SelectContent>
              </Select>
              
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              />
              
              <Textarea
                placeholder="Notes de vérification..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </>
          )
        };

      case "alert":
        return {
          title: "Créer une alerte",
          icon: AlertTriangle,
          color: "text-red-600",
          fields: (
            <>
              <Select onValueChange={(value) => setFormData({...formData, priority: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Haute
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      Moyenne
                    </div>
                  </SelectItem>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Basse
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              
              <Input placeholder="Titre de l'alerte" />
              
              <Textarea
                placeholder="Description de l'alerte..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </>
          )
        };

      default:
        return null;
    }
  };

  const content = getModalContent();
  if (!content) return null;

  const IconComponent = content.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Action ${actionType} created:`, formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconComponent className={`w-5 h-5 ${content.color}`} />
            {content.title}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {content.fields}
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="rescue-gradient text-white">
              <Plus className="w-4 h-4 mr-2" />
              Créer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
