
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface EpiStatusBadgeProps {
  status: string;
}

export function EpiStatusBadge({ status }: EpiStatusBadgeProps) {
  switch (status.toLowerCase()) {
    case "available":
    case "bon":
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Bon
        </Badge>
      );
    case "maintenance":
    case "moyen":
      return (
        <Badge className="bg-orange-100 text-orange-800">
          <Clock className="w-3 h-3 mr-1" />
          Maintenance
        </Badge>
      );
    case "retired":
    case "mauvais":
      return (
        <Badge className="bg-red-100 text-red-800">
          <AlertTriangle className="w-3 h-3 mr-1" />
          À remplacer
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
}
