const Spinner = ({ text = "در حال بارگذاری..." }) => {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-3">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
  
        <p className="text-gray-500">{text}</p>
      </div>
    );
  };
  
  export default Spinner;