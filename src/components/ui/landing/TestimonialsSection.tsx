// Array of reviews. I duplicated Ploy's review 3 times to match the mockup!
const reviews = [
  {
    text: "I used to feel so guilty working late. Now I know Mom is out having coffee with her 'Squad' safely. The photos make my day.",
    author: "Ploy",
    location: "Bangkok",
  },
  {
    text: "I used to feel so guilty working late. Now I know Mom is out having coffee with her 'Squad' safely. The photos make my day.",
    author: "Ploy",
    location: "Bangkok",
  },
  {
    text: "I used to feel so guilty working late. Now I know Mom is out having coffee with her 'Squad' safely. The photos make my day.",
    author: "Ploy",
    location: "Bangkok",
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full bg-PrimaryGreen px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto flex flex-col gap-12 md:gap-16">
        
        {/* Top Centered Heading */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-PrimaryCream font-light leading-tight">
            Read reviews,<br className="md:hidden" />
            <span className="font-bold"> Join with Confidence</span>
          </h2>
        </div>

        {/* Bottom Split Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Left Side: Quote & Title */}
          <div className="w-full lg:w-1/4 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Using a stylized text quote here so you don't have to export another SVG! */}
            <span className="text-7xl md:text-8xl text-PrimaryCream opacity-80 font-serif leading-none h-16 md:h-20">
              “
            </span>
            <p className="text-xl md:text-2xl text-PrimaryCream font-bold mt-2 leading-snug">
              What our customers<br className="hidden lg:block" /> are saying
            </p>
          </div>

          {/* Right Side: The Review Cards Grid */}
          <div className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {reviews.map((review, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-lg h-full"
              >
                <p className="text-sm md:text-base text-PrimaryGreen leading-relaxed font-medium mb-6">
                  {review.text}
                </p>
                <p className="text-sm font-bold text-PrimaryGreen mt-auto">
                  - {review.author}, {review.location}.
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}