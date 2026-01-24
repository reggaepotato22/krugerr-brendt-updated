import React, { useState, useEffect } from 'react';
import { Search, Mail, ExternalLink, MessageSquare, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';
import { api } from '../../lib/api';

interface Lead {
  id: string;
  customer_name: string;
  email: string;
  message: string;
  property_id: string | null;
  property_title: string | null;
  property_image: string | null;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
}

const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await api.getInquiries();
      // Normalize status to lowercase
      const normalizedData = data.map((lead: any) => ({
        ...lead,
        status: lead.status?.toLowerCase() || 'new'
      }));
      setLeads(normalizedData);
    } catch (error) {
      console.error('Failed to fetch leads', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      await api.updateInquiryStatus(id, newStatus);
      setLeads(leads.map(lead => 
        lead.id === id ? { ...lead, status: newStatus as any } : lead
      ));
    } catch (error) {
      console.error('Failed to update status', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    lead.email.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: leads.length,
    unread: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPhoneNumber = (message: string) => {
    // Try to extract phone number from message body (Format: "Phone: +1234567890")
    const phoneMatch = message.match(/Phone: ([^\n]+)/);
    return phoneMatch ? phoneMatch[1].trim() : null;
  };

  const openWhatsApp = (lead: Lead) => {
    const phone = getPhoneNumber(lead.message);
    if (phone) {
        // Remove spaces and special chars
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        window.open(`https://wa.me/${cleanPhone}`, '_blank');
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-500">Track and manage your property inquiries</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input 
            type="text" 
            placeholder="Search leads..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-full md:w-64"
          />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Leads</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <MessageSquare className="h-5 w-5" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Unread / New</p>
            <p className="text-2xl font-bold text-green-600">{stats.unread}</p>
          </div>
          <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <AlertCircle className="h-5 w-5" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Contacted</p>
            <p className="text-2xl font-bold text-blue-600">{stats.contacted}</p>
          </div>
          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <CheckCircle className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          // Skeleton Loading
          <div className="p-6 space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : filteredLeads.length === 0 ? (
          // Empty State
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
              <MessageSquare className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No inquiries found</h3>
            <p className="text-gray-500 mt-1">New leads will appear here when customers contact you.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Property Interest</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(lead.created_at).toLocaleDateString('en-GB', { 
                        day: '2-digit', month: 'short', year: 'numeric' 
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{lead.customer_name}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      {lead.property_title ? (
                        <div className="flex items-center gap-3">
                          {lead.property_image ? (
                            <img src={lead.property_image} alt="" className="h-10 w-10 rounded object-cover" />
                          ) : (
                            <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                              <ExternalLink className="h-4 w-4 text-gray-400" />
                            </div>
                          )}
                          <span className="text-sm text-gray-700 truncate max-w-[150px]">{lead.property_title}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 italic">General Inquiry</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 truncate max-w-[200px]">{lead.message}</p>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                        disabled={updatingId === lead.id}
                        className={`text-xs font-semibold px-2 py-1 rounded-full border-none focus:ring-0 cursor-pointer ${getStatusColor(lead.status)}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedLead(lead)}
                        className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Lead Details</h2>
                <p className="text-sm text-gray-500">
                  Received on {new Date(selectedLead.created_at).toLocaleString()}
                </p>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Client Info */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                  <span className="text-xl font-bold">{selectedLead.customer_name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedLead.customer_name}</h3>
                  <p className="text-gray-600">{selectedLead.email}</p>
                </div>
              </div>

              {/* Property Info */}
              {selectedLead.property_title && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-3 uppercase">Interested Property</h4>
                  <div className="flex gap-4">
                    {selectedLead.property_image && (
                      <img 
                        src={selectedLead.property_image} 
                        alt={selectedLead.property_title} 
                        className="h-20 w-24 object-cover rounded-md"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{selectedLead.property_title}</p>
                      <p className="text-sm text-gray-500">ID: {selectedLead.property_id}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2 uppercase">Message</h4>
                <div className="bg-gray-50 p-4 rounded-lg text-gray-700 whitespace-pre-wrap">
                  {selectedLead.message}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <a 
                  href={`mailto:${selectedLead.email}?subject=Re: Your inquiry about ${selectedLead.property_title || 'Krugerr Brendt Property'}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Mail className="h-4 w-4" /> Reply via Email
                </a>
                
                {getPhoneNumber(selectedLead.message) ? (
                  <button 
                    onClick={() => openWhatsApp(selectedLead)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-lg hover:bg-[#20bd5a] transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" /> Chat on WhatsApp
                  </button>
                ) : (
                  <button 
                    disabled
                    title="Phone number not found in message"
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-300 text-white py-2.5 rounded-lg cursor-not-allowed"
                  >
                    <MessageSquare className="h-4 w-4" /> No Phone Number
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
