
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Filter,
  Calendar,
  Loader2
} from "lucide-react";
import { useVerifications } from "@/hooks/useVerifications";
import { VerificationActions } from "./VerificationActions";
import { format, parseISO, isToday, isBefore } from "date-fns";
import { fr } from "date-fns/locale";
import type { Verification } from "@/hooks/useVerifications";

interface VerificationsListProps {
  onEditVerification: (verification: Verification) => void;
  onCompleteVerification: (verification: Verification) => void;
}

export function VerificationsList({ onEditVerification, onCompleteVerification }: VerificationsListProps) {
  const { verifications, isLoading, error } = useVerifications();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>;
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">Haute</Badge>;
      case "normal":
        return <Badge variant="secondary">Normale</Badge>;
      case "low":
        return <Badge variant="outline">Basse</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string, scheduledDate: string) => {
    const date = parseISO(scheduledDate);
    const isOverdue = isBefore(date, new Date()) && !["Terminé", "Annulé"].includes(status);
    
    switch (status.toLowerCase()) {
      case "terminé":
        return <Badge className="bg-green-100 text-green-800">Terminé</Badge>;
      case "annulé":
        return <Badge variant="secondary">Annulé</Badge>;
      case "en cours":
        return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>;
      case "planifié":
        if (isOverdue) {
          return <Badge variant="destructive">En retard</Badge>;
        }
        if (isToday(date)) {
          return <Badge className="bg-orange-100 text-orange-800">Aujourd'hui</Badge>;
        }
        return <Badge className="bg-blue-100 text-blue-800">Planifié</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredVerifications = verifications.filter(verification => {
    const matchesSearch = 
      verification.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verification.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || verification.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Erreur lors du chargement des vérifications: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Toutes les vérifications
        </CardTitle>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Rechercher par équipement ou assigné..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-input bg-background rounded-md text-sm"
          >
            <option value="all">Tous les statuts</option>
            <option value="planifié">Planifié</option>
            <option value="en cours">En cours</option>
            <option value="terminé">Terminé</option>
            <option value="annulé">Annulé</option>
          </select>
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            Chargement des vérifications...
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Équipement</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Assigné à</TableHead>
                <TableHead>Date prévue</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVerifications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    {searchTerm || statusFilter !== "all" 
                      ? "Aucune vérification trouvée pour ces critères" 
                      : "Aucune vérification planifiée"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredVerifications.map((verification) => (
                  <TableRow key={verification.id}>
                    <TableCell className="font-medium">{verification.equipmentName}</TableCell>
                    <TableCell>{verification.verificationType}</TableCell>
                    <TableCell>{verification.assignedTo}</TableCell>
                    <TableCell>
                      {format(parseISO(verification.scheduledDate), 'dd/MM/yyyy', { locale: fr })}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(verification.status, verification.scheduledDate)}
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(verification.priority)}
                    </TableCell>
                    <TableCell>
                      <VerificationActions
                        verification={verification}
                        onEdit={onEditVerification}
                        onComplete={onCompleteVerification}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
