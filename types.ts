
export enum EquipmentStatus {
  RUNNING = '🟢',
  STOPPED = '🔴',
  STANDBY = '🟡',
  ANOMALY = '⚠️'
}

export interface Equipment {
  id: string;
  tag: string;
  status: EquipmentStatus;
  comment?: string;
}

export interface EquipmentGroup {
  name: string;
  items: Equipment[];
}

export interface DailyReport {
  id: string;
  date: string;
  shift: string;
  team: string;
  operator: string;
  groups: EquipmentGroup[];
  observations: string;
  createdAt: number;
}
