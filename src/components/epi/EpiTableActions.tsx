
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Eye, Calendar, UserCheck, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEquipment } from "@/hooks/useEquipment";
import type { EquipmentItem } from "@/hooks/useEquipment";

interface EpiTableActionsProps {
  item: EquipmentItem;
  onViewDetails: (item: EquipmentItem) => void;
  onEdit: (item: EquipmentItem) => void;
  onAssign: (item: EquipmentItem) => void;
  onScheduleVerification?: (item: EquipmentItem) => void;
}

export function EpiTableActions({ 
  item, 
  onViewDetails, 
  onEdit, 
  onAssign, 
  onScheduleVerification 
}: EpiTableActionsProps) {
  const { toast } = useToast();
  const { deleteEquipment, isDeleting } = useEquipment();

  const handleDelete = () => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer cet EPI : ${item.type} - ${item.serialNumber} ?`)) {
      deleteEquipment(item.id);
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
        <DropdownMenuItem onClick={() => onViewDetails(item)}>
          <Eye className="w-4 h-4 mr-2" />
          Voir détails
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onEdit(item)}>
          <Edit className="w-4 h-4 mr-2" />
          Modifier
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onAssign(item)}>
          <UserCheck className="w-4 h-4 mr-2" />
          Assigner
        </DropdownMenuItem>
        
        {onScheduleVerification && (
          <DropdownMenuItem onClick={() => onScheduleVerification(item)}>
            <Calendar className="w-4 h-4 mr-2" />
            Planifier vérification
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          <Trash2 className="w-4 h-4 mr-2" />
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
