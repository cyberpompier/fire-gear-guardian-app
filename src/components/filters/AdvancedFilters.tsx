
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  X,
  Calendar,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface Filter {
  key: string;
  label: string;
  value: string;
}

interface AdvancedFiltersProps {
  onFiltersChange?: (filters: Filter[]) => void;
  placeholder?: string;
  showStatusFilter?: boolean;
  showTypeFilter?: boolean;
  showDateFilter?: boolean;
}

export function AdvancedFilters({ 
  onFiltersChange, 
  placeholder = "Rechercher...",
  showStatusFilter = true,
  showTypeFilter = true,
  showDateFilter = true
}: AdvancedFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);

  const statusOptions = [
    { value: "bon", label: "Bon état", icon: CheckCircle, color: "green" },
    { value: "moyen", label: "État moyen", icon: AlertTriangle, color: "orange" },
    { value: "mauvais", label: "À remplacer", icon: X, color: "red" }
  ];

  const typeOptions = [
    { value: "casque", label: "Casques" },
    { value: "tenue", label: "Tenues de feu" },
    { value: "ari", label: "ARI" },
    { value: "bottes", label: "Bottes" },
    { value: "gants", label: "Gants" }
  ];

  const dateOptions = [
    { value: "today", label: "Aujourd'hui" },
    { value: "week", label: "Cette semaine" },
    { value: "month", label: "Ce mois" },
    { value: "expired", label: "Expirés" }
  ];

  const addFilter = (key: string, label: string, value: string) => {
    const newFilter = { key, label, value };
    const updatedFilters = [...activeFilters.filter(f => f.key !== key), newFilter];
    setActiveFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const removeFilter = (key: string) => {
    const updatedFilters = activeFilters.filter(f => f.key !== key);
    setActiveFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchTerm("");
    onFiltersChange?.([]);
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        {/* Search bar */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtres
          </Button>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap gap-3">
          {showStatusFilter && (
            <Select onValueChange={(value) => {
              const option = statusOptions.find(o => o.value === value);
              if (option) addFilter("status", option.label, value);
            }}>
              <SelectTrigger className="w-auto min-w-[120px]">
                <SelectValue placeholder="État" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <option.icon className={`w-3 h-3 text-${option.color}-600`} />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {showTypeFilter && (
            <Select onValueChange={(value) => {
              const option = typeOptions.find(o => o.value === value);
              if (option) addFilter("type", option.label, value);
            }}>
              <SelectTrigger className="w-auto min-w-[120px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {showDateFilter && (
            <Select onValueChange={(value) => {
              const option = dateOptions.find(o => o.value === value);
              if (option) addFilter("date", option.label, value);
            }}>
              <SelectTrigger className="w-auto min-w-[120px]">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                {dateOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Filtres actifs:</span>
            {activeFilters.map((filter) => (
              <Badge key={filter.key} variant="secondary" className="flex items-center gap-1">
                {filter.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 w-4 h-4 hover:bg-transparent"
                  onClick={() => removeFilter(filter.key)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Tout effacer
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
