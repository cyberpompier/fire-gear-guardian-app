
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { 
  MoreVertical, 
  Edit, 
  CheckCircle, 
  X, 
  Calendar,
  Clock
} from "lucide-react";
import { useVerifications } from "@/hooks/useVerifications";
import type { Verification } from "@/hooks/useVerifications";

interface VerificationActionsProps {
  verification: Verification;
  onEdit: (verification: Verification) => void;
  onComplete: (verification: Verification) => void;
}

export function VerificationActions({ verification, onEdit, onComplete }: VerificationActionsProps) {
  const { cancelVerification, isCanceling } = useVerifications();

  const handleCancel = () => {
    if (confirm("Êtes-vous sûr de vouloir annuler cette vérification ?")) {
      cancelVerification(verification.id);
    }
  };

  const canEdit = !["Terminé", "Annulé"].includes(verification.status);
  const canComplete = ["Planifié", "En cours"].includes(verification.status);
  const canCancel = !["Terminé", "Annulé"].includes(verification.status);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" disabled={isCanceling}>
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        {canEdit && (
          <DropdownMenuItem onClick={() => onEdit(verification)}>
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </DropdownMenuItem>
        )}
        
        {canComplete && (
          <DropdownMenuItem onClick={() => onComplete(verification)}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Terminer
          </DropdownMenuItem>
        )}

        {verification.status === "Planifié" && (
          <DropdownMenuItem onClick={() => onEdit(verification)}>
            <Calendar className="w-4 h-4 mr-2" />
            Reporter
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        
        {canCancel && (
          <DropdownMenuItem onClick={handleCancel} className="text-red-600">
            <X className="w-4 h-4 mr-2" />
            Annuler
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
