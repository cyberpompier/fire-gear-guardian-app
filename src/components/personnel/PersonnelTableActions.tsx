
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
  UserCheck, 
  Mail,
  Trash2
} from "lucide-react";
import { usePersonnel } from "@/hooks/usePersonnel";
import type { PersonnelMember } from "@/hooks/usePersonnel";

interface PersonnelTableActionsProps {
  personnel: PersonnelMember;
  onViewProfile: (personnel: PersonnelMember) => void;
  onEdit: (personnel: PersonnelMember) => void;
}

export function PersonnelTableActions({ 
  personnel, 
  onViewProfile, 
  onEdit 
}: PersonnelTableActionsProps) {
  const { deletePersonnel, isDeleting } = usePersonnel();

  const handleDelete = () => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ce personnel : ${personnel.firstName} ${personnel.lastName} ?`)) {
      deletePersonnel(personnel.id);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" disabled={isDeleting}>
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuItem onClick={() => onViewProfile(personnel)}>
          <UserCheck className="w-4 h-4 mr-2" />
          Voir profil
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onEdit(personnel)}>
          <Edit className="w-4 h-4 mr-2" />
          Modifier
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => window.open(`mailto:${personnel.email}`)}>
          <Mail className="w-4 h-4 mr-2" />
          Envoyer email
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          <Trash2 className="w-4 h-4 mr-2" />
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
