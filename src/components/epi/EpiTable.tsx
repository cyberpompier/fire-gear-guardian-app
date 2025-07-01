
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shield, Search, Loader2 } from "lucide-react";
import { EpiDetailModal } from "@/components/modals/EpiDetailModal";
import { EpiTableRow } from "./EpiTableRow";
import { useEquipment } from "@/hooks/useEquipment";

export function EpiTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEpi, setSelectedEpi] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { equipment, isLoading, error } = useEquipment();

  const handleViewDetails = (item: any) => {
    setSelectedEpi(item);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedEpi(null);
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
              Inventaire EPI
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
                    />
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <EpiDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
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
    </>
  );
}
