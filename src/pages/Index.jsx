const Index = () => {
  return (
    <div className="mt-10 w-11/12 md:w-10/12 mx-auto">
      <div className="text-center text-light-text dark:text-dark-text">
        <h1 className="text-2xl md:text-6xl font-bold mb-4">
          Welcome to{' '}
          <span className="dark:text-dark-primary text-light-primary font-extrabold select-none">
            Northwind
          </span>
          <span className="select-none dark:text-dark-secondary text-light-secondary font-extrabold">
            API
          </span>{' '}
          Playground
        </h1>
        <p className="text-medium md:text-lg italic w-2/3 mx-auto">
          "Explore the power of the Northwind API by making data requests,
          simulating real-world scenarios, and refining your data manipulation
          skills. Through efficient API calls and dynamic React components,
          create an engaging user interface to visualize and interact with the
          data."
        </p>
      </div>
    </div>
  );
};
export default Index;
