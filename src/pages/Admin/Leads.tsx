import React, { useState } from 'react';
import { Search, Mail, ExternalLink, MessageSquare, CheckCircle, XCircle, AlertCircle, Eye, Phone } from 'lucide-react';
import { useInquiry, Inquiry } from '../../context/InquiryContext';
import { useProperty } from '../../context/PropertyContext';

const Leads: React.FC = () => {
  const { inquiries, updateInquiryStatus, updateInquiryNotes } = useInquiry();
  const { properties } = useProperty();
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState<Inquiry | null>(null);

  const filteredLeads = inquiries.filter(lead => 
    lead.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    lead.email.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: inquiries.length,
    unread: inquiries.filter(l => l.status === 'new').length,
    contacted: inquiries.filter(l => l.status === 'contacted').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-500/10 text-green-600 dark:text-green-400';
      case 'contacted': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
      case 'archived': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPropertyDetails = (propertyId?: string) => {
    if (!propertyId) return null;
    return properties.find(p => p.id === propertyId);
  };

  const openWhatsApp = (phone?: string) => {
    if (phone) {
        // Remove spaces and special chars
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        window.open(`https://wa.me/${cleanPhone}`, '_blank');
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lead Management</h1>
          <p className="text-muted-foreground">Track and manage your property inquiries</p>
        </div>
        <div className="flex items-center gap-4 bg-card p-2 rounded-sm border border-border">
          <div className="flex items-center gap-2 px-3 border-r border-border">
            <span className="text-2xl font-bold text-primary">{stats.total}</span>
            <span className="text-xs uppercase font-bold text-muted-foreground">Total</span>
          </div>
          <div className="flex items-center gap-2 px-3 border-r border-border">
            <span className="text-2xl font-bold text-green-500">{stats.unread}</span>
            <span className="text-xs uppercase font-bold text-muted-foreground">New</span>
          </div>
          <div className="flex items-center gap-2 px-3">
            <span className="text-2xl font-bold text-blue-500">{stats.contacted}</span>
            <span className="text-xs uppercase font-bold text-muted-foreground">Contacted</span>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search leads by name or email..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-sm focus:border-primary focus:outline-none text-foreground"
        />
      </div>

      {/* Leads List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List Column */}
        <div className="lg:col-span-1 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
          {filteredLeads.map(lead => (
            <div 
              key={lead.id}
              onClick={() => setSelectedLead(lead)}
              className={`p-4 rounded-sm border cursor-pointer transition-all ${
                selectedLead?.id === lead.id 
                  ? 'bg-primary/5 border-primary shadow-sm' 
                  : 'bg-card border-border hover:border-primary/50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${lead.status === 'new' ? 'bg-green-500' : 'bg-muted'}`} />
                  <h3 className="font-bold text-foreground">{lead.customer_name}</h3>
                </div>
                <span className="text-xs text-muted-foreground">{new Date(lead.date).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{lead.message}</p>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${getStatusColor(lead.status)}`}>
                  {lead.status}
                </span>
                {lead.property_id && (
                  <span className="text-xs text-primary flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    Property Inquiry
                  </span>
                )}
              </div>
            </div>
          ))}
          {filteredLeads.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No leads found matching your search.
            </div>
          )}
        </div>

        {/* Detail Column */}
        <div className="lg:col-span-2">
          {selectedLead ? (
            <div className="bg-card border border-border rounded-sm p-6 h-full">
              <div className="flex justify-between items-start mb-6 border-b border-border pb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">{selectedLead.customer_name}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {selectedLead.email}
                    </span>
                    {selectedLead.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {selectedLead.phone}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateInquiryStatus(selectedLead.id, 'new')}
                    className={`p-2 rounded-full border ${selectedLead.status === 'new' ? 'bg-green-500 text-white border-green-500' : 'border-border text-muted-foreground hover:bg-muted'}`}
                    title="Mark as New"
                  >
                    <AlertCircle className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => updateInquiryStatus(selectedLead.id, 'contacted')}
                    className={`p-2 rounded-full border ${selectedLead.status === 'contacted' ? 'bg-blue-500 text-white border-blue-500' : 'border-border text-muted-foreground hover:bg-muted'}`}
                    title="Mark as Contacted"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => updateInquiryStatus(selectedLead.id, 'archived')}
                    className={`p-2 rounded-full border ${selectedLead.status === 'archived' ? 'bg-muted text-muted-foreground border-border' : 'border-border text-muted-foreground hover:bg-muted'}`}
                    title="Archive"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Property Context */}
                {selectedLead.property_id && (
                  <div className="bg-muted/30 p-4 rounded-sm border border-border flex items-start gap-4">
                    {(() => {
                        const prop = getPropertyDetails(selectedLead.property_id);
                        return prop ? (
                            <>
                                <div className="w-16 h-16 bg-muted rounded-sm overflow-hidden flex-shrink-0">
                                    <img src={prop.images?.[0]} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground text-sm mb-1">Inquiry for: {prop.title}</h4>
                                    <p className="text-xs text-muted-foreground mb-2">{prop.location}</p>
                                    <a href={`/property/${prop.id}`} target="_blank" rel="noreferrer" className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
                                        View Property <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </>
                        ) : (
                            <div className="text-sm text-muted-foreground italic">Property details not available (ID: {selectedLead.property_id})</div>
                        );
                    })()}
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-bold uppercase text-muted-foreground mb-3">Message</h3>
                  <div className="bg-muted/10 p-4 rounded-sm border border-border text-foreground whitespace-pre-wrap">
                    {selectedLead.message}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <a 
                    href={`mailto:${selectedLead.email}`}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Reply via Email
                  </a>
                  {selectedLead.phone && (
                    <button 
                      onClick={() => openWhatsApp(selectedLead.phone)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-sm font-medium hover:opacity-90 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Chat on WhatsApp
                    </button>
                  )}
                </div>

                {/* Admin Notes */}
                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-bold uppercase text-muted-foreground mb-3">Admin Notes / Contact Log</h3>
                  <textarea
                    className="w-full p-3 bg-muted/20 border border-border rounded-sm text-sm focus:outline-none focus:border-primary transition-colors min-h-[100px]"
                    placeholder="Record your contact details, reply info, or next steps here..."
                    value={selectedLead.notes || ''}
                    onChange={(e) => updateInquiryNotes(selectedLead.id, e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1 text-right">Saved automatically</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground border border-dashed border-border rounded-sm bg-muted/5">
              <Eye className="w-12 h-12 mb-4 opacity-20" />
              <p>Select a lead to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leads;