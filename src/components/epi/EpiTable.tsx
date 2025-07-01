
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Shield, 
  Search, 
  MoreVertical, 
  Edit, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Eye,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EpiDetailModal } from "@/components/modals/EpiDetailModal";
import { useEquipment } from "@/hooks/useEquipment";

export function EpiTable() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEpi, setSelectedEpi] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { equipment, isLoading, error } = useEquipment();

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
      case "bon":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Bon</Badge>;
      case "maintenance":
      case "moyen":
        return <Badge className="bg-orange-100 text-orange-800"><Clock className="w-3 h-3 mr-1" />Maintenance</Badge>;
      case "retired":
      case "mauvais":
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="w-3 h-3 mr-1" />À remplacer</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleAction = (action: string, item: any) => {
    if (action === "Voir détails") {
      setSelectedEpi(item);
      setIsDetailModalOpen(true);
    } else {
      toast({
        title: `Action: ${action}`,
        description: `${action} effectuée sur ${item.type} - ${item.serialNumber}`,
      });
    }
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
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.type}</TableCell>
                      <TableCell>{item.serialNumber}</TableCell>
                      <TableCell>{item.assignedTo}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>{item.lastVerification || 'N/A'}</TableCell>
                      <TableCell>{item.nextVerification || 'N/A'}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuItem onClick={() => handleAction("Voir détails", item)}>
                              <Eye className="w-4 h-4 mr-2" />
                              Voir détails
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Modifier", item)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Planifier vérification", item)}>
                              <Clock className="w-4 h-4 mr-2" />
                              Planifier vérification
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
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
