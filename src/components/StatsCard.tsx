
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient?: string;
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  gradient = "fire-gradient",
  className = ""
}: StatsCardProps) {
  return (
    <Card className={`${className} overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
      <CardContent className="p-0">
        {/* Gradient header */}
        <div className={`${gradient} p-4 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium text-white/90">{title}</h3>
                {description && (
                  <p className="text-sm text-white/70">{description}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 bg-card">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-foreground">{value}</div>
            {trend && (
              <div className={`flex items-center gap-1 text-sm font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
                <div className={`w-2 h-2 rounded-full ${
                  trend.isPositive ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
