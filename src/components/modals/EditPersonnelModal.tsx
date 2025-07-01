
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EditPersonnelForm } from "@/components/forms/EditPersonnelForm";
import type { PersonnelMember } from "@/hooks/usePersonnel";

interface EditPersonnelModalProps {
  isOpen: boolean;
  onClose: () => void;
  personnel: PersonnelMember | null;
}

export function EditPersonnelModal({ isOpen, onClose, personnel }: EditPersonnelModalProps) {
  if (!personnel) return null;

  const handleSubmit = (data: any) => {
    console.log("Personnel updated:", data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier le personnel</DialogTitle>
        </DialogHeader>
        <EditPersonnelForm personnel={personnel} onSubmit={handleSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
}
