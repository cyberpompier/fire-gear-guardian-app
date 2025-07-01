
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { UserCheck } from "lucide-react";
import { usePersonnel } from "@/hooks/usePersonnel";
import { useEquipment } from "@/hooks/useEquipment";
import { useToast } from "@/hooks/use-toast";
import type { EquipmentItem } from "@/hooks/useEquipment";

interface AssignEpiModalProps {
  isOpen: boolean;
  onClose: () => void;
  epi: EquipmentItem | null;
}

export function AssignEpiModal({ isOpen, onClose, epi }: AssignEpiModalProps) {
  const { personnel } = usePersonnel();
  const { assignEquipment, isAssigning } = useEquipment();
  const { toast } = useToast();
  const [selectedPersonnel, setSelectedPersonnel] = useState("");

  if (!epi) return null;

  const handleAssign = () => {
    if (!selectedPersonnel) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un sapeur-pompier",
        variant: "destructive",
      });
      return;
    }

    assignEquipment({
      equipmentId: epi.id,
      personnelId: selectedPersonnel
    });

    toast({
      title: "EPI assigné",
      description: `${epi.type} assigné avec succès`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            Assigner l'EPI
          </DialogTitle>
        </DialogHeader>
        
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">EPI à assigner</Label>
              <p className="font-medium">{epi.type} - {epi.serialNumber}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="personnel">Assigner à *</Label>
              <Select value={selectedPersonnel} onValueChange={setSelectedPersonnel}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un sapeur-pompier" />
                </SelectTrigger>
                <SelectContent>
                  {personnel.map((person) => (
                    <SelectItem key={person.id} value={person.id}>
                      {person.firstName} {person.lastName} - {person.grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline" onClick={onClose} disabled={isAssigning}>
                Annuler
              </Button>
              <Button onClick={handleAssign} disabled={isAssigning}>
                {isAssigning ? "Attribution en cours..." : "Assigner"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
