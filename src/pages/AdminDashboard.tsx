
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getLeads, updateLeadStatus, deleteLead, Lead } from '../services/crm';
import { Trash2, CheckCircle, Mail, Phone, Calendar, Search } from 'lucide-react';

const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'New' | 'Contacted' | 'Closed'>('All');

  useEffect(() => {
    // Load leads
    setLeads(getLeads());
  }, []);

  const handleStatusChange = (id: string, newStatus: Lead['status']) => {
    updateLeadStatus(id, newStatus);
    setLeads(getLeads()); // Refresh
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      deleteLead(id);
      setLeads(getLeads());
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(filter.toLowerCase()) || 
                          lead.email.toLowerCase().includes(filter.toLowerCase()) ||
                          lead.propertyTitle?.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="pt-32 pb-12 bg-secondary text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-serif mb-2">CRM Dashboard</h1>
          <p className="text-gray-400">Manage your leads and inquiries.</p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-6 py-12">
        {/* Controls */}
        <div className="bg-white p-4 rounded-sm shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-sm focus:border-primary focus:outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            {(['All', 'New', 'Contacted', 'Closed'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wide rounded-sm transition-colors ${
                  statusFilter === s 
                    ? 'bg-primary text-secondary' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Leads List */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Property</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-400">
                      No leads found.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {new Date(lead.date).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(lead.date).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-secondary">{lead.name}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <Mail className="w-3 h-3" /> {lead.email}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <Phone className="w-3 h-3" /> {lead.phone}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-secondary font-medium">
                        {lead.propertyTitle || 'General Inquiry'}
                        {lead.propertyId && (
                          <span className="block text-xs text-gray-400 font-normal">ID: {lead.propertyId}</span>
                        )}
                      </td>
                      <td className="p-4 text-sm text-gray-600 max-w-xs truncate">
                        {lead.message}
                      </td>
                      <td className="p-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                          className={`text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-sm border-none focus:ring-0 cursor-pointer ${
                            lead.status === 'New' ? 'bg-blue-100 text-blue-700' :
                            lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => handleDelete(lead.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
