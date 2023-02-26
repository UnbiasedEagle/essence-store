const ImagesPreview = ({ url, heading }) => {
  return (
    <div>
      <h3 className='right-heading'>{heading}</h3>
      {url && (
        <div className='relative w-full mt-3 overflow-hidden rounded-md h-60'>
          <img
            src={url}
            alt='preview'
            className='absolute inset-0 object-cover w-full h-full'
          />
        </div>
      )}
    </div>
  );
};

export default ImagesPreview;
