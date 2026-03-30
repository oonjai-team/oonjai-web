import Image from "next/image";

// Defining our card data up here keeps the JSX clean!
const features = [
  {
    title: "100% Background Checked",
    icon: "/images/icon-shield.png", // Ensure you export this as a transparent PNG
    alt: "3D Green Shield Icon",
  },
  {
    title: "First Aid & CPR Certified",
    icon: "/images/icon-heart.png",  // Ensure you export this as a transparent PNG
    alt: "3D Orange Heart with Cross Icon",
  },
  {
    title: "Personality Matched",
    icon: "/images/icon-puzzle.png", // Ensure you export this as a transparent PNG
    alt: "3D Puzzle Pieces Icon",
  }
];

export default function FeaturesSection() {
    {/* Dark green background to contrast with the previous section */}
  return (
    <section id="features" className="w-full bg-PrimaryGreen px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto flex flex-col gap-10 md:gap-16">
        
        {/* Section Header */}
        <div className="text-left">
          <h2 className="text-4xl lg:text-5xl text-PrimaryCream leading-tight mb-4">
            More than a driver.<br />
            A trusted friend.
          </h2>
          {/* Using &apos; to prevent the linting error we just learned about! */}
          <p className="text-base md:text-lg text-PrimaryCream/80">
            We don&apos;t just pick them up.<br className="sm:hidden block" /> We engage, protect, and care.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-PrimaryCream rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-lg hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Icon Container */}
              <div className="relative w-40 h-40 mb-6">
                <Image 
                  src={feature.icon}
                  alt={feature.alt}
                  fill
                  className="object-contain drop-shadow-sm"
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>
              
              {/* Card Title */}
              <h3 className="text-xl text-PrimaryGreen leading-snug w-3/4">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}