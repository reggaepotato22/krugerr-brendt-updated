import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { Plus, Trash2, Edit, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminProperties = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const data = await api.getProperties();
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    
    // API does not implement DELETE yet, showing alert
    alert("Delete not implemented in PHP API demo yet.");
  };

  if (loading) return <div>Loading properties...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-serif font-bold text-secondary">All Properties</h1>
        <Link 
          to="/admin/properties/add" 
          className="bg-primary text-secondary px-4 py-2 rounded-sm font-bold uppercase text-xs tracking-wide flex items-center gap-2 hover:bg-white transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New
        </Link>
      </div>

      <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Property</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-sm overflow-hidden flex-shrink-0">
                        {property.image_urls?.[0] ? (
                          <img src={property.image_urls[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-secondary text-sm line-clamp-1">{property.title}</h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <MapPin className="w-3 h-3" />
                          {property.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium text-gray-600">{property.type}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium text-primary font-serif">
                      {property.currency} {property.price.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded-sm ${
                      property.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => deleteProperty(property.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {properties.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No properties found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProperties;
