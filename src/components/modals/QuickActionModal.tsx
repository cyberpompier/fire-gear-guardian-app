
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddEpiForm } from "@/components/forms/AddEpiForm";
import { AddPersonnelForm } from "@/components/forms/AddPersonnelForm";
import { ScheduleVerificationForm } from "@/components/forms/ScheduleVerificationForm";
import { CreateAlertForm } from "@/components/forms/CreateAlertForm";
import { useToast } from "@/hooks/use-toast";

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: "epi" | "personnel" | "verification" | "alert" | null;
}

export function QuickActionModal({ isOpen, onClose, actionType }: QuickActionModalProps) {
  const { toast } = useToast();

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data);
    
    const messages = {
      epi: "EPI ajouté avec succès",
      personnel: "Sapeur-pompier ajouté avec succès",
      verification: "Vérification planifiée avec succès",
      alert: "Alerte créée avec succès"
    };

    toast({
      title: "Succès",
      description: messages[actionType as keyof typeof messages],
    });

    onClose();
  };

  const getTitleByType = () => {
    switch (actionType) {
      case "epi": return "Ajouter un EPI";
      case "personnel": return "Ajouter un sapeur-pompier";
      case "verification": return "Planifier une vérification";
      case "alert": return "Créer une alerte";
      default: return "";
    }
  };

  const renderForm = () => {
    switch (actionType) {
      case "epi":
        return <AddEpiForm onSubmit={handleSubmit} onCancel={onClose} />;
      case "personnel":
        return <AddPersonnelForm onSubmit={handleSubmit} onCancel={onClose} />;
      case "verification":
        return <ScheduleVerificationForm onSubmit={handleSubmit} onCancel={onClose} />;
      case "alert":
        return <CreateAlertForm onSubmit={handleSubmit} onCancel={onClose} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getTitleByType()}</DialogTitle>
        </DialogHeader>
        {renderForm()}
      </DialogContent>
    </Dialog>
  );
}
