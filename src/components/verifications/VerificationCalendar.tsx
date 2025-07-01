
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  CalendarIcon, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Loader2
} from "lucide-react";
import { useVerifications } from "@/hooks/useVerifications";
import { format, parseISO, isToday, isBefore, isAfter } from "date-fns";
import { fr } from "date-fns/locale";

export function VerificationCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { verifications, isLoading, error } = useVerifications();

  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">Haute</Badge>;
      case "normal":
        return <Badge className="bg-blue-100 text-blue-800">Normale</Badge>;
      case "low":
        return <Badge className="bg-gray-100 text-gray-800">Basse</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getStatusIcon = (status: string, scheduledDate: string) => {
    const date = parseISO(scheduledDate);
    if (status.toLowerCase() === 'terminé') {
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
    if (isBefore(date, new Date()) && status.toLowerCase() !== 'terminé') {
      return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
    if (isToday(date)) {
      return <Clock className="w-4 h-4 text-orange-600" />;
    }
    return <Clock className="w-4 h-4 text-blue-600" />;
  };

  const getVerificationsForDate = (date: Date) => {
    return verifications.filter(verification => {
      const verificationDate = parseISO(verification.scheduledDate);
      return (
        verificationDate.getDate() === date.getDate() &&
        verificationDate.getMonth() === date.getMonth() &&
        verificationDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const selectedDateVerifications = selectedDate ? getVerificationsForDate(selectedDate) : [];

  const upcomingVerifications = verifications
    .filter(v => isAfter(parseISO(v.scheduledDate), new Date()))
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
    .slice(0, 5);

  const overdueVerifications = verifications
    .filter(v => isBefore(parseISO(v.scheduledDate), new Date()) && v.status.toLowerCase() !== 'terminé')
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendrier */}
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
            locale={fr}
            className="rounded-md border"
            modifiers={{
              hasVerification: (date) => getVerificationsForDate(date).length > 0,
              overdue: (date) => {
                const dateVerifications = getVerificationsForDate(date);
                return dateVerifications.some(v => 
                  isBefore(parseISO(v.scheduledDate), new Date()) && 
                  v.status.toLowerCase() !== 'terminé'
                );
              }
            }}
            modifiersStyles={{
              hasVerification: { backgroundColor: '#e3f2fd', fontWeight: 'bold' },
              overdue: { backgroundColor: '#ffebee', color: '#d32f2f' }
            }}
          />
          
          {selectedDate && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">
                Vérifications pour le {format(selectedDate, 'dd MMMM yyyy', { locale: fr })}
              </h4>
              {selectedDateVerifications.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucune vérification prévue</p>
              ) : (
                <div className="space-y-2">
                  {selectedDateVerifications.map((verification) => (
                    <div key={verification.id} className="flex items-center gap-2 text-sm p-2 bg-muted rounded">
                      {getStatusIcon(verification.status, verification.scheduledDate)}
                      <span className="font-medium">{verification.equipmentName}</span>
                      <span>-</span>
                      <span>{verification.assignedTo}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Liste des vérifications */}
      <div className="space-y-6">
        {/* Vérifications en retard */}
        {overdueVerifications.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                Vérifications en retard ({overdueVerifications.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Chargement...
                </div>
              ) : (
                <div className="space-y-2">
                  {overdueVerifications.slice(0, 3).map((verification) => (
                    <div key={verification.id} className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <div>
                        <p className="font-medium text-sm">{verification.equipmentName}</p>
                        <p className="text-xs text-muted-foreground">
                          {verification.assignedTo} - {format(parseISO(verification.scheduledDate), 'dd/MM/yyyy')}
                        </p>
                      </div>
                      {getPriorityBadge(verification.priority)}
                    </div>
                  ))}
                  {overdueVerifications.length > 3 && (
                    <p className="text-xs text-muted-foreground text-center">
                      ... et {overdueVerifications.length - 3} autres
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Prochaines vérifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Prochaines vérifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Chargement...
              </div>
            ) : upcomingVerifications.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucune vérification planifiée</p>
            ) : (
              <div className="space-y-2">
                {upcomingVerifications.map((verification) => (
                  <div key={verification.id} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div>
                      <p className="font-medium text-sm">{verification.equipmentName}</p>
                      <p className="text-xs text-muted-foreground">
                        {verification.assignedTo} - {format(parseISO(verification.scheduledDate), 'dd/MM/yyyy')}
                      </p>
                    </div>
                    {getPriorityBadge(verification.priority)}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
