
import React from "react";
import { AdvancedFilters } from "@/components/filters/AdvancedFilters";
import { EpiTable } from "@/components/epi/EpiTable";

export function EpiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestion des EPI</h1>
        <p className="text-muted-foreground">
          Gestion complète des équipements de protection individuelle
        </p>
      </div>

      <AdvancedFilters 
        placeholder="Rechercher un équipement..."
        showStatusFilter={true}
        showTypeFilter={true}
        showDateFilter={true}
      />

      <EpiTable />
    </div>
  );
}
