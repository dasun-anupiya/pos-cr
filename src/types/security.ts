export interface UserActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  ipAddress: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

export interface BackupInfo {
  id: string;
  timestamp: string;
  size: string;
  status: 'inProgress' | 'completed' | 'failed';
  filename: string;
  createdBy: string;
}

export interface BackupSchedule {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  retentionDays: number;
  lastBackup: string | null;
  nextBackup: string | null;
} 