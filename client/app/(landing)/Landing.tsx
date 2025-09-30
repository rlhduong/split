import LandingHero from './LandingHero';

const Landing = () => {
  return (
    <div className="flex flex-col">
      <Subtitle />
      {/* <LandingHero /> */}
    </div>
  );
};

export default Landing;

const Subtitle = () => {
  return (
    <div className="flex flex-col w-full mt-10 gap-10">
      <div className="flex flex-col w-full items-center text-gray-400 font-semibold text-4xl">
        <h1>Elevate your</h1>
        <h1>trip planning experience</h1>
      </div>
      <h2 className="text-center text-gray-500 text-xl font-light">
        Plan with ease and confidence, knowing each trip is tailored to your
        preferences
      </h2>
    </div>
  );
};
