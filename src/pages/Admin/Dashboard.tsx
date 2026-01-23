import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Building2, MessageSquare, DollarSign, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    totalInquiries: 0,
    newInquiries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch Properties Stats
      const { count: totalProps } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true });

      const { count: activeProps } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'available');

      // Fetch Inquiries Stats
      const { count: totalInqs } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true });

      const { count: newInqs } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new');

      setStats({
        totalProperties: totalProps || 0,
        activeListings: activeProps || 0,
        totalInquiries: totalInqs || 0,
        newInquiries: newInqs || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, link }: any) => (
    <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-serif font-bold text-secondary">{value}</h3>
        {link && (
          <Link to={link} className="text-primary text-xs font-medium mt-3 inline-block hover:underline">
            View Details &rarr;
          </Link>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  );

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-secondary mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Properties" 
          value={stats.totalProperties} 
          icon={Building2} 
          color="bg-blue-500"
          link="/admin/properties"
        />
        <StatCard 
          title="Active Listings" 
          value={stats.activeListings} 
          icon={TrendingUp} 
          color="bg-green-500"
          link="/admin/properties"
        />
        <StatCard 
          title="Total Leads" 
          value={stats.totalInquiries} 
          icon={MessageSquare} 
          color="bg-purple-500"
          link="/admin/inquiries"
        />
        <StatCard 
          title="New Inquiries" 
          value={stats.newInquiries} 
          icon={MessageSquare} 
          color="bg-primary"
          link="/admin/inquiries"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
          <h3 className="font-bold text-secondary mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link 
              to="/admin/properties/add" 
              className="block w-full bg-secondary text-white text-center py-3 rounded-sm hover:bg-secondary/90 transition-colors uppercase text-sm font-medium tracking-wide"
            >
              Add New Property
            </Link>
            <Link 
              to="/admin/inquiries" 
              className="block w-full border border-gray-200 text-gray-600 text-center py-3 rounded-sm hover:bg-gray-50 transition-colors uppercase text-sm font-medium tracking-wide"
            >
              View Recent Leads
            </Link>
          </div>
        </div>
        
        {/* Placeholder for Recent Activity or Charts */}
        <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 text-sm">
          Analytics & Charts Coming Soon
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
