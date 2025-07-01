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
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EpiDetailModal } from "@/components/modals/EpiDetailModal";

interface EpiItem {
  id: string;
  type: string;
  serialNumber: string;
  assignedTo: string;
  status: "bon" | "moyen" | "mauvais";
  lastVerification: string;
  nextVerification: string;
  location: string;
}

export function EpiTable() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEpi, setSelectedEpi] = useState<EpiItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const mockEpiData: EpiItem[] = [
    {
      id: "1",
      type: "Casque F1",
      serialNumber: "CSQ-2023-001",
      assignedTo: "Martin Dubois",
      status: "bon",
      lastVerification: "15/11/2024",
      nextVerification: "15/05/2025",
      location: "Vestiaire A"
    },
    {
      id: "2",
      type: "Tenue de feu",
      serialNumber: "TF-2022-085",
      assignedTo: "Sophie Laurent",
      status: "moyen",
      lastVerification: "10/10/2024",
      nextVerification: "10/04/2025",
      location: "Vestiaire B"
    },
    {
      id: "3",
      type: "ARI",
      serialNumber: "ARI-2023-023",
      assignedTo: "Pierre Moreau",
      status: "mauvais",
      lastVerification: "05/09/2024",
      nextVerification: "05/03/2025",
      location: "Local ARI"
    },
    {
      id: "4",
      type: "Bottes",
      serialNumber: "BT-2023-156",
      assignedTo: "Marie Durand",
      status: "bon",
      lastVerification: "20/11/2024",
      nextVerification: "20/05/2025",
      location: "Vestiaire C"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "bon":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Bon</Badge>;
      case "moyen":
        return <Badge className="bg-orange-100 text-orange-800"><Clock className="w-3 h-3 mr-1" />Moyen</Badge>;
      case "mauvais":
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="w-3 h-3 mr-1" />À remplacer</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  const handleAction = (action: string, item: EpiItem) => {
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

  const filteredData = mockEpiData.filter(item =>
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.type}</TableCell>
                  <TableCell>{item.serialNumber}</TableCell>
                  <TableCell>{item.assignedTo}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{item.lastVerification}</TableCell>
                  <TableCell>{item.nextVerification}</TableCell>
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
              ))}
            </TableBody>
          </Table>
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
          status: selectedEpi.status === "bon" ? "Bon état" : 
                 selectedEpi.status === "moyen" ? "À vérifier" : "À remplacer",
          lastCheck: selectedEpi.lastVerification,
          nextCheck: selectedEpi.nextVerification,
          statusColor: selectedEpi.status === "bon" ? "green" : 
                      selectedEpi.status === "moyen" ? "orange" : "red"
        } : null}
      />
    </>
  );
}
