
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shield, Search, Loader2, Plus } from "lucide-react";
import { EpiDetailModal } from "@/components/modals/EpiDetailModal";
import { EditEpiModal } from "@/components/modals/EditEpiModal";
import { AssignEpiModal } from "@/components/modals/AssignEpiModal";
import { QuickActionModal } from "@/components/modals/QuickActionModal";
import { EpiTableRow } from "./EpiTableRow";
import { useEquipment } from "@/hooks/useEquipment";

export function EpiTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEpi, setSelectedEpi] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { equipment, isLoading, error } = useEquipment();

  const handleViewDetails = (item: any) => {
    setSelectedEpi(item);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setSelectedEpi(item);
    setIsEditModalOpen(true);
  };

  const handleAssign = (item: any) => {
    setSelectedEpi(item);
    setIsAssignModalOpen(true);
  };

  const handleScheduleVerification = (item: any) => {
    // Cette fonction sera implémentée avec le modal de planification
    console.log("Schedule verification for:", item);
  };

  const filteredData = equipment.filter(item =>
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.assignedTo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Erreur lors du chargement des équipements: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Inventaire EPI ({equipment.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher un EPI..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Button onClick={() => setIsAddModalOpen(true)} className="fire-gradient text-white">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter EPI
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              Chargement des équipements...
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>N° Série</TableHead>
                  <TableHead>Assigné à</TableHead>
                  <TableHead>État</TableHead>
                  <TableHead>Dernière vérif.</TableHead>
                  <TableHead>Prochaine vérif.</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      {searchTerm ? "Aucun équipement trouvé pour cette recherche" : "Aucun équipement dans la base de données"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item) => (
                    <EpiTableRow 
                      key={item.id} 
                      item={item} 
                      onViewDetails={handleViewDetails}
                      onEdit={handleEdit}
                      onAssign={handleAssign}
                      onScheduleVerification={handleScheduleVerification}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <EpiDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        epi={selectedEpi ? {
          id: selectedEpi.id,
          type: selectedEpi.type,
          serialNumber: selectedEpi.serialNumber,
          assignedTo: selectedEpi.assignedTo,
          status: selectedEpi.status === "Available" ? "Bon état" : 
                 selectedEpi.status === "Maintenance" ? "À vérifier" : "À remplacer",
          lastCheck: selectedEpi.lastVerification,
          nextCheck: selectedEpi.nextVerification,
          statusColor: selectedEpi.status === "Available" ? "green" : 
                      selectedEpi.status === "Maintenance" ? "orange" : "red"
        } : null}
      />

      <EditEpiModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        epi={selectedEpi}
      />

      <AssignEpiModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        epi={selectedEpi}
      />

      <QuickActionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        actionType="epi"
      />
    </>
  );
}
