
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { EpiStatusBadge } from "./EpiStatusBadge";
import { EpiTableActions } from "./EpiTableActions";
import type { EquipmentItem } from "@/hooks/useEquipment";

interface EpiTableRowProps {
  item: EquipmentItem;
  onViewDetails: (item: EquipmentItem) => void;
}

export function EpiTableRow({ item, onViewDetails }: EpiTableRowProps) {
  return (
    <TableRow key={item.id}>
      <TableCell className="font-medium">{item.type}</TableCell>
      <TableCell>{item.serialNumber}</TableCell>
      <TableCell>{item.assignedTo}</TableCell>
      <TableCell>
        <EpiStatusBadge status={item.status} />
      </TableCell>
      <TableCell>{item.lastVerification || 'N/A'}</TableCell>
      <TableCell>{item.nextVerification || 'N/A'}</TableCell>
      <TableCell>{item.location}</TableCell>
      <TableCell>
        <EpiTableActions item={item} onViewDetails={onViewDetails} />
      </TableCell>
    </TableRow>
  );
}
