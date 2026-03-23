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
            Read reviews,<br className="" />
            <span className="font-bold"> Join with Confidence</span>
          </h2>
        </div>

        {/* Bottom Split Layout */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-start">
          
          {/* Left Side: Quote & Title */}
          <div className="shrink-0 hidden sm:flex flex-col items-end text-left">
            {/* Using a stylized text quote here so you don't have to export another SVG! */}
            <div className="flex flex-col items-start">
              <span className="text-7xl md:text-8xl text-PrimaryCream opacity-80 font-extrabold h-12">
              “
            </span>
              <p className="text-xl md:text-2xl text-PrimaryCream font-medium mt-2 leading-snug">
                What our <br className="" />customers<br className="" /> are saying
              </p>
            </div>
          </div>

          {/* Right Side: The Review Cards Grid */}
          <div className="w-full overflow-x-auto flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            {reviews.map((review, index) => (
              <div 
                key={index}
                className="bg-white min-w-69.5 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-lg h-full"
              >
                <p className="text-sm md:text-base text-PrimaryGreen leading-5 font-medium mb-6">
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