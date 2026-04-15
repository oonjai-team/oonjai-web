import Image from "next/image";

export default function ProblemSection() {
  return (
    <section id="problem" className="w-full bg-PrimaryGreen px-4 py-16 md:py-24">
      {/* Outer wrapper: Dark green background, full width, padding on top/bottom */}
      
      <div className="max-w-5xl mx-auto bg-PrimaryCream rounded-[2rem] p-8 md:p-8 flex flex-col md:flex-row items-center gap-8 md:gap-16 shadow-xl">
        {/* Inner Card: Cream background, rounded corners, flexbox layout */}
        
        <div className="w-[345px] h-[345px] sm:flex hidden relative justify-center">
          {/* Left Side (Desktop) / Top (Mobile): The Illustration */}
          <Image
            src="/images/problem-illustration.png"
            alt="Busy professional working while senior sits alone"
            fill={true}
            className="object-contain"
          />
        </div>

        <div className="w-full flex flex-col justify-center items-start md:text-left">
          {/* Right Side (Desktop) / Bottom (Mobile): The Text Content */}
          <h2 className="text-4xl grow w-full sm:text-[56px] sm:text-right font-medium text-PrimaryGreen leading-tight mb-4 md:mb-6">
            It&apos;s hard to <br className="sm:hidden block" /> watch <br className="hidden sm:block" />
            their <br className="sm:hidden block" /> world get <span className="font-thin">smaller.</span>
          </h2>
          
          <p className="text-base grow w-full sm:text-right md:text-lg text-PrimaryGreen/80 leading-relaxe mx-auto md:mx-0">
            You worry when they spend all day watching TV. You want to take them
            out, but work and responsibilities make it impossible. You shouldn&apos;t have to
            choose between their happiness and your career.
          </p>
        </div>

      </div>
    </section>
  );
}