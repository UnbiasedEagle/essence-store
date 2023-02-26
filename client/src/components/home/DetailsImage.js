const DetailsImage = ({ image }) => {
  return (
    <div className='w-full p-1 sm:w-6/12'>
      <img
        src={`/images/${image}`}
        alt='image1'
        className='object-cover w-full h-[300px]'
      />
    </div>
  );
};

export default DetailsImage;
