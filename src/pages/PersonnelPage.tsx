
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  users, 
  search, 
  plus,
  shield,
  calendar,
  phone,
  mail
} from "lucide-react";

export function PersonnelPage() {
  const mockPersonnel = [
    {
      id: "SP001",
      firstName: "Martin",
      lastName: "Dubois",
      grade: "Caporal-Chef",
      caserne: "CS Principal",
      phone: "06.12.34.56.78",
      email: "martin.dubois@sdis.fr",
      epiCount: 8,
      status: "Actif",
      lastUpdate: "2024-01-15"
    },
    {
      id: "SP002",
      firstName: "Sophie",
      lastName: "Laurent", 
      grade: "Sergent",
      caserne: "CS Principal",
      phone: "06.23.45.67.89",
      email: "sophie.laurent@sdis.fr",
      epiCount: 12,
      status: "Actif",
      lastUpdate: "2024-01-14"
    },
    {
      id: "SP003",
      firstName: "Pierre",
      lastName: "Moreau",
      grade: "Sapeur 1ère classe",
      caserne: "CS Annexe",
      phone: "06.34.56.78.90",
      email: "pierre.moreau@sdis.fr",
      epiCount: 6,
      status: "En formation",
      lastUpdate: "2024-01-10"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif": return "bg-green-100 text-green-800 border-green-200";
      case "En formation": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Congé": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion du Personnel</h1>
          <p className="text-muted-foreground">
            Sapeurs-pompiers et attribution des EPI
          </p>
        </div>
        <Button className="emergency-gradient text-white border-0 hover:opacity-90">
          <plus className="w-4 h-4 mr-2" />
          Nouveau Personnel
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Rechercher par nom, grade ou caserne..." 
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">Filtrer</Button>
                <Button variant="outline">Exporter</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="emergency-gradient text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <users className="w-8 h-8" />
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-white/80">Personnel actif</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personnel List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <users className="w-5 h-5 text-primary" />
            Liste du personnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPersonnel.map((person) => (
              <div 
                key={person.id}
                className="flex flex-col lg:flex-row gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {getInitials(person.firstName, person.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">
                      {person.firstName} {person.lastName}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {person.grade}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(person.status)}
                      >
                        {person.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Caserne</p>
                    <p className="font-medium">{person.caserne}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Contact</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <phone className="w-3 h-3 text-muted-foreground" />
                        <span className="font-mono text-xs">{person.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <mail className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs">{person.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-muted-foreground">EPI attribués</p>
                    <div className="flex items-center gap-1">
                      <shield className="w-4 h-4 text-primary" />
                      <span className="font-bold text-primary">{person.epiCount}</span>
                      <span className="text-muted-foreground">équipements</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Dernière MAJ</p>
                    <div className="flex items-center gap-1">
                      <calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs">{person.lastUpdate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 lg:flex-col">
                  <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                    Voir profil
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                    EPI
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
