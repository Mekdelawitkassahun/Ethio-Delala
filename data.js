// ============================================================
//  ETHIO-DELALA — Property Data
// ============================================================
const PROPERTIES = [
  {
    id:1, title:"The Amber Penthouse", type:"apartment", mode:"sell",
    price:1250000, beds:4, baths:3, sqft:3200, yearBuilt:2019,
    address:"12 Skyline Blvd, New York, NY", lat:40.7580, lng:-73.9855,
    description:"A breathtaking penthouse with panoramic city views, bespoke walnut cabinetry, and a wraparound terrace.",
    image:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    badge:"For Sale",
    amenities:["Pool","Gym","Concierge","Parking","Terrace","Smart Home"],
    rooms:[
      { name:"Living Room",  img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=85",
        hotspots:[{x:28,y:52,label:"Fireplace Nook"},{x:68,y:38,label:"City View Window"},{x:50,y:72,label:"Walnut Bar"}] },
      { name:"Master Suite", img:"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=85",
        hotspots:[{x:35,y:45,label:"King Bed"},{x:70,y:60,label:"Walk-in Closet"}] },
      { name:"Kitchen",      img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85",
        hotspots:[{x:40,y:55,label:"Marble Island"},{x:65,y:40,label:"Wine Fridge"}] },
      { name:"Terrace",      img:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=85",
        hotspots:[{x:50,y:50,label:"Skyline View"},{x:30,y:65,label:"Outdoor Dining"}] }
    ],
    floorplan:"4BR + Study, Open Plan Kitchen, Wraparound Terrace, 3 Baths",
    videoSrc:"https://www.w3schools.com/html/mov_bbb.mp4",
    agent:{name:"Victoria Lane",phone:"+1 212 555 0101",img:"https://randomuser.me/api/portraits/women/44.jpg"}
  },
  {
    id:2, title:"Cedarwood Villa", type:"villa", mode:"sell",
    price:2800000, beds:6, baths:5, sqft:6800, yearBuilt:2015,
    address:"88 Hillcrest Lane, Beverly Hills, CA", lat:34.0736, lng:-118.4004,
    description:"A sprawling villa nestled in the hills, featuring a private pool, wine cellar, and hand-laid stone floors.",
    image:"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    badge:"For Sale",
    amenities:["Pool","Wine Cellar","Home Theater","Gym","3-Car Garage","Guest House"],
    rooms:[
      { name:"Grand Hall",  img:"https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400&q=85",
        hotspots:[{x:25,y:45,label:"Stone Fireplace"},{x:70,y:35,label:"Chandelier"}] },
      { name:"Pool Deck",   img:"https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1400&q=85",
        hotspots:[{x:50,y:55,label:"Infinity Pool"},{x:75,y:40,label:"Cabana"}] },
      { name:"Wine Cellar", img:"https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1400&q=85",
        hotspots:[{x:40,y:60,label:"Vintage Collection"},{x:65,y:45,label:"Tasting Table"}] },
      { name:"Master Wing", img:"https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1400&q=85",
        hotspots:[{x:35,y:50,label:"Ensuite Bath"},{x:68,y:38,label:"Dressing Room"}] }
    ],
    floorplan:"6BR, 5BA, Pool, Wine Cellar, 3-Car Garage, Guest House",
    videoSrc:"https://www.w3schools.com/html/mov_bbb.mp4",
    agent:{name:"Marcus Reid",phone:"+1 310 555 0202",img:"https://randomuser.me/api/portraits/men/32.jpg"}
  },
  {
    id:3, title:"The Ivory Loft", type:"apartment", mode:"rent",
    price:4500, beds:2, baths:2, sqft:1400, yearBuilt:2010,
    address:"5 Artisan Quarter, Chicago, IL", lat:41.8827, lng:-87.6233,
    description:"A converted warehouse loft with exposed brick, 14-ft ceilings, and designer finishes throughout.",
    image:"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    badge:"For Rent",
    amenities:["Rooftop Access","Bike Storage","Pet Friendly","Laundry","High Ceilings"],
    rooms:[
      { name:"Open Living",    img:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=85",
        hotspots:[{x:40,y:60,label:"Exposed Brick Wall"},{x:60,y:35,label:"Skylight"}] },
      { name:"Mezzanine",      img:"https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1400&q=85",
        hotspots:[{x:45,y:50,label:"Bedroom Loft"},{x:70,y:40,label:"City View"}] },
      { name:"Kitchen Island", img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85",
        hotspots:[{x:50,y:55,label:"Quartz Countertop"},{x:30,y:45,label:"Pendant Lights"}] }
    ],
    floorplan:"Open Plan, Mezzanine Bedroom, Rooftop Access, 2 Baths",
    videoSrc:"https://www.w3schools.com/html/mov_bbb.mp4",
    agent:{name:"Sofia Chen",phone:"+1 312 555 0303",img:"https://randomuser.me/api/portraits/women/68.jpg"}
  },
  {
    id:4, title:"Hazel Creek Cottage", type:"house", mode:"rent",
    price:2800, beds:3, baths:2, sqft:1800, yearBuilt:1998,
    address:"14 Willow Way, Austin, TX", lat:30.2672, lng:-97.7431,
    description:"A charming craftsman cottage with a wraparound porch, original hardwood floors, and a lush garden.",
    image:"https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    badge:"For Rent",
    amenities:["Garden","Porch","Hardwood Floors","Fireplace","Pet Friendly","Garage"],
    rooms:[
      { name:"Front Porch",  img:"https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=85",
        hotspots:[{x:50,y:55,label:"Swing Chair"},{x:30,y:45,label:"Garden View"}] },
      { name:"Living Room",  img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=85",
        hotspots:[{x:35,y:55,label:"Hardwood Floors"},{x:65,y:40,label:"Stone Fireplace"}] },
      { name:"Garden",       img:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1400&q=85",
        hotspots:[{x:45,y:60,label:"Herb Garden"},{x:70,y:45,label:"Oak Tree"}] }
    ],
    floorplan:"3BR, 2BA, Wraparound Porch, Garden, 1-Car Garage",
    videoSrc:"https://www.w3schools.com/html/mov_bbb.mp4",
    agent:{name:"James Holloway",phone:"+1 512 555 0404",img:"https://randomuser.me/api/portraits/men/55.jpg"}
  },
  {
    id:5, title:"Obsidian Tower Condo", type:"condo", mode:"sell",
    price:875000, beds:3, baths:2, sqft:2100, yearBuilt:2021,
    address:"200 Midtown Plaza, Miami, FL", lat:25.7617, lng:-80.1918,
    description:"A sleek high-rise condo with floor-to-ceiling glass, a private gym, and ocean views from every room.",
    image:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    badge:"For Sale",
    amenities:["Ocean View","Gym","Pool","Concierge","Valet","Smart Home"],
    rooms:[
      { name:"Living Area",    img:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400&q=85",
        hotspots:[{x:50,y:40,label:"Ocean View"},{x:30,y:65,label:"Smart TV Wall"}] },
      { name:"Ocean Balcony",  img:"https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1400&q=85",
        hotspots:[{x:50,y:50,label:"Atlantic View"},{x:70,y:60,label:"Outdoor Lounge"}] },
      { name:"Master Bath",    img:"https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1400&q=85",
        hotspots:[{x:40,y:55,label:"Rain Shower"},{x:65,y:40,label:"Soaking Tub"}] }
    ],
    floorplan:"3BR, 2BA, Balcony, Gym Access, Concierge, Valet Parking",
    videoSrc:"https://www.w3schools.com/html/mov_bbb.mp4",
    agent:{name:"Isabella Voss",phone:"+1 305 555 0505",img:"https://randomuser.me/api/portraits/women/22.jpg"}
  },
  {
    id:6, title:"Rosewood Manor", type:"house", mode:"sell",
    price:4500000, beds:8, baths:7, sqft:11000, yearBuilt:1932,
    address:"1 Estate Drive, Greenwich, CT", lat:41.0534, lng:-73.6284,
    description:"A grand colonial manor on 5 acres, featuring a ballroom, library, tennis court, and guest house.",
    image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    badge:"For Sale",
    amenities:["Ballroom","Library","Tennis Court","Guest House","Pool","Wine Cellar"],
    rooms:[
      { name:"Ballroom",     img:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400&q=85",
        hotspots:[{x:20,y:50,label:"Grand Staircase"},{x:50,y:70,label:"Crystal Chandelier"}] },
      { name:"Library",      img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=85",
        hotspots:[{x:75,y:40,label:"Fireplace"},{x:40,y:55,label:"First Editions"}] },
      { name:"Tennis Court", img:"https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1400&q=85",
        hotspots:[{x:50,y:50,label:"Clay Court"},{x:25,y:40,label:"Pavilion"}] },
      { name:"Guest House",  img:"https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=85",
        hotspots:[{x:45,y:55,label:"Private Entrance"},{x:70,y:40,label:"Garden View"}] }
    ],
    floorplan:"8BR, 7BA, Ballroom, Library, Tennis Court, Guest House, 5 Acres",
    videoSrc:"https://www.w3schools.com/html/mov_bbb.mp4",
    agent:{name:"Edward Ashworth",phone:"+1 203 555 0606",img:"https://randomuser.me/api/portraits/men/77.jpg"}
  },
  {
    id:7, title:"The Birch Studio", type:"apartment", mode:"rent",
    price:1800, beds:1, baths:1, sqft:650, yearBuilt:2016,
    address:"33 Maple Street, Portland, OR", lat:45.5051, lng:-122.6750,
    description:"A cozy studio with Scandinavian-inspired interiors, birch wood accents, and a private courtyard.",
    image:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    badge:"For Rent",
    amenities:["Courtyard","Bike Storage","Pet Friendly","Laundry","Natural Light"],
    rooms:[
      { name:"Studio",    img:"https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1400&q=85",
        hotspots:[{x:45,y:50,label:"Birch Shelving"},{x:70,y:60,label:"Reading Nook"}] },
      { name:"Courtyard", img:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1400&q=85",
        hotspots:[{x:50,y:55,label:"Private Garden"},{x:30,y:45,label:"Bistro Table"}] }
    ],
    floorplan:"Studio, 1BA, Private Courtyard, Bike Storage",
    videoSrc:"https://www.w3schools.com/html/mov_bbb.mp4",
    agent:{name:"Lily Park",phone:"+1 503 555 0707",img:"https://randomuser.me/api/portraits/women/33.jpg"}
  },
  {
    id:8, title:"Copper Ridge Estate", type:"house", mode:"sell",
    price:1650000, beds:5, baths:4, sqft:4500, yearBuilt:2018,
    address:"77 Ridge Road, Scottsdale, AZ", lat:33.4942, lng:-111.9261,
    description:"A desert contemporary home with copper accents, a resort-style pool, and mountain views.",
    image:"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    badge:"For Sale",
    amenities:["Pool","Mountain Views","3-Car Garage","Smart Home","Outdoor Kitchen","Spa"],
    rooms:[
      { name:"Great Room",   img:"https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400&q=85",
        hotspots:[{x:30,y:45,label:"Mountain View"},{x:65,y:55,label:"Copper Fireplace"}] },
      { name:"Pool Terrace", img:"https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1400&q=85",
        hotspots:[{x:50,y:55,label:"Resort Pool"},{x:75,y:40,label:"Spa"}] },
      { name:"Chef Kitchen", img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85",
        hotspots:[{x:40,y:50,label:"Wolf Range"},{x:65,y:40,label:"Copper Hood"}] }
    ],
    floorplan:"5BR, 4BA, Pool, Spa, 3-Car Garage, Outdoor Kitchen",
    videoSrc:"https://www.w3schools.com/html/mov_bbb.mp4",
    agent:{name:"Nathan Cruz",phone:"+1 480 555 0808",img:"https://randomuser.me/api/portraits/men/41.jpg"}
  }
];
