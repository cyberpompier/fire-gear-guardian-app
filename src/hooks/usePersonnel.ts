
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PersonnelMember {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
  caserne: string;
  email: string;
  status: string;
  epiCount: number;
}

export function usePersonnel() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: personnel = [], isLoading, error } = useQuery({
    queryKey: ['personnel'],
    queryFn: async () => {
      console.log('Fetching personnel data...');
      
      const { data, error } = await supabase
        .from('firefighters')
        .select('*');

      if (error) {
        console.error('Error fetching personnel:', error);
        throw error;
      }

      console.log('Personnel data fetched:', data);

      return data.map((person: any) => ({
        id: person.id,
        firstName: person.first_name,
        lastName: person.last_name,
        grade: 'Sapeur',
        caserne: person.station || 'CS Principal',
        email: person.email,
        status: 'Actif',
        epiCount: 0
      })) as PersonnelMember[];
    }
  });

  const addPersonnelMutation = useMutation({
    mutationFn: async (newPerson: any) => {
      console.log('Adding new personnel:', newPerson);

      const { data, error } = await supabase
        .from('firefighters')
        .insert({
          first_name: newPerson.firstName,
          last_name: newPerson.lastName,
          email: newPerson.email,
          station: newPerson.caserne
        });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personnel'] });
      toast({
        title: "Personnel ajouté",
        description: "Le sapeur-pompier a été ajouté avec succès",
      });
    },
    onError: (error) => {
      console.error('Error adding personnel:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le personnel",
        variant: "destructive",
      });
    }
  });

  return {
    personnel,
    isLoading,
    error,
    addPersonnel: addPersonnelMutation.mutate,
    isAdding: addPersonnelMutation.isPending
  };
}
