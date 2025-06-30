
import React from "react";
import { AlertsPanel } from "@/components/alerts/AlertsPanel";

export function AlertsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Centre d'Alertes</h1>
        <p className="text-muted-foreground">
          Système de notifications et alertes automatiques
        </p>
      </div>
      
      <AlertsPanel />
    </div>
  );
}
