const Container = ({ children }) => {
    return (
      <div className="max-w-[1800px] mx-auto px-6 md:px-8 lg:px-12">
        {children}
      </div>
    );
  };
  
  export default Container;