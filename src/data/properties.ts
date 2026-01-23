export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  type: 'Sale' | 'Rent';
  beds: number;
  baths: number;
  sqft: number;
  images: string[];
  description?: string;
  amenities?: string[];
  coords?: [number, number];
}

export const properties: Property[] = [
  // Sale Properties
  {
    id: '1',
    title: 'Beachfront Villa in Bofa',
    location: 'Bofa, Kilifi, Kenya',
    price: 'KES 85,000,000',
    type: 'Sale',
    beds: 5,
    baths: 6,
    sqft: 4500,
    coords: [-3.6307, 39.8499],
    description: `Experience the epitome of luxury living in this stunning beachfront villa located in the prestigious Bofa area of Kilifi. This architectural masterpiece offers breathtaking ocean views, private beach access, and meticulously designed interiors that blend modern elegance with coastal charm.

The property features spacious open-plan living areas, a state-of-the-art kitchen, and expansive outdoor entertainment spaces. Each bedroom is an en-suite sanctuary with private balconies overlooking the Indian Ocean. The landscaped gardens lead directly to the pristine white sands, offering an exclusive lifestyle of tranquility and sophistication.`,
    amenities: [
      'Private Beach Access', 'Infinity Pool', 'Staff Quarters', 'Backup Generator',
      '24/7 Security', 'Landscaped Gardens', 'Double Garage', 'Air Conditioning',
      'Solar Water Heating', 'High-speed Internet'
    ],
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop'
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
    coords: [-4.0435, 39.7027],
    description: 'An exclusive penthouse with panoramic ocean views in the upmarket Nyali estate.',
    amenities: ['Ocean View', 'Swimming Pool', 'Gym', '24h Security', 'Backup Generator'],
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
    coords: [-3.8183, 39.7947],
    description: 'Luxury living on the fairway. This villa offers direct access to the PGA Baobab Course.',
    amenities: ['Golf Course Access', 'Private Pool', 'Clubhouse', 'Airstrip', 'Beach Club'],
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
    coords: [25.1972, 55.2744],
    description: 'Prime investment opportunity in the heart of Downtown Dubai, steps away from Burj Khalifa.',
    amenities: ['Concierge', 'Valet Parking', 'Spa', 'Infinity Pool', 'Smart Home System'],
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
    coords: [51.5074, -0.1278],
    description: 'Classic Victorian townhouse moments from Hyde Park.',
    amenities: ['Period Features', 'Garden', 'Fireplace', 'Wine Cellar'],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084&auto=format&fit=crop'
    ]
  },
  // Rent Properties (from RentPage)
  {
    id: 'r1',
    title: 'Modern Apartment in Westlands',
    location: 'Westlands, Nairobi, Kenya',
    price: 'KES 150,000 / month',
    type: 'Rent',
    beds: 2,
    baths: 2,
    sqft: 1200,
    coords: [-1.2646, 36.8018],
    description: 'Stylish apartment with modern finishes and city views.',
    amenities: ['Gym', 'Pool', 'High Speed Lifts', 'Backup Generator'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'r2',
    title: 'Seaside Villa Rental',
    location: 'Bofa Beach, Kilifi',
    price: 'KES 350,000 / month',
    type: 'Rent',
    beds: 4,
    baths: 5,
    sqft: 3200,
    coords: [-3.6307, 39.8499],
    description: 'Holiday home or long term rental right on the beach.',
    amenities: ['Beach Access', 'Pool', 'Furnished', 'Staff Included'],
    images: [
      'https://images.unsplash.com/photo-1512918760513-0f96bc6a60e8?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'r3',
    title: 'Executive Lavington Townhouse',
    location: 'Lavington, Nairobi',
    price: 'KES 250,000 / month',
    type: 'Rent',
    beds: 5,
    baths: 4,
    sqft: 2800,
    coords: [-1.2921, 36.7667],
    description: 'Spacious townhouse in a secure gated community.',
    amenities: ['Garden', 'DSQ', 'Gated Community', 'Ample Parking'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-e32c630bd1ba?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'r4',
    title: 'Furnished Kilimani Apartment',
    location: 'Kilimani, Nairobi',
    price: 'KES 180,000 / month',
    type: 'Rent',
    beds: 3,
    baths: 3,
    sqft: 1800,
    coords: [-1.2921, 36.7867],
    description: 'Fully furnished apartment ready to move in.',
    amenities: ['Furnished', 'Wifi', 'Cable TV', 'Housekeeping'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502005229766-939cb934d60b?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'r5',
    title: 'Nyali Beachfront Condo',
    location: 'Nyali, Mombasa',
    price: 'KES 120,000 / month',
    type: 'Rent',
    beds: 2,
    baths: 2,
    sqft: 1400,
    coords: [-4.0435, 39.7027],
    description: 'Modern condo with direct beach access.',
    amenities: ['Beach Access', 'Pool', 'Air Conditioning'],
    images: [
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'r6',
    title: 'Karen Garden Cottage',
    location: 'Karen, Nairobi',
    price: 'KES 90,000 / month',
    type: 'Rent',
    beds: 2,
    baths: 1,
    sqft: 1000,
    coords: [-1.3333, 36.7000],
    description: 'Charming cottage in a lush green environment.',
    amenities: ['Garden', 'Quiet', 'Pet Friendly', 'Water Included'],
    images: [
      'https://images.unsplash.com/photo-1599809275372-b4036417379a?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop'
    ]
  }
];

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find(p => p.id === id);
};
