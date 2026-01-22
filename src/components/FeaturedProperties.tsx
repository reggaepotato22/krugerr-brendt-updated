import PropertyCard, { Property } from './PropertyCard';

const properties: Property[] = [
  {
    id: '1',
    title: 'Beachfront Villa in Bofa',
    location: 'Bofa, Kilifi, Kenya',
    price: 'KES 85,000,000',
    type: 'Sale',
    beds: 5,
    baths: 6,
    sqft: 4500,
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=2074&auto=format&fit=crop'
    ]
  },
  {
    id: '2',
    title: 'Modern Apartment in Westlands',
    location: 'Westlands, Nairobi, Kenya',
    price: 'KES 150,000 / month',
    type: 'Rent',
    beds: 2,
    baths: 2,
    sqft: 1200,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: '3',
    title: 'Luxury Penthouse in Nyali',
    location: 'Nyali, Mombasa, Kenya',
    price: 'KES 45,000,000',
    type: 'Sale',
    beds: 3,
    baths: 3,
    sqft: 2800,
    images: [
      'https://images.unsplash.com/photo-1512918760513-0f96bc6a60e8?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: '4',
    title: 'Vipingo Ridge Golf Villa',
    location: 'Vipingo, Kilifi, Kenya',
    price: 'KES 65,000,000',
    type: 'Sale',
    beds: 4,
    baths: 4,
    sqft: 3500,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop'
    ]
  },
  {
    id: '5',
    title: 'Downtown Dubai Apartment',
    location: 'Downtown Dubai, UAE',
    price: '$450,000 USD',
    type: 'Sale',
    beds: 1,
    baths: 2,
    sqft: 950,
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea904ac66de?q=80&w=2009&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1984&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1628148896675-01e4384a514d?q=80&w=1974&auto=format&fit=crop'
    ]
  },
  {
    id: '6',
    title: 'Hyde Park Townhouse',
    location: 'Hyde Park, London, UK',
    price: '£2,500,000 GBP',
    type: 'Sale',
    beds: 3,
    baths: 2,
    sqft: 1500,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084&auto=format&fit=crop'
    ]
  }
];

const FeaturedProperties = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Featured Properties</h2>
            <p className="text-gray-500 max-w-xl">
              Explore our hand-picked selection of the most exclusive properties in Kenya and premier international locations.
            </p>
          </div>
          <button className="hidden md:block text-primary font-medium border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors uppercase text-sm tracking-wide">
            View All Properties
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <button className="text-primary font-medium border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors uppercase text-sm tracking-wide">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
