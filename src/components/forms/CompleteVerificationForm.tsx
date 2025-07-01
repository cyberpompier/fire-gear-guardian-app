
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import { useVerifications } from "@/hooks/useVerifications";
import type { Verification } from "@/hooks/useVerifications";

interface CompleteVerificationFormProps {
  verification: Verification;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function CompleteVerificationForm({ verification, onSubmit, onCancel }: CompleteVerificationFormProps) {
  const { completeVerification, isCompleting } = useVerifications();
  const [formData, setFormData] = useState({
    result: "",
    notes: ""
  });

  const resultOptions = [
    { value: "Conforme", label: "Conforme - Bon état" },
    { value: "Conforme avec réserves", label: "Conforme avec réserves" },
    { value: "Non conforme", label: "Non conforme - À remplacer" },
    { value: "Maintenance requise", label: "Maintenance requise" },
    { value: "À retirer du service", label: "À retirer du service" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.result) {
      return;
    }

    completeVerification({
      id: verification.id,
      result: formData.result,
      notes: formData.notes
    });

    onSubmit(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Terminer la vérification
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {verification.equipmentName} - {verification.assignedTo}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="result">Résultat de la vérification *</Label>
            <Select value={formData.result} onValueChange={(value) => setFormData({...formData, result: value})} required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner le résultat" />
              </SelectTrigger>
              <SelectContent>
                {resultOptions.map((result) => (
                  <SelectItem key={result.value} value={result.value}>{result.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observations et commentaires</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Détails sur l'état de l'équipement, actions recommandées..."
              rows={4}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isCompleting}>
              Annuler
            </Button>
            <Button type="submit" className="rescue-gradient text-white" disabled={isCompleting || !formData.result}>
              {isCompleting ? "Finalisation..." : "Terminer la vérification"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
