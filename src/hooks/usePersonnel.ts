
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
        grade: person.grade || 'Sapeur',
        caserne: person.station || 'CS Principal',
        email: person.email,
        status: person.status || 'Actif',
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
          station: newPerson.caserne,
          grade: newPerson.grade,
          phone: newPerson.phone || '',
          status: newPerson.status || 'Actif'
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

  const updatePersonnelMutation = useMutation({
    mutationFn: async (personnelData: any) => {
      console.log('Updating personnel:', personnelData);

      const { data, error } = await supabase
        .from('firefighters')
        .update({
          first_name: personnelData.firstName,
          last_name: personnelData.lastName,
          email: personnelData.email,
          station: personnelData.caserne,
          grade: personnelData.grade,
          status: personnelData.status
        })
        .eq('id', personnelData.id);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personnel'] });
      toast({
        title: "Personnel modifié",
        description: "Le sapeur-pompier a été modifié avec succès",
      });
    },
    onError: (error) => {
      console.error('Error updating personnel:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le personnel",
        variant: "destructive",
      });
    }
  });

  const deletePersonnelMutation = useMutation({
    mutationFn: async (personnelId: string) => {
      console.log('Deleting personnel:', personnelId);

      const { data, error } = await supabase
        .from('firefighters')
        .delete()
        .eq('id', personnelId);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personnel'] });
      toast({
        title: "Personnel supprimé",
        description: "Le sapeur-pompier a été supprimé avec succès",
      });
    },
    onError: (error) => {
      console.error('Error deleting personnel:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le personnel",
        variant: "destructive",
      });
    }
  });

  return {
    personnel,
    isLoading,
    error,
    addPersonnel: addPersonnelMutation.mutate,
    updatePersonnel: updatePersonnelMutation.mutate,
    deletePersonnel: deletePersonnelMutation.mutate,
    isAdding: addPersonnelMutation.isPending,
    isUpdating: updatePersonnelMutation.isPending,
    isDeleting: deletePersonnelMutation.isPending
  };
}
