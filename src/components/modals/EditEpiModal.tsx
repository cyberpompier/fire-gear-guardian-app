
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EditEpiForm } from "@/components/forms/EditEpiForm";
import type { EquipmentItem } from "@/hooks/useEquipment";

interface EditEpiModalProps {
  isOpen: boolean;
  onClose: () => void;
  epi: EquipmentItem | null;
}

export function EditEpiModal({ isOpen, onClose, epi }: EditEpiModalProps) {
  if (!epi) return null;

  const handleSubmit = (data: any) => {
    console.log("EPI updated:", data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier l'EPI</DialogTitle>
        </DialogHeader>
        <EditEpiForm epi={epi} onSubmit={handleSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
}
