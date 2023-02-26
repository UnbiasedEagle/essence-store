import Animate from './Animate';

const Thumbnail = ({ height }) => {
  return (
    <div
      style={{ height }}
      className={`w-full relative rounded-md bg-indigo-50 overflow-hidden`}
    >
      <Animate />
    </div>
  );
};

export default Thumbnail;
