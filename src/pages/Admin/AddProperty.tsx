import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { Upload, X, MapPin, Info, Home, Layout, Loader2 } from 'lucide-react';

const AddProperty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'KES',
    location: '',
    type: 'Sale',
    status: 'available',
    beds: '',
    baths: '',
    sqft: '',
    lat: '',
    lng: '',
    amenities: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...newFiles]);
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Upload Images
      const uploadedUrls: string[] = [];
      if (images.length > 0) {
        setUploading(true);
        for (const image of images) {
            const res = await api.uploadImage(image);
            if (res.url) {
                uploadedUrls.push(res.url);
            }
        }
        setUploading(false);
      }

      // 2. Prepare Data
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        beds: parseInt(formData.beds) || 0,
        baths: parseInt(formData.baths) || 0,
        sqft: parseInt(formData.sqft) || 0,
        coords: [parseFloat(formData.lat) || 0, parseFloat(formData.lng) || 0],
        image_urls: uploadedUrls,
        amenities: formData.amenities.split(',').map(s => s.trim()).filter(Boolean)
      };

      // 3. Send to API
      await api.addProperty(propertyData);
      
      alert('Property added successfully!');
      navigate('/admin/properties');
    } catch (error: any) {
      console.error('Error adding property:', error);
      alert('Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-serif font-bold text-secondary mb-8">Add New Property</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
            <Info className="w-5 h-5 text-primary" /> Basic Information
          </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full bg-primary/10 border border-primary/20 p-3 rounded-sm focus:outline-none focus:border-primary focus:bg-white transition-colors text-gray-900 placeholder-gray-500"
              placeholder="e.g. Luxury Villa in Kilifi"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Price</label>
            <div className="flex">
              <select
                value={formData.currency}
                onChange={e => setFormData({...formData, currency: e.target.value})}
                className="bg-primary/20 border border-primary/20 border-r-0 p-3 rounded-l-sm focus:outline-none text-gray-900"
              >
                <option value="KES">KES</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="EUR">EUR</option>
              </select>
              <input
                type="number"
                required
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
                className="w-full bg-primary/10 border border-primary/20 p-3 rounded-r-sm focus:outline-none focus:border-primary focus:bg-white transition-colors text-gray-900 placeholder-gray-500"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Type</label>
            <select
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
              className="w-full bg-primary/10 border border-primary/20 p-3 rounded-sm focus:outline-none focus:border-primary focus:bg-white transition-colors text-gray-900 placeholder-gray-500"
            >
              <option value="Sale">For Sale</option>
              <option value="Rent">For Rent</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Location</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
              className="w-full bg-primary/10 border border-primary/20 p-3 rounded-sm focus:outline-none focus:border-primary focus:bg-white transition-colors text-gray-900 placeholder-gray-500"
              placeholder="City, Area"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Latitude</label>
              <input
                type="text"
                value={formData.lat}
                onChange={e => setFormData({...formData, lat: e.target.value})}
                className="w-full bg-primary/10 border border-primary/20 p-3 rounded-sm focus:outline-none focus:border-primary focus:bg-white transition-colors text-gray-900 placeholder-gray-500"
                placeholder="-1.2921"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Longitude</label>
              <input
                type="text"
                value={formData.lng}
                onChange={e => setFormData({...formData, lng: e.target.value})}
                className="w-full bg-primary/10 border border-primary/20 p-3 rounded-sm focus:outline-none focus:border-primary focus:bg-white transition-colors text-gray-900 placeholder-gray-500"
                placeholder="36.8219"
              />
            </div>
          </div>
        </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Beds</label>
            <input
              type="number"
              value={formData.beds}
              onChange={e => setFormData({...formData, beds: e.target.value})}
              className="w-full bg-primary/10 border border-primary/20 p-3 rounded-sm focus:outline-none focus:border-primary focus:bg-white transition-colors text-gray-900 placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Baths</label>
            <input
              type="number"
              value={formData.baths}
              onChange={e => setFormData({...formData, baths: e.target.value})}
              className="w-full bg-primary/10 border border-primary/20 p-3 rounded-sm focus:outline-none focus:border-primary focus:bg-white transition-colors text-gray-900 placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Sq Ft</label>
            <input
              type="number"
              value={formData.sqft}
              onChange={e => setFormData({...formData, sqft: e.target.value})}
              className="w-full bg-primary/10 border border-primary/20 p-3 rounded-sm focus:outline-none focus:border-primary focus:bg-white transition-colors text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Amenities</label>
          <input
            type="text"
            value={formData.amenities}
            onChange={e => setFormData({...formData, amenities: e.target.value})}
            className="w-full bg-primary/10 border border-primary/20 p-3 rounded-sm focus:outline-none focus:border-primary focus:bg-white transition-colors text-gray-900 placeholder-gray-500"
            placeholder="Pool, Gym, Security (comma separated)"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Description</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full bg-primary/10 border border-primary/20 p-3 rounded-sm focus:outline-none focus:border-primary focus:bg-white transition-colors text-gray-900 placeholder-gray-500"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Images</label>
          <div className="border-2 border-dashed border-gray-200 rounded-sm p-8 text-center hover:bg-gray-50 transition-colors relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500 font-medium">Click or drag images here to upload</p>
          </div>
          
          {/* Previews */}
          {previews.length > 0 && (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {previews.map((url, idx) => (
                <div key={idx} className="relative aspect-video bg-gray-100 rounded-sm overflow-hidden group">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-secondary font-bold py-4 uppercase tracking-wide hover:bg-secondary hover:text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Adding Property...' : 'Add Property'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;