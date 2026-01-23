import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { Mail, CheckCircle, Clock } from 'lucide-react';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const data = await api.getInquiries();
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsContacted = async (id: string) => {
    try {
      await api.updateInquiryStatus(id, 'contacted');
      
      // Update local state
      setInquiries(inquiries.map(inq => 
        inq.id === id ? { ...inq, status: 'contacted' } : inq
      ));
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  if (loading) return <div>Loading inquiries...</div>;

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-secondary mb-8">Leads & Inquiries</h1>

      <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
        {inquiries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No inquiries found.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-secondary">{inquiry.customer_name}</h3>
                      <span className={`px-2 py-0.5 text-xs font-bold uppercase rounded-sm ${
                        inquiry.status === 'new' 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {inquiry.status}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Mail className="w-3 h-3" />
                      <a href={`mailto:${inquiry.email}`} className="hover:text-primary transition-colors">
                        {inquiry.email}
                      </a>
                    </div>

                    <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-sm border border-gray-100 italic">
                      "{inquiry.message}"
                    </p>
                    
                    {inquiry.property_id && (
                      <p className="text-xs text-gray-400 mt-2">
                        Ref: Property ID {inquiry.property_id}
                      </p>
                    )}
                  </div>

                  {inquiry.status === 'new' && (
                    <button
                      onClick={() => markAsContacted(inquiry.id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-sm hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors whitespace-nowrap"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark Contacted
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;
