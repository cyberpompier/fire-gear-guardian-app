
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface EquipmentItem {
  id: string;
  type: string;
  serialNumber: string;
  assignedTo: string | null;
  status: string;
  lastVerification: string | null;
  nextVerification: string | null;
  location: string;
  purchaseDate: string;
}

export function useEquipment() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: equipment = [], isLoading, error } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      console.log('Fetching equipment data...');
      
      const { data, error } = await supabase
        .from('equipment_items')
        .select(`
          *,
          equipment_types(name),
          firefighters(first_name, last_name)
        `);

      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }

      console.log('Equipment data fetched:', data);

      return data.map((item: any) => ({
        id: item.id,
        type: item.equipment_types?.name || 'Type inconnu',
        serialNumber: item.serial_number,
        assignedTo: item.firefighters 
          ? `${item.firefighters.first_name} ${item.firefighters.last_name}`
          : 'Non assigné',
        status: item.status || 'Disponible',
        lastVerification: item.last_check_date,
        nextVerification: item.next_check_date,
        location: 'Caserne principale',
        purchaseDate: item.purchase_date
      })) as EquipmentItem[];
    }
  });

  const addEquipmentMutation = useMutation({
    mutationFn: async (newEquipment: any) => {
      console.log('Adding new equipment:', newEquipment);

      // First, get or create equipment type
      let typeId = null;
      const { data: existingType } = await supabase
        .from('equipment_types')
        .select('id')
        .eq('name', newEquipment.type)
        .single();

      if (existingType) {
        typeId = existingType.id;
      } else {
        const { data: newType, error: typeError } = await supabase
          .from('equipment_types')
          .insert({ name: newEquipment.type })
          .select('id')
          .single();

        if (typeError) throw typeError;
        typeId = newType.id;
      }

      const { data, error } = await supabase
        .from('equipment_items')
        .insert({
          type_id: typeId,
          serial_number: newEquipment.serialNumber,
          purchase_date: newEquipment.purchaseDate || new Date().toISOString().split('T')[0],
          next_check_date: newEquipment.nextCheck,
          status: newEquipment.status || 'Available'
        });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      toast({
        title: "EPI ajouté",
        description: "L'équipement a été ajouté avec succès",
      });
    },
    onError: (error) => {
      console.error('Error adding equipment:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'équipement",
        variant: "destructive",
      });
    }
  });

  return {
    equipment,
    isLoading,
    error,
    addEquipment: addEquipmentMutation.mutate,
    isAdding: addEquipmentMutation.isPending
  };
}
