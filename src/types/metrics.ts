import { ComponentType } from 'react';

export interface DepartmentMetric {
  value: number;
  total: number;
}

export interface StatCard {
  id: string;
  title: string;
  value: string;
  sublabel: string;
  icon: ComponentType<any>;
  iconColor: string;
  metrics: {
    frontDesk: DepartmentMetric;
    housekeeping: DepartmentMetric;
    roomService: DepartmentMetric;
    concierge: DepartmentMetric;
  };
} 