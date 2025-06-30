
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, User, Calendar, CheckCircle, AlertTriangle, Clock } from "lucide-react";

interface EpiDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  epi: {
    id: string;
    type: string;
    serialNumber: string;
    assignedTo: string;
    status: string;
    lastCheck: string;
    nextCheck: string;
    statusColor: string;
  } | null;
}

export function EpiDetailModal({ isOpen, onClose, epi }: EpiDetailModalProps) {
  if (!epi) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Bon état": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "À vérifier": return <Clock className="w-4 h-4 text-orange-600" />;
      case "À remplacer": return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string, color: string) => {
    const variants = {
      green: "bg-green-100 text-green-800 border-green-200",
      orange: "bg-orange-100 text-orange-800 border-orange-200", 
      red: "bg-red-100 text-red-800 border-red-200"
    };
    
    return (
      <Badge variant="outline" className={variants[color as keyof typeof variants]}>
        {getStatusIcon(status)}
        <span className="ml-1">{status}</span>
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Détails de l'EPI
          </DialogTitle>
          <DialogDescription>
            Informations complètes sur l'équipement de protection
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations principales */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      {epi.type}
                      {getStatusBadge(epi.status, epi.statusColor)}
                    </h3>
                    <p className="text-sm text-muted-foreground">Type d'équipement</p>
                  </div>
                  
                  <div>
                    <p className="font-mono text-lg">{epi.serialNumber}</p>
                    <p className="text-sm text-muted-foreground">Numéro de série</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{epi.assignedTo}</p>
                      <p className="text-sm text-muted-foreground">Assigné à</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dates et vérifications */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Vérifications
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-green-700">Dernière vérification</p>
                  <p className="text-sm text-muted-foreground">{epi.lastCheck}</p>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-orange-700">Prochaine vérification</p>
                  <p className="text-sm text-muted-foreground">{epi.nextCheck}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
            <Button variant="outline">
              Modifier
            </Button>
            <Button className="rescue-gradient text-white">
              Effectuer vérification
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
