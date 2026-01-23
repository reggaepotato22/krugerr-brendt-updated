import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Vipingo Development",
    location: "Vipingo, Kilifi",
    description: "An exclusive gated community featuring modern swahili-inspired villas, an 18-hole golf course, and private beach access. The epitome of coastal luxury living.",
    progress: 75,
    status: "Under Construction",
    completion: "Q4 2026",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "The Nairobi Heights",
    location: "Upper Hill, Nairobi",
    description: "A 35-story residential tower redefining the Nairobi skyline. Smart-home enabled apartments with panoramic city views and world-class amenities.",
    progress: 40,
    status: "Foundation Complete",
    completion: "Q2 2027",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Dubai Marina Pearl",
    location: "Dubai Marina, UAE",
    description: "Ultra-luxury waterfront residences. Experience the future of living with sustainable architecture and unparalleled service in the heart of Dubai.",
    progress: 90,
    status: "Finishing Touches",
    completion: "Q1 2026",
    image: "https://images.unsplash.com/photo-1512453979798-5ea904ac66de?q=80&w=2009&auto=format&fit=crop"
  }
];

const NewProjectsPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center justify-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop" 
            alt="New Projects" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-serif text-white mb-4"
          >
            New Developments
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg"
          >
            Pioneering the future of luxury living with our upcoming architectural masterpieces.
          </motion.p>
        </div>
      </div>

      <main className="flex-grow">
        {projects.map((project, index) => (
          <section key={project.id} className="relative py-24 border-b border-gray-100 last:border-0">
            <div className="container mx-auto px-6">
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                
                {/* Image Side */}
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-1/2 h-[400px] lg:h-[500px] relative rounded-lg overflow-hidden shadow-2xl group"
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                </motion.div>

                {/* Content Side */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full lg:w-1/2 space-y-6"
                >
                  <span className="text-primary tracking-widest uppercase text-sm font-bold">{project.location}</span>
                  <h2 className="text-3xl md:text-4xl font-serif text-secondary">{project.title}</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">{project.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-secondary">{project.status}</span>
                      <span className="text-primary">{project.progress}% Complete</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-primary"
                      />
                    </div>
                    <p className="text-xs text-gray-400 text-right">Est. Completion: {project.completion}</p>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button className="bg-secondary text-white px-8 py-3 rounded-sm hover:bg-primary transition-colors flex items-center gap-2 group">
                      <Download className="w-4 h-4" />
                      Download Brochure
                    </button>
                    <button className="border border-secondary text-secondary px-8 py-3 rounded-sm hover:bg-secondary hover:text-white transition-colors flex items-center gap-2">
                      Inquire Now
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default NewProjectsPage;
