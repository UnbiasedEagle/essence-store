import Animate from './Animate';

const Text = ({ mt }) => {
  return (
    <div
      style={{ marginTop: mt }}
      className={`relative w-full h-4 overflow-hidden rounded-md bg-indigo-50`}
    >
      <Animate />
    </div>
  );
};

export default Text;
