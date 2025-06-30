
import React from "react";
import { PersonnelTable } from "@/components/personnel/PersonnelTable";

export function PersonnelPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestion du Personnel</h1>
        <p className="text-muted-foreground">
          Administration des sapeurs-pompiers et assignation des EPI
        </p>
      </div>

      <PersonnelTable />
    </div>
  );
}
