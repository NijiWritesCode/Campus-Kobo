import { useState } from 'react';
import { mockAdminAuditLogs } from '@/mocks/data/adminAuditLogs';

const STORAGE_KEY = 'campus-kobo-admin-audit-logs';

function loadStoredAuditLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : mockAdminAuditLogs;
  } catch {
    return mockAdminAuditLogs;
  }
}

export function useAdminAuditLogs() {
  const [logs, setLogs] = useState(loadStoredAuditLogs);

  const addAuditLog = ({ action, targetResource, targetId, description, severity = 'INFO' }) => {
    const newEntry = {
      id: `aud-${Date.now()}`,
      action,
      actorName: 'Campus Admin (UNILAG)',
      actorEmail: 'admin@campuskobo.ng',
      targetResource,
      targetId,
      description,
      timestamp: new Date().toISOString(),
      ipAddress: '102.89.44.12',
      severity,
    };
    const updated = [newEntry, ...logs];
    setLogs(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save audit log', e);
    }
  };

  return {
    logs,
    addAuditLog,
  };
}
