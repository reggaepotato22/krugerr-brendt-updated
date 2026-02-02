import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { Building2, MessageSquare, TrendingUp } from 'lucide-react';
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
      // Fetch Properties
      const properties = await api.getProperties();
      const totalProps = properties.length;
      const activeProps = properties.filter((p: any) => p.status === 'available').length;

      // Fetch Inquiries (Leads)
      const inquiries = await api.getInquiries();
      const totalInqs = inquiries.length;
      const newInqs = inquiries.filter((i: any) => i.status === 'new').length;

      setStats({
        totalProperties: totalProps,
        activeListings: activeProps,
        totalInquiries: totalInqs,
        newInquiries: newInqs,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, link }: any) => (
    <div className="bg-card p-6 rounded-sm shadow-sm border border-border flex items-start justify-between">
      <div>
        <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-serif font-bold text-foreground">{value}</h3>
        {link && (
          <Link to={link} className="text-primary text-xs font-medium mt-3 inline-block hover:underline">
            View Details &rarr;
          </Link>
        )}
      </div>
      <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
  );

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-foreground mb-8">Dashboard Overview</h1>
      
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
          link="/admin/leads"
        />
        <StatCard 
          title="New Inquiries" 
          value={stats.newInquiries} 
          icon={MessageSquare} 
          color="bg-red-500"
          link="/admin/leads"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card p-6 rounded-sm shadow-sm border border-border">
          <h3 className="font-bold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link 
              to="/admin/properties/add" 
              className="block w-full bg-secondary text-secondary-foreground text-center py-3 rounded-sm hover:bg-secondary/90 transition-colors uppercase text-sm font-medium tracking-wide"
            >
              Add New Property
            </Link>
            <Link 
              to="/admin/inquiries" 
              className="block w-full border border-border text-muted-foreground text-center py-3 rounded-sm hover:bg-muted/50 transition-colors uppercase text-sm font-medium tracking-wide"
            >
              View Recent Leads
            </Link>
          </div>
        </div>
        
        {/* Placeholder for Recent Activity or Charts */}
        <div className="bg-card p-6 rounded-sm shadow-sm border border-border flex items-center justify-center text-muted-foreground text-sm">
          Analytics & Charts Coming Soon
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
