import { motion, AnimatePresence } from "framer-motion";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { useState } from "react";
import { Star, X, Users, MapPin, Briefcase, MessageSquare } from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Responsive stats positions
const stats = [
  { 
    value: "45+", 
    label: "Happy Clients", 
    icon: Users,
    position: { top: "38%", left: "10%" } 
  },
  { 
    value: "12+", 
    label: "Countries", 
    icon: MapPin,
    
    position: { bottom: "10%", left: "32%" } 
  },
  { 
    value: "100+", 
    label: "Projects Done", 
    icon: Briefcase,
    position: { top: "25%", right: "10%" } 
  },
];

const clients = [
  {
    name: "James Mitchell",
    country: "USA",
    flagUrl: "https://flagcdn.com/w40/us.png",
    coordinates: [-100, 40] as [number, number],
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review: "Exceptional work! Delivered our SaaS platform on time with outstanding quality and amazing attention to architectural details.",
    stars: 5,
  },
  {
    name: "Carlos Silva",
    country: "Brazil",
    flagUrl: "https://flagcdn.com/w40/br.png",
    coordinates: [-55, -15] as [number, number],
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    review: "Great problem-solving skills and incredible post-launch support for our high-traffic platform.",
    stars: 5,
  },
  {
    name: "Oliver Bennett",
    country: "UK",
    flagUrl: "https://flagcdn.com/w40/gb.png",
    coordinates: [-3, 55] as [number, number],
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    review: "Highly professional. Our e-commerce system works flawlessly since day one with brilliant performance metrics.",
    stars: 5,
  },
  {
    name: "Lucas Dubois",
    country: "France",
    flagUrl: "https://flagcdn.com/w40/fr.png",
    coordinates: [15, 48] as [number, number],
    image: "https://randomuser.me/api/portraits/men/28.jpg",
    review: "Incredible attention to detail and superb user interface design implementation across all screens.",
    stars: 5,
  },
  {
    name: "Hans Mueller",
    country: "Germany",
    flagUrl: "https://flagcdn.com/w40/de.png",
    coordinates: [30, 60] as [number, number],
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    review: "World-class backend architecture. Our system handles millions of requests smoothly without a single glitch.",
    stars: 5,
  },
  {
    name: "Ahmed Al Rashid",
    country: "Dubai, UAE",
    flagUrl: "https://flagcdn.com/w40/ae.png",
    coordinates: [54, 24] as [number, number],
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    review: "Amazing AI automation solution. Saved us hours of manual work every day with seamless API integrations.",
    stars: 5,
  },
  {
    name: "Khalid Al Saud",
    country: "Saudi Arabia",
    flagUrl: "https://flagcdn.com/w40/sa.png",
    coordinates: [20, 5] as [number, number],
    image: "https://randomuser.me/api/portraits/men/61.jpg",
    review: "Built our mobile app from scratch. Clean code, beautiful UI, zero bugs, and delivered well ahead of schedule.",
    stars: 5,
  },
  {
    name: "Aarav Sharma",
    country: "India",
    flagUrl: "https://flagcdn.com/w40/in.png",
    coordinates: [78, 22] as [number, number],
    image: "https://randomuser.me/api/portraits/men/91.jpg",
    review: "Fantastic development process and clean architecture implementation for our enterprise portal.",
    stars: 5,
  },
  {
    name: "Wei Zhang",
    country: "China",
    flagUrl: "https://flagcdn.com/w40/cn.png",
    coordinates: [105, 35] as [number, number],
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    review: "Outstanding full-stack development. Exceeded all our expectations on scalability and speed.",
    stars: 5,
  },
  {
    name: "Hiroshi Tanaka",
    country: "Japan",
    flagUrl: "https://flagcdn.com/w40/jp.png",
    coordinates: [138, 36] as [number, number],
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    review: "Top-notch performance tuning. Our web application speed doubled overnight after code refactoring.",
    stars: 5,
  },
  {
    name: "Liam O'Connor",
    country: "Australia",
    flagUrl: "https://flagcdn.com/w40/au.png",
    coordinates: [135, -25] as [number, number],
    image: "https://randomuser.me/api/portraits/men/82.jpg",
    review: "A true professional who understands full-stack requirements inside out and delivers rock-solid code.",
    stars: 5,
  },
  {
    name: "Matteo Rossi",
    country: "Italy",
    flagUrl: "https://flagcdn.com/w40/it.png",
    coordinates: [45, 42] as [number, number],
    image: "https://randomuser.me/api/portraits/men/36.jpg",
    review: "Fast communication and very reliable delivery timelines. Highly recommended for any complex web project!",
    stars: 5,
  },
];

