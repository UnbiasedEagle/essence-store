const Colors = ({ colors, onDelete }) => {
  return (
    <div>
      <h3 className='right-heading'>Colors List</h3>
      {colors.length > 0 && (
        <div className='flex flex-wrap -mx-2'>
          {colors.map(({ color, id }) => {
            return (
              <div
                onClick={() => onDelete(id)}
                key={id}
                style={{ background: color }}
                className='w-[30px] mx-2 mt-2 h-[30px] cursor-pointer rounded-full '
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Colors;
