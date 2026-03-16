import Image from "next/image";

export default function ProblemSection() {
  return (
    <section id="problem" className="w-full bg-PrimaryGreen px-4 py-16 md:py-24">
      {/* Outer wrapper: Dark green background, full width, padding on top/bottom */}
      
      <div className="max-w-5xl mx-auto bg-PrimaryCream rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-16 shadow-xl">
        {/* Inner Card: Cream background, rounded corners, flexbox layout */}
        
        <div className="w-full md:w-1/2 flex justify-center">
          {/* Left Side (Desktop) / Top (Mobile): The Illustration */}
          <div className="relative w-full max-w-sm aspect-square">
            <Image 
              src="/images/problem-illustration.png" 
              alt="Busy professional working while senior sits alone" 
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
          {/* Right Side (Desktop) / Bottom (Mobile): The Text Content */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-PrimaryGreen leading-tight mb-4 md:mb-6">
            It&apos;s hard to watch <br className="hidden md:block" />
            their world get <span className="font-light">smaller.</span>
          </h2>
          
          <p className="text-base md:text-lg text-PrimaryGreen/80 leading-relaxed font-medium max-w-lg mx-auto md:mx-0">
            You worry when they spend all day watching TV. You want to take them
            out, but work and responsibilities make it impossible. You shouldn&apos;t have to
            choose between their happiness and your career.
          </p>
        </div>

      </div>
    </section>
  );
}