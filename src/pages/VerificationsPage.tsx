
import React from "react";
import { VerificationCalendar } from "@/components/verifications/VerificationCalendar";

export function VerificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Vérifications</h1>
        <p className="text-muted-foreground">
          Planification et suivi des contrôles périodiques des EPI
        </p>
      </div>

      <VerificationCalendar />
    </div>
  );
}
