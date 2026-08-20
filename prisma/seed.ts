import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function imgs(label: string): string {
  const encoded = encodeURIComponent(label);
  return JSON.stringify([
    `https://placehold.co/800x600/1A1A1A/D4AF37?text=${encoded}+Front`,
    `https://placehold.co/800x600/1A1A1A/D4AF37?text=${encoded}+Side`,
    `https://placehold.co/800x600/1A1A1A/D4AF37?text=${encoded}+Interior`,
    `https://placehold.co/800x600/1A1A1A/D4AF37?text=${encoded}+Rear`,
  ]);
}

async function main() {
  // This seed wipes every vehicle and admin, then inserts demo listings.
  // That is fine for a local dev.db and catastrophic against the live
  // database, so refuse to run unless the target is explicitly local.
  const url = process.env.DATABASE_URL || "";
  const isLocal = url.includes("localhost") || url.includes("127.0.0.1") || url.startsWith("file:");

  if (!isLocal) {
    console.error(
      "Refusing to seed: DATABASE_URL does not look like a local database.\n" +
        "This script deletes all vehicles and admins before inserting demo data.\n\n" +
        "To create an admin account on a real database, use:\n" +
        '  ADMIN_PASSWORD="..." npm run db:admin'
    );
    process.exit(1);
  }

  await prisma.vehicle.deleteMany();
  await prisma.admin.deleteMany();

  const hashedPassword = await bcrypt.hash("EliteMotors2024!", 12);
  await prisma.admin.create({
    data: {
      username: "admin",
      password: hashedPassword,
    },
  });
  console.log("Admin user created");

  const vehicles = [
    // Sedan (2)
    {
      title: "2024 Mercedes-Benz S 500",
      brand: "Mercedes-Benz",
      model: "S 500",
      year: 2024,
      price: 42000,
      mileage: 1200,
      condition: "New",
      category: "Sedan",
      fuelType: "Petrol",
      transmission: "Automatic",
      engineSize: "3.0L I6 Turbo",
      horsepower: 449,
      exteriorColor: "Obsidian Black",
      interiorColor: "Macchiato Beige",
      description:
        "The pinnacle of luxury sedans. This 2024 Mercedes-Benz S 500 comes fully loaded with the Executive Rear Seat Package, Burmester 4D surround sound, and MBUX augmented reality navigation. Perfect for Kuwait's discerning drivers who demand nothing but the best.",
      features:
        "Executive Rear Seat Package,Burmester 4D Sound,MBUX AR Navigation,Panoramic Sunroof,360 Camera,Heated & Ventilated Seats,Air Suspension,Night Vision Assist",
      images: imgs("Mercedes+S500"),
      isFeatured: true,
    },
    {
      title: "2023 BMW 740i xDrive",
      brand: "BMW",
      model: "740i xDrive",
      year: 2023,
      price: 35500,
      mileage: 8500,
      condition: "Used",
      category: "Sedan",
      fuelType: "Petrol",
      transmission: "Automatic",
      engineSize: "3.0L I6 Turbo",
      horsepower: 380,
      exteriorColor: "Mineral White",
      interiorColor: "Cognac Leather",
      description:
        "A stunning BMW 7 Series that redefines executive luxury. Features the Theatre Screen, crystal controls, and BMW's latest iDrive system. Low mileage and impeccably maintained.",
      features:
        "Theatre Screen,Crystal Gear Selector,Bowers & Wilkins Sound,Soft-Close Doors,Gesture Control,Parking Assistant Plus,Executive Lounge Seating,Sky Lounge Panoramic Roof",
      images: imgs("BMW+740i"),
      isFeatured: false,
    },
    // Pickup (2)
    {
      title: "2024 Ford F-150 Raptor R",
      brand: "Ford",
      model: "F-150 Raptor R",
      year: 2024,
      price: 32000,
      mileage: 3200,
      condition: "New",
      category: "Pickup",
      fuelType: "Petrol",
      transmission: "Automatic",
      engineSize: "5.2L V8 Supercharged",
      horsepower: 720,
      exteriorColor: "Code Orange",
      interiorColor: "Black Onyx",
      description:
        "The ultimate desert machine for Kuwait. The Raptor R packs a supercharged 5.2L V8 producing 720 horsepower, making it the most powerful production pickup truck ever. FOX Live Valve shocks and 37-inch tires handle any terrain.",
      features:
        "FOX Live Valve Shocks,37-inch BFGoodrich Tires,Beadlock Wheels,Trail Control,360 Camera,B&O Sound System,Torsen Front Differential,Recaro Sport Seats",
      images: imgs("Ford+Raptor+R"),
      isFeatured: true,
    },
    {
      title: "2023 Toyota Hilux GR Sport",
      brand: "Toyota",
      model: "Hilux GR Sport",
      year: 2023,
      price: 14500,
      mileage: 22000,
      condition: "Used",
      category: "Pickup",
      fuelType: "Diesel",
      transmission: "Automatic",
      engineSize: "2.8L Turbo Diesel",
      horsepower: 204,
      exteriorColor: "Emotional Red",
      interiorColor: "Black",
      description:
        "Toyota's legendary reliability meets GR performance. This Hilux GR Sport features sport-tuned suspension, unique GR styling, and the proven 2.8L turbo diesel engine. A favorite among Kuwait's off-road enthusiasts.",
      features:
        "GR Sport Suspension,LED Headlights,Differential Lock,Bedliner,Apple CarPlay,Android Auto,Cruise Control,Push Start",
      images: imgs("Toyota+Hilux+GR"),
      isFeatured: false,
    },
    // SUV (2)
    {
      title: "2024 Range Rover Autobiography",
      brand: "Land Rover",
      model: "Range Rover Autobiography",
      year: 2024,
      price: 58000,
      mileage: 800,
      condition: "New",
      category: "SUV",
      fuelType: "Petrol",
      transmission: "Automatic",
      engineSize: "4.4L V8 Twin-Turbo",
      horsepower: 530,
      exteriorColor: "Santorini Black",
      interiorColor: "Pimento Red & Ebony",
      description:
        "The ultimate luxury SUV, perfectly suited for Kuwait's roads and lifestyle. The Autobiography trim offers unparalleled comfort with semi-aniline leather, executive class rear seats, and the Meridian Signature Sound System.",
      features:
        "Executive Class Rear Seats,Meridian Signature Sound,Pixel LED Headlights,Air Purification,Terrain Response 2,Wade Sensing,Head-Up Display,Refrigerator Compartment",
      images: imgs("Range+Rover"),
      isFeatured: true,
    },
    {
      title: "2023 Nissan Patrol Nismo",
      brand: "Nissan",
      model: "Patrol Nismo",
      year: 2023,
      price: 38000,
      mileage: 15000,
      condition: "Used",
      category: "SUV",
      fuelType: "Petrol",
      transmission: "Automatic",
      engineSize: "5.6L V8",
      horsepower: 428,
      exteriorColor: "Pearl White",
      interiorColor: "Black & Red Nismo",
      description:
        "The Nissan Patrol Nismo is an icon on Kuwait's roads. With Nismo-tuned suspension, exclusive body styling, and enhanced performance from the 5.6L V8, this is the SUV that commands attention everywhere it goes.",
      features:
        "Nismo Body Kit,Nismo Tuned Suspension,Bilstein Shocks,Recaro Seats,Bose Sound System,Around View Monitor,Hydraulic Body Motion Control,22-inch Nismo Wheels",
      images: imgs("Patrol+Nismo"),
      isFeatured: false,
    },
    // Hatchback (2)
    {
      title: "2024 Volkswagen Golf GTI",
      brand: "Volkswagen",
      model: "Golf GTI",
      year: 2024,
      price: 12500,
      mileage: 4000,
      condition: "New",
      category: "Hatchback",
      fuelType: "Petrol",
      transmission: "Automatic",
      engineSize: "2.0L Turbo",
      horsepower: 241,
      exteriorColor: "Kings Red",
      interiorColor: "Vienna Leather Black",
      description:
        "The hot hatch icon returns. The Golf GTI delivers thrilling performance with its 2.0L turbocharged engine and refined DSG transmission, all wrapped in a practical hatchback body. Perfect for Kuwait's city driving with weekend fun.",
      features:
        "Digital Cockpit Pro,Harman Kardon Sound,DCC Adaptive Dampers,LED Matrix Headlights,Wireless Apple CarPlay,Progressive Steering,XDS Differential,Drive Mode Select",
      images: imgs("Golf+GTI"),
      isFeatured: false,
    },
    {
      title: "2023 Mercedes-AMG A 45 S",
      brand: "Mercedes-Benz",
      model: "AMG A 45 S",
      year: 2023,
      price: 22000,
      mileage: 12000,
      condition: "Used",
      category: "Hatchback",
      fuelType: "Petrol",
      transmission: "Automatic",
      engineSize: "2.0L I4 Turbo",
      horsepower: 416,
      exteriorColor: "Denim Blue",
      interiorColor: "Black ARTICO",
      description:
        "The most powerful series-production four-cylinder engine in the world. This AMG A 45 S delivers supercar-rivaling performance in a compact package. AMG Performance 4MATIC+ ensures all that power reaches the road.",
      features:
        "AMG Performance 4MATIC+,AMG Ride Control,Drift Mode,AMG Track Pace,Burmester Sound,AMG Performance Exhaust,AMG Aerodynamics Package,MBUX with AMG Displays",
      images: imgs("AMG+A45+S"),
      isFeatured: false,
    },
    // Sport (2)
    {
      title: "2024 Porsche 911 Carrera GTS",
      brand: "Porsche",
      model: "911 Carrera GTS",
      year: 2024,
      price: 52000,
      mileage: 2100,
      condition: "New",
      category: "Sport",
      fuelType: "Petrol",
      transmission: "Automatic",
      engineSize: "3.0L Flat-6 Twin-Turbo",
      horsepower: 473,
      exteriorColor: "GT Silver Metallic",
      interiorColor: "Black Leather & Race-Tex",
      description:
        "The quintessential sports car elevated. The 911 Carrera GTS bridges the gap between the standard Carrera and GT3, offering thrilling performance with everyday usability. A true driver's car for Kuwait's automotive connoisseurs.",
      features:
        "Sport Chrono Package,PASM Sport Suspension,Sport Exhaust System,Bose Surround Sound,Sport Design Package,LED Matrix Headlights,Porsche Active Suspension Management,Lightweight Package",
      images: imgs("911+GTS"),
      isFeatured: true,
    },
    {
      title: "2022 Chevrolet Corvette C8 Stingray",
      brand: "Chevrolet",
      model: "Corvette C8 Stingray",
      year: 2022,
      price: 28000,
      mileage: 18000,
      condition: "Used",
      category: "Sport",
      fuelType: "Petrol",
      transmission: "Automatic",
      engineSize: "6.2L V8",
      horsepower: 495,
      exteriorColor: "Torch Red",
      interiorColor: "Adrenaline Red",
      description:
        "America's mid-engine supercar at an incredible value. This C8 Corvette delivers exotic car performance with the Z51 Performance Package. The naturally aspirated 6.2L V8 sings to 6500 RPM while the 8-speed DCT delivers lightning-fast shifts.",
      features:
        "Z51 Performance Package,Magnetic Ride Control,Performance Exhaust,Front Lift System,Head-Up Display,Bose 14-Speaker Sound,GT2 Bucket Seats,Performance Data Recorder",
      images: imgs("Corvette+C8"),
      isFeatured: false,
    },
    // Muscle (2)
    {
      title: "2024 Ford Mustang Dark Horse",
      brand: "Ford",
      model: "Mustang Dark Horse",
      year: 2024,
      price: 24000,
      mileage: 1800,
      condition: "New",
      category: "Muscle",
      fuelType: "Petrol",
      transmission: "Manual",
      engineSize: "5.0L Coyote V8",
      horsepower: 500,
      exteriorColor: "Shadow Black",
      interiorColor: "Ebony Leather",
      description:
        "The most track-capable Mustang ever built for the street. The Dark Horse features a hand-built 5.0L Coyote V8 with a unique cam profile, flat-plane crank-inspired exhaust note, and chassis tuned for maximum attack. A rare manual transmission makes this a collector's dream.",
      features:
        "MagneRide Damping,Tremec 6-Speed Manual,Brembo Brakes,Recaro Seats,12-inch Digital Cluster,B&O Sound System,Active Valve Exhaust,Track Apps",
      images: imgs("Mustang+Dark+Horse"),
      isFeatured: false,
    },
    {
      title: "2023 Dodge Challenger SRT Hellcat",
      brand: "Dodge",
      model: "Challenger SRT Hellcat",
      year: 2023,
      price: 27000,
      mileage: 9500,
      condition: "Used",
      category: "Muscle",
      fuelType: "Petrol",
      transmission: "Automatic",
      engineSize: "6.2L Supercharged HEMI V8",
      horsepower: 717,
      exteriorColor: "Sublime Green",
      interiorColor: "Black Nappa Leather",
      description:
        "Raw American muscle at its finest. The Hellcat's supercharged 6.2L HEMI V8 delivers a staggering 717 horsepower with a soundtrack that shakes the ground. As the last of the V8 muscle cars, this is an instant collectible.",
      features:
        "Supercharged HEMI V8,SRT Performance Pages,Launch Control,Adaptive Damping,Harman Kardon Sound,Power Sunroof,Widebody Kit,Brembo 6-Piston Brakes",
      images: imgs("Challenger+Hellcat"),
      isFeatured: true,
    },
    // Roadster (2)
    {
      title: "2024 Porsche 718 Boxster GTS 4.0",
      brand: "Porsche",
      model: "718 Boxster GTS 4.0",
      year: 2024,
      price: 34000,
      mileage: 3500,
      condition: "New",
      category: "Roadster",
      fuelType: "Petrol",
      transmission: "Manual",
      engineSize: "4.0L Flat-6",
      horsepower: 394,
      exteriorColor: "Racing Yellow",
      interiorColor: "Black & Racing Yellow",
      description:
        "The naturally aspirated flat-six lives on. The 718 Boxster GTS 4.0 is a pure driving experience — open-top, mid-engine, six-speed manual. Feel every bump, hear every rev, and enjoy Kuwait's winter evenings with the top down.",
      features:
        "Sport Chrono Package,PASM Sport Suspension,Sport Exhaust,GT Sport Steering Wheel,Porsche Torque Vectoring,LED Matrix Headlights,Bose Sound,14-Way Sport Seats Plus",
      images: imgs("Boxster+GTS"),
      isFeatured: false,
    },
    {
      title: "2022 BMW Z4 M40i",
      brand: "BMW",
      model: "Z4 M40i",
      year: 2022,
      price: 18500,
      mileage: 25000,
      condition: "Used",
      category: "Roadster",
      fuelType: "Petrol",
      transmission: "Automatic",
      engineSize: "3.0L I6 Turbo",
      horsepower: 382,
      exteriorColor: "Frozen Portimao Blue",
      interiorColor: "Cognac Vernasca Leather",
      description:
        "BMW's open-top sports car with the legendary B58 inline-six engine. The Z4 M40i offers explosive performance with the refinement expected from BMW. The soft-top opens in just 10 seconds, perfect for cruising Kuwait's corniche.",
      features:
        "M Sport Differential,Adaptive M Suspension,M Sport Brakes,Harman Kardon Sound,Wireless Charging,Head-Up Display,M Sport Seats,Live Cockpit Professional",
      images: imgs("BMW+Z4"),
      isFeatured: false,
    },
    // Coupe (2)
    {
      title: "2024 Lexus LC 500",
      brand: "Lexus",
      model: "LC 500",
      year: 2024,
      price: 36000,
      mileage: 5000,
      condition: "New",
      category: "Coupe",
      fuelType: "Petrol",
      transmission: "Automatic",
      engineSize: "5.0L V8",
      horsepower: 471,
      exteriorColor: "Flare Yellow",
      interiorColor: "Toasty Caramel",
      description:
        "A rolling work of art. The Lexus LC 500 combines a naturally aspirated 5.0L V8 with one of the most stunning designs in the automotive world. The 10-speed automatic delivers silky-smooth shifts while the Mark Levinson audio fills the cabin.",
      features:
        "Mark Levinson 13-Speaker Sound,Alcantara Headliner,Carbon Fiber Roof,Adaptive Variable Suspension,Limited-Slip Differential,21-inch Forged Wheels,Head-Up Display,Sport+ Mode",
      images: imgs("Lexus+LC500"),
      isFeatured: false,
    },
    {
      title: "2023 Audi RS 5 Sportback",
      brand: "Audi",
      model: "RS 5 Sportback",
      year: 2023,
      price: 26000,
      mileage: 14000,
      condition: "Certified Pre-Owned",
      category: "Coupe",
      fuelType: "Petrol",
      transmission: "Automatic",
      engineSize: "2.9L V6 Twin-Turbo",
      horsepower: 444,
      exteriorColor: "Nardo Grey",
      interiorColor: "Black Fine Nappa Leather",
      description:
        "Understated performance in its purest form. The RS 5 Sportback combines the practicality of a four-door body with blistering twin-turbo V6 performance. Quattro all-wheel drive ensures all 444 horses reach the tarmac. Audi Certified Pre-Owned warranty included.",
      features:
        "Quattro Sport Differential,RS Sport Suspension Plus,RS Sport Exhaust,Bang & Olufsen 3D Sound,Matrix LED Headlights,Virtual Cockpit Plus,RS Design Package,Carbon Optic Package",
      images: imgs("Audi+RS5"),
      isFeatured: false,
    },
    // Micro (2)
    {
      title: "2024 MINI Cooper S",
      brand: "MINI",
      model: "Cooper S",
      year: 2024,
      price: 12000,
      mileage: 2500,
      condition: "New",
      category: "Micro",
      fuelType: "Petrol",
      transmission: "Automatic",
      engineSize: "2.0L Turbo",
      horsepower: 204,
      exteriorColor: "Blazing Blue",
      interiorColor: "Carbon Black",
      description:
        "The new generation MINI Cooper S is more fun than ever. A completely redesigned interior with a circular OLED display, go-kart handling that puts a smile on your face, and enough punch to zip through Kuwait City traffic effortlessly.",
      features:
        "OLED Central Display,Multitone Roof,Driving Modes,LED Headlights,Wireless CarPlay,Parking Assistant,Harman Kardon Sound,Sport Seats",
      images: imgs("MINI+Cooper+S"),
      isFeatured: false,
    },
    {
      title: "2023 Fiat 500e La Prima",
      brand: "Fiat",
      model: "500e La Prima",
      year: 2023,
      price: 9800,
      mileage: 8000,
      condition: "Used",
      category: "Micro",
      fuelType: "Electric",
      transmission: "Automatic",
      engineSize: null,
      horsepower: 118,
      exteriorColor: "Celestial Blue",
      interiorColor: "Grey Natural Leather",
      description:
        "Italian charm goes electric. The Fiat 500e La Prima is the premium trim of Fiat's all-electric city car, featuring a retractable fabric roof, premium leather interior, and enough range for a full week of city driving in Kuwait.",
      features:
        "Retractable Fabric Roof,Level 2 Autonomous Driving,10.25-inch Touchscreen,JBL Premium Sound,360 Camera,Wireless Charging,One-Pedal Driving,Fast Charging",
      images: imgs("Fiat+500e"),
      isFeatured: false,
    },
    // Luxury (2)
    {
      title: "2024 Bentley Continental GT Speed",
      brand: "Bentley",
      model: "Continental GT Speed",
      year: 2024,
      price: 95000,
      mileage: 500,
      condition: "New",
      category: "Luxury",
      fuelType: "Petrol",
      transmission: "Automatic",
      engineSize: "6.0L W12 Twin-Turbo",
      horsepower: 659,
      exteriorColor: "British Racing Green",
      interiorColor: "Linen & Beluga",
      description:
        "The definitive grand tourer. The Continental GT Speed combines breathtaking W12 performance with Bentley's legendary handcraftsmanship. Every surface is hand-finished, every stitch placed with precision. This is motoring at its most luxurious.",
      features:
        "Naim for Bentley Sound,Rotating Display,Diamond Knurled Controls,Mulliner Driving Specification,Carbon Ceramic Brakes,Air Suspension,Night Vision,Mood Lighting",
      images: imgs("Bentley+GT"),
      isFeatured: true,
    },
    {
      title: "2023 Rolls-Royce Ghost Black Badge",
      brand: "Rolls-Royce",
      model: "Ghost Black Badge",
      year: 2023,
      price: 125000,
      mileage: 6000,
      condition: "Used",
      category: "Luxury",
      fuelType: "Petrol",
      transmission: "Automatic",
      engineSize: "6.75L V12 Twin-Turbo",
      horsepower: 592,
      exteriorColor: "Black Diamond",
      interiorColor: "Mandarin Orange & Black",
      description:
        "The dark side of luxury. The Ghost Black Badge is Rolls-Royce's most powerful Ghost ever, with darkened chrome, bespoke wheels, and a V12 engine tuned for those who want their luxury with an edge. A statement car for Kuwait's elite.",
      features:
        "Starlight Headliner,Bespoke Audio,Planar Suspension,Illuminated Fascia,Laser Headlights,Rear Theatre Configuration,Champagne Cooler,Self-Closing Doors",
      images: imgs("RR+Ghost"),
      isFeatured: false,
    },
    // MPV (2)
    {
      title: "2024 Toyota Land Cruiser 300 GR Sport",
      brand: "Toyota",
      model: "Land Cruiser 300 GR Sport",
      year: 2024,
      price: 32000,
      mileage: 4500,
      condition: "New",
      category: "MPV",
      fuelType: "Petrol",
      transmission: "Automatic",
      engineSize: "3.5L V6 Twin-Turbo",
      horsepower: 409,
      exteriorColor: "Precious White Pearl",
      interiorColor: "Black Semi-Aniline Leather",
      description:
        "Kuwait's most beloved vehicle in its most capable form. The Land Cruiser 300 GR Sport features sport-tuned suspension, unique GR styling, and the powerful 3.5L twin-turbo V6. Whether it's the desert or the highway, nothing stops a Land Cruiser.",
      features:
        "GR Sport Suspension,E-KDSS Electronic Stabilizer,Multi-Terrain Select,Crawl Control,14-inch Touchscreen,JBL Sound System,Fingerprint Start,Turn Assist",
      images: imgs("LC300+GR"),
      isFeatured: false,
    },
    {
      title: "2023 Chevrolet Tahoe RST",
      brand: "Chevrolet",
      model: "Tahoe RST",
      year: 2023,
      price: 22500,
      mileage: 28000,
      condition: "Used",
      category: "MPV",
      fuelType: "Petrol",
      transmission: "Automatic",
      engineSize: "6.2L V8",
      horsepower: 420,
      exteriorColor: "Black",
      interiorColor: "Jet Black Leather",
      description:
        "Full-size American luxury for the whole family. The Tahoe RST combines the powerful 6.2L V8 with a performance-oriented RST appearance package. Magnetic Ride Control ensures a smooth ride, while the massive interior fits seven comfortably.",
      features:
        "Magnetic Ride Control,10-Speed Automatic,Air Ride Adaptive Suspension,Bose Premium Sound,12.3-inch Infotainment,Rear Seat Entertainment,Power Fold Third Row,Max Trailering Package",
      images: imgs("Tahoe+RST"),
      isFeatured: false,
    },
    // Bikes (2)
    {
      title: "2024 Ducati Panigale V4 SP2",
      brand: "Ducati",
      model: "Panigale V4 SP2",
      year: 2024,
      price: 18500,
      mileage: 800,
      condition: "New",
      category: "Bikes",
      fuelType: "Petrol",
      transmission: "Manual",
      engineSize: "1103cc V4",
      horsepower: 216,
      exteriorColor: "Winter Test Livery",
      interiorColor: null,
      description:
        "The ultimate track-ready superbike for the road. The Panigale V4 SP2 features carbon fiber wheels, Brembo Stylema R calipers, and STM-EVO SBK dry clutch. Ohlins electronic suspension ensures razor-sharp handling on both track and street.",
      features:
        "Carbon Fiber Wheels,Ohlins Smart EC 2.0,Brembo Stylema R,STM-EVO Dry Clutch,GPS Module,Titanium Exhaust,Riding Modes,Wheelie Control",
      images: imgs("Ducati+V4+SP2"),
      isFeatured: false,
    },
    {
      title: "2023 BMW S 1000 RR M Package",
      brand: "BMW",
      model: "S 1000 RR M Package",
      year: 2023,
      price: 11500,
      mileage: 5200,
      condition: "Used",
      category: "Bikes",
      fuelType: "Petrol",
      transmission: "Manual",
      engineSize: "999cc I4",
      horsepower: 205,
      exteriorColor: "Light White & M Motorsport",
      interiorColor: null,
      description:
        "BMW's superbike warrior with the full M Package. Features M Competition carbon wheels, M GPS lap trigger, M endurance chain, and the adjustable swingarm pivot. A proven track weapon that's equally thrilling on Kuwait's coastal roads.",
      features:
        "M Carbon Wheels,M GPS Lap Trigger,M Endurance Chain,Dynamic Damping Control,Shift Assistant Pro,Cruise Control,Riding Modes Pro,M Sport Seat",
      images: imgs("BMW+S1000RR"),
      isFeatured: false,
    },
  ];

  for (const vehicle of vehicles) {
    await prisma.vehicle.create({ data: vehicle });
  }
  console.log(`Created ${vehicles.length} vehicles`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
