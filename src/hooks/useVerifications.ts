
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Verification {
  id: string;
  equipmentId: string;
  equipmentName: string;
  verificationType: string;
  scheduledDate: string;
  assignedTo: string;
  priority: string;
  status: string;
  notes?: string;
}

export function useVerifications() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: verifications = [], isLoading, error } = useQuery({
    queryKey: ['verifications'],
    queryFn: async () => {
      console.log('Fetching verifications data...');
      
      const { data, error } = await supabase
        .from('equipment_checks')
        .select(`
          *,
          equipment_items(serial_number, equipment_types(name)),
          firefighters(first_name, last_name)
        `);

      if (error) {
        console.error('Error fetching verifications:', error);
        throw error;
      }

      console.log('Verifications data fetched:', data);

      return data.map((check: any) => ({
        id: check.id,
        equipmentId: check.equipment_item_id,
        equipmentName: check.equipment_items?.equipment_types?.name || 'Équipement inconnu',
        verificationType: 'Vérification périodique',
        scheduledDate: check.check_date || new Date().toISOString().split('T')[0],
        assignedTo: check.firefighters 
          ? `${check.firefighters.first_name} ${check.firefighters.last_name}`
          : 'Non assigné',
        priority: 'normal',
        status: check.result || 'En attente',
        notes: check.notes
      })) as Verification[];
    }
  });

  const scheduleVerificationMutation = useMutation({
    mutationFn: async (newVerification: any) => {
      console.log('Scheduling new verification:', newVerification);

      // Find equipment by ID or serial number
      const { data: equipment } = await supabase
        .from('equipment_items')
        .select('id')
        .eq('serial_number', newVerification.epiId)
        .single();

      if (!equipment) {
        throw new Error('Équipement non trouvé');
      }

      // Find firefighter by name
      const names = newVerification.assignedTo.split(' ');
      const { data: firefighter } = await supabase
        .from('firefighters')
        .select('id')
        .eq('first_name', names[0])
        .eq('last_name', names[1] || '')
        .single();

      if (!firefighter) {
        throw new Error('Personnel non trouvé');
      }

      const { data, error } = await supabase
        .from('equipment_checks')
        .insert({
          equipment_item_id: equipment.id,
          checked_by: firefighter.id,
          check_date: newVerification.scheduledDate,
          next_check_date: newVerification.scheduledDate,
          result: 'Planifié',
          notes: newVerification.notes || ''
        });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verifications'] });
      toast({
        title: "Vérification planifiée",
        description: "La vérification a été planifiée avec succès",
      });
    },
    onError: (error) => {
      console.error('Error scheduling verification:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de planifier la vérification",
        variant: "destructive",
      });
    }
  });

  const updateVerificationMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      console.log('Updating verification:', id, updates);

      const { data, error } = await supabase
        .from('equipment_checks')
        .update({
          check_date: updates.scheduledDate,
          next_check_date: updates.scheduledDate,
          result: updates.status || 'Planifié',
          notes: updates.notes || ''
        })
        .eq('id', id);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verifications'] });
      toast({
        title: "Vérification modifiée",
        description: "La vérification a été modifiée avec succès",
      });
    },
    onError: (error) => {
      console.error('Error updating verification:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier la vérification",
        variant: "destructive",
      });
    }
  });

  const cancelVerificationMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Canceling verification:', id);

      const { data, error } = await supabase
        .from('equipment_checks')
        .update({ result: 'Annulé' })
        .eq('id', id);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verifications'] });
      toast({
        title: "Vérification annulée",
        description: "La vérification a été annulée",
      });
    },
    onError: (error) => {
      console.error('Error canceling verification:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'annuler la vérification",
        variant: "destructive",
      });
    }
  });

  const completeVerificationMutation = useMutation({
    mutationFn: async ({ id, result, notes }: { id: string; result: string; notes?: string }) => {
      console.log('Completing verification:', id, result);

      const { data, error } = await supabase
        .from('equipment_checks')
        .update({
          result,
          notes: notes || '',
          check_date: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verifications'] });
      toast({
        title: "Vérification terminée",
        description: "La vérification a été marquée comme terminée",
      });
    },
    onError: (error) => {
      console.error('Error completing verification:', error);
      toast({
        title: "Erreur",
        description: "Impossible de terminer la vérification",
        variant: "destructive",
      });
    }
  });

  return {
    verifications,
    isLoading,
    error,
    scheduleVerification: scheduleVerificationMutation.mutate,
    updateVerification: updateVerificationMutation.mutate,
    cancelVerification: cancelVerificationMutation.mutate,
    completeVerification: completeVerificationMutation.mutate,
    isScheduling: scheduleVerificationMutation.isPending,
    isUpdating: updateVerificationMutation.isPending,
    isCanceling: cancelVerificationMutation.isPending,
    isCompleting: completeVerificationMutation.isPending
  };
}
