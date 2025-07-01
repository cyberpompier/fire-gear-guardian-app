
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
  Users, 
  Search, 
  MoreVertical, 
  Edit, 
  UserCheck,
  Mail,
  Phone,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePersonnel } from "@/hooks/usePersonnel";

export function PersonnelTable() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const { personnel, isLoading, error } = usePersonnel();

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "actif":
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>;
      case "formation":
        return <Badge className="bg-blue-100 text-blue-800">Formation</Badge>;
      case "congé":
        return <Badge className="bg-orange-100 text-orange-800">Congé</Badge>;
      case "indisponible":
        return <Badge className="bg-red-100 text-red-800">Indisponible</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleAction = (action: string, person: any) => {
    toast({
      title: `Action: ${action}`,
      description: `${action} effectuée pour ${person.firstName} ${person.lastName}`,
    });
  };

  const filteredData = personnel.filter(person =>
    `${person.firstName} ${person.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.caserne.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Erreur lors du chargement du personnel: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Personnel ({personnel.length})
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher un sapeur-pompier..."
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
            Chargement du personnel...
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Caserne</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>EPI assignés</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    {searchTerm ? "Aucun personnel trouvé pour cette recherche" : "Aucun personnel dans la base de données"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell className="font-medium">{person.lastName}</TableCell>
                    <TableCell>{person.firstName}</TableCell>
                    <TableCell>{person.grade}</TableCell>
                    <TableCell>{person.caserne}</TableCell>
                    <TableCell>{person.email}</TableCell>
                    <TableCell>{getStatusBadge(person.status)}</TableCell>
                    <TableCell>{person.epiCount}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white">
                          <DropdownMenuItem onClick={() => handleAction("Voir profil", person)}>
                            <UserCheck className="w-4 h-4 mr-2" />
                            Voir profil
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction("Modifier", person)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction("Assigner EPI", person)}>
                            <UserCheck className="w-4 h-4 mr-2" />
                            Assigner EPI
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => window.open(`mailto:${person.email}`)}>
                            <Mail className="w-4 h-4 mr-2" />
                            Envoyer email
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
  );
}
