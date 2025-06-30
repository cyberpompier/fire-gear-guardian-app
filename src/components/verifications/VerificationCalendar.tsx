
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { 
  Activity, 
  Calendar as CalendarIcon, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VerificationEvent {
  id: string;
  date: Date;
  equipment: string;
  type: "routine" | "urgent" | "maintenance";
  assignedTo: string;
  status: "planifie" | "en_cours" | "termine";
}

export function VerificationCalendar() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const mockVerifications: VerificationEvent[] = [
    {
      id: "1",
      date: new Date(2024, 11, 28),
      equipment: "Casque F1 - CSQ-2023-001",
      type: "routine",
      assignedTo: "Martin Dubois",
      status: "planifie"
    },
    {
      id: "2",
      date: new Date(2024, 11, 30),
      equipment: "ARI - ARI-2023-023",
      type: "urgent",
      assignedTo: "Sophie Laurent",
      status: "planifie"
    },
    {
      id: "3",
      date: new Date(2025, 0, 5),
      equipment: "Tenue feu - TF-2022-085",
      type: "maintenance",
      assignedTo: "Pierre Moreau",
      status: "planifie"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "routine":
        return "bg-blue-100 text-blue-800";
      case "urgent":
        return "bg-red-100 text-red-800";
      case "maintenance":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "planifie":
        return <Clock className="w-4 h-4" />;
      case "en_cours":
        return <Activity className="w-4 h-4" />;
      case "termine":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getEventsForDate = (date: Date) => {
    return mockVerifications.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const handleScheduleVerification = () => {
    toast({
      title: "Nouvelle vérification",
      description: "Planification d'une nouvelle vérification",
    });
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Calendrier des vérifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              hasEvent: (date) => getEventsForDate(date).length > 0
            }}
            modifiersStyles={{
              hasEvent: { backgroundColor: '#3b82f6', color: 'white' }
            }}
          />
          <div className="mt-4">
            <Button onClick={handleScheduleVerification} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Planifier une vérification
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Events for selected date */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Vérifications du {selectedDate?.toLocaleDateString('fr-FR')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {selectedDateEvents.length > 0 ? (
            selectedDateEvents.map((event) => (
              <div key={event.id} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(event.status)}
                      <span className="font-medium">{event.equipment}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Assigné à: {event.assignedTo}
                    </div>
                  </div>
                  <Badge className={getTypeColor(event.type)}>
                    {event.type === "routine" ? "Routine" : 
                     event.type === "urgent" ? "Urgent" : "Maintenance"}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Aucune vérification prévue ce jour</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
