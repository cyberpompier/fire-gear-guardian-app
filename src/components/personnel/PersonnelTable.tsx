
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Shield,
  Eye,
  UserCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PersonnelMember {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
  email: string;
  phone: string;
  status: "actif" | "formation" | "indisponible";
  epiCount: number;
  lastTraining: string;
}

export function PersonnelTable() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const mockPersonnelData: PersonnelMember[] = [
    {
      id: "1",
      firstName: "Martin",
      lastName: "Dubois",
      grade: "Sergent",
      email: "martin.dubois@pompiers.fr",
      phone: "06 12 34 56 78",
      status: "actif",
      epiCount: 8,
      lastTraining: "15/10/2024"
    },
    {
      id: "2",
      firstName: "Sophie",
      lastName: "Laurent",
      grade: "Caporal",
      email: "sophie.laurent@pompiers.fr",
      phone: "06 23 45 67 89",
      status: "formation",
      epiCount: 6,
      lastTraining: "02/11/2024"
    },
    {
      id: "3",
      firstName: "Pierre",
      lastName: "Moreau",
      grade: "Sapeur",
      email: "pierre.moreau@pompiers.fr",
      phone: "06 34 56 78 90",
      status: "actif",
      epiCount: 7,
      lastTraining: "25/09/2024"
    },
    {
      id: "4",
      firstName: "Marie",
      lastName: "Durand",
      grade: "Adjudant",
      email: "marie.durand@pompiers.fr",
      phone: "06 45 67 89 01",
      status: "indisponible",
      epiCount: 5,
      lastTraining: "10/08/2024"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "actif":
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>;
      case "formation":
        return <Badge className="bg-blue-100 text-blue-800">Formation</Badge>;
      case "indisponible":
        return <Badge className="bg-gray-100 text-gray-800">Indisponible</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  const getGradeBadge = (grade: string) => {
    const colors = {
      "Adjudant": "bg-purple-100 text-purple-800",
      "Sergent": "bg-blue-100 text-blue-800",
      "Caporal": "bg-orange-100 text-orange-800",
      "Sapeur": "bg-gray-100 text-gray-800"
    };
    return <Badge className={colors[grade as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{grade}</Badge>;
  };

  const handleAction = (action: string, member: PersonnelMember) => {
    toast({
      title: `Action: ${action}`,
      description: `${action} pour ${member.firstName} ${member.lastName}`,
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  const filteredData = mockPersonnelData.filter(member =>
    member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Personnel actif
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher une personne..."
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
              <TableHead>Sapeur-Pompier</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>EPI assignés</TableHead>
              <TableHead>Dernière formation</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{getInitials(member.firstName, member.lastName)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.firstName} {member.lastName}</div>
                      <div className="text-sm text-muted-foreground">{member.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getGradeBadge(member.grade)}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>{getStatusBadge(member.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    {member.epiCount}
                  </div>
                </TableCell>
                <TableCell>{member.lastTraining}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuItem onClick={() => handleAction("Voir profil", member)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Voir profil
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("Modifier", member)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("Gérer EPI", member)}>
                        <Shield className="w-4 h-4 mr-2" />
                        Gérer EPI
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("Planifier formation", member)}>
                        <UserCheck className="w-4 h-4 mr-2" />
                        Planifier formation
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
  );
}
