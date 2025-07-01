export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      artisans: {
        Row: {
          adresse: string | null
          created_at: string
          id: number
          nom: string | null
          note: number | null
          phone_number: string | null
          photo: string | null
          profession: string | null
        }
        Insert: {
          adresse?: string | null
          created_at?: string
          id?: number
          nom?: string | null
          note?: number | null
          phone_number?: string | null
          photo?: string | null
          profession?: string | null
        }
        Update: {
          adresse?: string | null
          created_at?: string
          id?: number
          nom?: string | null
          note?: number | null
          phone_number?: string | null
          photo?: string | null
          profession?: string | null
        }
        Relationships: []
      }
      engins: {
        Row: {
          created_at: string | null
          cs_affectation: string | null
          description: string | null
          id: string
          name: string
          photo_url: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          cs_affectation?: string | null
          description?: string | null
          id?: string
          name?: string
          photo_url?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          cs_affectation?: string | null
          description?: string | null
          id?: string
          name?: string
          photo_url?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      equipment_assignments: {
        Row: {
          assignment_date: string | null
          created_at: string | null
          equipment_item_id: string
          firefighter_id: string
          id: string
          return_date: string | null
        }
        Insert: {
          assignment_date?: string | null
          created_at?: string | null
          equipment_item_id: string
          firefighter_id: string
          id?: string
          return_date?: string | null
        }
        Update: {
          assignment_date?: string | null
          created_at?: string | null
          equipment_item_id?: string
          firefighter_id?: string
          id?: string
          return_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "equipment_assignments_equipment_item_id_fkey"
            columns: ["equipment_item_id"]
            isOneToOne: false
            referencedRelation: "equipment_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipment_assignments_firefighter_id_fkey"
            columns: ["firefighter_id"]
            isOneToOne: false
            referencedRelation: "firefighters"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment_checks: {
        Row: {
          check_date: string | null
          checked_by: string
          created_at: string | null
          equipment_item_id: string
          id: string
          next_check_date: string | null
          notes: string | null
          result: string
        }
        Insert: {
          check_date?: string | null
          checked_by: string
          created_at?: string | null
          equipment_item_id: string
          id?: string
          next_check_date?: string | null
          notes?: string | null
          result: string
        }
        Update: {
          check_date?: string | null
          checked_by?: string
          created_at?: string | null
          equipment_item_id?: string
          id?: string
          next_check_date?: string | null
          notes?: string | null
          result?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipment_checks_checked_by_fkey"
            columns: ["checked_by"]
            isOneToOne: false
            referencedRelation: "firefighters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipment_checks_equipment_item_id_fkey"
            columns: ["equipment_item_id"]
            isOneToOne: false
            referencedRelation: "equipment_items"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment_items: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          id: string
          last_check_date: string | null
          next_check_date: string | null
          purchase_date: string
          serial_number: string
          status: string | null
          type_id: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          last_check_date?: string | null
          next_check_date?: string | null
          purchase_date: string
          serial_number: string
          status?: string | null
          type_id: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          last_check_date?: string | null
          next_check_date?: string | null
          purchase_date?: string
          serial_number?: string
          status?: string | null
          type_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "equipment_items_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "firefighters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipment_items_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "equipment_types"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment_types: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          lifespan_months: number | null
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          lifespan_months?: number | null
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          lifespan_months?: number | null
          name?: string
        }
        Relationships: []
      }
      firefighters: {
        Row: {
          created_at: string | null
          email: string
          first_name: string
          grade: string | null
          id: string
          last_name: string
          phone: string | null
          station: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name: string
          grade?: string | null
          id?: string
          last_name: string
          phone?: string | null
          station?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string
          grade?: string | null
          id?: string
          last_name?: string
          phone?: string | null
          station?: string | null
          status?: string | null
        }
        Relationships: []
      }
      items: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
        }
        Relationships: []
      }
      materiels: {
        Row: {
          affectation: string | null
          comment: string | null
          created_at: string | null
          description: string | null
          doc: string | null
          emplacement: string | null
          engin_id: string | null
          etat: string | null
          id: string
          is_controlled: boolean | null
          media: string | null
          name: string
          photo_url: string | null
          quantite_nominale: number | null
          quantite_reelle: number | null
          user_id: string | null
        }
        Insert: {
          affectation?: string | null
          comment?: string | null
          created_at?: string | null
          description?: string | null
          doc?: string | null
          emplacement?: string | null
          engin_id?: string | null
          etat?: string | null
          id?: string
          is_controlled?: boolean | null
          media?: string | null
          name?: string
          photo_url?: string | null
          quantite_nominale?: number | null
          quantite_reelle?: number | null
          user_id?: string | null
        }
        Update: {
          affectation?: string | null
          comment?: string | null
          created_at?: string | null
          description?: string | null
          doc?: string | null
          emplacement?: string | null
          engin_id?: string | null
          etat?: string | null
          id?: string
          is_controlled?: boolean | null
          media?: string | null
          name?: string
          photo_url?: string | null
          quantite_nominale?: number | null
          quantite_reelle?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_engin"
            columns: ["engin_id"]
            isOneToOne: false
            referencedRelation: "engins"
            referencedColumns: ["id"]
          },
        ]
      }
      personnel: {
        Row: {
          affectation: string
          contact_email: string | null
          created_at: string | null
          grade: string
          id: string
          name: string
          photo_url: string | null
          prenom: string
          role: string
          status: string
          user_id: string
        }
        Insert: {
          affectation?: string
          contact_email?: string | null
          created_at?: string | null
          grade?: string
          id?: string
          name?: string
          photo_url?: string | null
          prenom?: string
          role?: string
          status?: string
          user_id: string
        }
        Update: {
          affectation?: string
          contact_email?: string | null
          created_at?: string | null
          grade?: string
          id?: string
          name?: string
          photo_url?: string | null
          prenom?: string
          role?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      personnels: {
        Row: {
          affectation: string
          contact_email: string
          created_at: string | null
          grade: string
          id: string
          name: string
          photo_url: string | null
          prenom: string
          status: string
        }
        Insert: {
          affectation?: string
          contact_email?: string
          created_at?: string | null
          grade?: string
          id?: string
          name?: string
          photo_url?: string | null
          prenom?: string
          status?: string
        }
        Update: {
          affectation?: string
          contact_email?: string
          created_at?: string | null
          grade?: string
          id?: string
          name?: string
          photo_url?: string | null
          prenom?: string
          status?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          affectation: string | null
          email: string | null
          grade: string | null
          id: string
          photo_url: string | null
          prenom: string | null
          status: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          affectation?: string | null
          email?: string | null
          grade?: string | null
          id: string
          photo_url?: string | null
          prenom?: string | null
          status?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          affectation?: string | null
          email?: string | null
          grade?: string | null
          id?: string
          photo_url?: string | null
          prenom?: string | null
          status?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      requests: {
        Row: {
          created_at: string | null
          description: string
          equipment_item_id: string | null
          id: string
          request_type: string
          requester_id: string
          resolved_at: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          equipment_item_id?: string | null
          id?: string
          request_type: string
          requester_id: string
          resolved_at?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          equipment_item_id?: string | null
          id?: string
          request_type?: string
          requester_id?: string
          resolved_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "requests_equipment_item_id_fkey"
            columns: ["equipment_item_id"]
            isOneToOne: false
            referencedRelation: "equipment_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "firefighters"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
