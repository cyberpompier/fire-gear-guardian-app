
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Clock, Eye, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { EquipmentItem } from "@/hooks/useEquipment";

interface EpiTableActionsProps {
  item: EquipmentItem;
  onViewDetails: (item: EquipmentItem) => void;
  onScheduleVerification?: (item: EquipmentItem) => void;
}

export function EpiTableActions({ item, onViewDetails, onScheduleVerification }: EpiTableActionsProps) {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    if (action === "Voir détails") {
      onViewDetails(item);
    } else if (action === "Planifier vérification" && onScheduleVerification) {
      onScheduleVerification(item);
    } else {
      toast({
        title: `Action: ${action}`,
        description: `${action} effectuée sur ${item.type} - ${item.serialNumber}`,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuItem onClick={() => handleAction("Voir détails")}>
          <Eye className="w-4 h-4 mr-2" />
          Voir détails
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction("Modifier")}>
          <Edit className="w-4 h-4 mr-2" />
          Modifier
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction("Planifier vérification")}>
          <Calendar className="w-4 h-4 mr-2" />
          Planifier vérification
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
