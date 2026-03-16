// We extract the steps into an array again to keep the JSX clean and easy to edit!
const steps = [
  {
    title: "Step 1: Explore",
    description: "Tell us what your parent loves (Gardening? Temples? Cafes?).",
  },
  {
    title: "Step 2: Book",
    description: "Schedule a Ranger via the app. You pay and track everything digitally.",
  },
  {
    title: "Step 3: Relax",
    description: "Your parent enjoys a tech-free day out. We handle the logistics.",
  },
];

export default function HowItWorksSection() {
    {/* Cream background to contrast with the dark green Features section above it */}
  return (
    <section id="how-it-works" className="w-full bg-PrimaryCream px-4 py-16 md:py-24">
      
      {/* max-w-3xl keeps the stacked cards from becoming absurdly wide on big monitors */}
      <div className="max-w-3xl mx-auto flex flex-col gap-10 md:gap-16">
        
        {/* Section Heading */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-PrimaryGreen leading-tight">
            You handle the booking.<br />
            They handle the fun.
          </h2>
        </div>

        {/* Steps Container */}
        <div className="flex flex-col gap-4 md:gap-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-center"
            >
              <h3 className="text-lg md:text-xl font-bold text-PrimaryGreen mb-2 md:mb-3">
                {step.title}
              </h3>
              <p className="text-base md:text-lg text-PrimaryGreen/80 font-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}