const Global = () => {
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [showAllReviewsModal, setShowAllReviewsModal] = useState(false);
  const [expandedReviewIndex, setExpandedReviewIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedReviewIndex(expandedReviewIndex === index ? null : index);
  };

  return (
    <section className="relative w-full pt-2 pb-8 overflow-hidden bg-background transition-colors duration-300">

      {/* Heading with Theme Color Span */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto px-6 mb-[-10px] md:mb-[-20px] relative z-20"
      >
        <div className="inline-flex items-center gap-2 mb-0">
          <span className="text-base text-primary">✦</span>
          <h2 className="text-xl md:text-4xl font-bold text-foreground tracking-tight">
            <span className="text-primary">Our</span> Trusted Reviews
          </h2>
        </div>
      </motion.div>

      {/* Map + Integrated Stats Container */}
      <div className="relative w-full max-w-5xl mx-auto px-4 h-[420px] md:h-[580px] flex items-center justify-center">

        {/* World Map Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ComposableMap
            projectionConfig={{ scale: 140, center: [10, 0] }}
            style={{ width: "100%", height: "100%" }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: { rsmKey: string }[] }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "rgba(0, 149, 255, 0.12)", // Blue fill for both themes
                        stroke: "rgba(0, 149, 255, 0.35)", // Blue stroke/border for both themes
                        strokeWidth: 0.6,
                        outline: "none",
                      },
                      hover: {
                        fill: "rgba(0, 228, 255, 0.25)",
                        stroke: "#00E4FF",
                        strokeWidth: 0.8,
                        outline: "none",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Map Markers with Client Images */}
            {clients.map((client, i) => (
              <Marker
                key={i}
                coordinates={client.coordinates}
                onClick={() => setSelectedClient(i)}
              >
                <circle r="12" fill="rgba(0,228,255,0.2)" stroke="rgba(0,228,255,0.6)" strokeWidth="1">
                  <animate attributeName="r" from="6" to="16" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite" />
                </circle>

                <foreignObject x="-16" y="-16" width="32" height="32" style={{ overflow: 'visible' }}>
                  <div 
                    className="relative cursor-pointer group flex flex-col items-center justify-center"
                    onClick={() => setSelectedClient(i)}
                  >
                    <div className="relative">
                      <img
                        src={client.image}
                        alt={client.name}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 shadow-xl group-hover:scale-110 transition-transform duration-300 border-primary"
                      />
                      <div className="absolute -bottom-1 -right-1 z-20 w-3.5 h-2.5 md:w-4.5 md:h-3 rounded-[2px] overflow-hidden border border-background shadow-md">
                        <img
                          src={client.flagUrl}
                          alt={client.country}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] bg-card text-card-foreground px-1.5 py-0.5 rounded border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-40 shadow-md">
                      {client.name}
                    </div>
                  </div>
                </foreignObject>
              </Marker>
            ))}
          </ComposableMap>
        </div>

        {/* Stats Tags */}
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 + 0.7, duration: 0.5, type: "spring" }}
              className="absolute px-2.5 py-1.5 rounded-xl border border-border bg-card/90 backdrop-blur-md shadow-lg z-30 flex items-center gap-2"
              style={stat.position}
            >
              <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground tracking-tight leading-none mb-0.5">
                  {stat.value}
                </p>
                <p className="text-[9px] text-muted-foreground font-medium leading-tight">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}

      </div>

      {/* See Our Detailed Reviews Button */}
      <div className="flex justify-center mt-[-20px] md:mt-[-10px] relative z-30">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAllReviewsModal(true)}
          className="px-5 py-2.5 rounded-xl border border-primary/40 bg-card/90 hover:bg-primary/10 text-foreground text-xs md:text-sm font-semibold shadow-lg flex items-center gap-2 transition-all duration-300 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 text-primary" />
          See our detailed reviews
        </motion.button>
      </div>

      {/* Single Client Review Modal */}
      <AnimatePresence>
        {selectedClient !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setSelectedClient(null)}
            />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 180 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-72 md:w-80 rounded-2xl border border-border bg-card shadow-2xl p-5 md:p-6 text-card-foreground"
            >
              <button
                onClick={() => setSelectedClient(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full bg-muted cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={clients[selectedClient].image}
                    alt={clients[selectedClient].name}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 shadow-inner border-primary"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-3.5 rounded overflow-hidden border border-background shadow-lg">
                    <img
                      src={clients[selectedClient].flagUrl}
                      alt={clients[selectedClient].country}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-base md:text-lg font-bold text-foreground">{clients[selectedClient].name}</p>
                  <p className="text-xs text-primary font-medium">{clients[selectedClient].country}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {Array.from({ length: clients[selectedClient].stars }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed italic font-normal">
                "{clients[selectedClient].review}"
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* All Detailed Reviews Large Modal */}
      <AnimatePresence>
        {showAllReviewsModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-50"
              onClick={() => setShowAllReviewsModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 180 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[92%] max-w-2xl max-h-[85vh] rounded-2xl border border-border bg-card shadow-2xl p-5 md:p-8 flex flex-col text-card-foreground"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                    <span className="text-primary">All</span> Client Reviews
                  </h3>
                  <p className="text-xs text-muted-foreground">Read what our global clients say about our work</p>
                </div>
                <button
                  onClick={() => setShowAllReviewsModal(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full bg-muted border border-border cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Reviews List */}
              <div className="overflow-y-auto pr-2 space-y-4 flex-1 custom-scrollbar">
                {clients.map((client, index) => {
                  const isExpanded = expandedReviewIndex === index;
                  return (
                    <div 
                      key={index}
                      className="p-4 rounded-xl border border-border bg-muted/40 hover:bg-muted/70 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={client.image}
                            alt={client.name}
                            className="w-10 h-10 rounded-full object-cover border border-primary"
                          />
                          <div>
                            <h4 className="text-sm font-bold text-foreground">{client.name}</h4>
                            <p className="text-[10px] text-primary font-medium">{client.country}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: client.stars }).map((_, s) => (
                            <Star key={s} className="w-3.5 h-3.5 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground italic">
                        "{isExpanded ? client.review : `${client.review.substring(0, 75)}...`}"
                      </p>

                      {/* See More Toggle Button */}
                      <button
                        onClick={() => toggleExpand(index)}
                        className="text-[11px] font-semibold text-primary mt-2 hover:underline cursor-pointer block"
                      >
                        {isExpanded ? "Show Less" : "Read More"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Global;