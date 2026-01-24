
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  propertyTitle?: string;
  date: string;
  status: 'new' | 'contacted' | 'closed';
}

const STORAGE_KEY = 'kb_crm_leads';

export const getLeads = (): Lead[] => {
  const leads = localStorage.getItem(STORAGE_KEY);
  return leads ? JSON.parse(leads) : [];
};

export const saveLead = (lead: Omit<Lead, 'id' | 'date' | 'status'>): Lead => {
  const leads = getLeads();
  const newLead: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    status: 'new'
  };
  leads.unshift(newLead);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  return newLead;
};

export const updateLeadStatus = (id: string, status: Lead['status']) => {
  const leads = getLeads();
  const index = leads.findIndex(l => l.id === id);
  if (index !== -1) {
    leads[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  }
};

export const deleteLead = (id: string) => {
  const leads = getLeads();
  const filteredLeads = leads.filter(l => l.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredLeads));
};
