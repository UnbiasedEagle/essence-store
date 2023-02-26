const SizeList = ({ sizes, onDelete }) => {
  return (
    <div>
      <h3 className='right-heading'>Sizes List</h3>
      {sizes.length > 0 && (
        <div className='flex flex-wrap -mx-2'>
          {sizes.map((size) => {
            return (
              <div
                onClick={() => onDelete(size)}
                key={size.name}
                className='size'
              >
                {size.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SizeList;
