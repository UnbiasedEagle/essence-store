import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
const Quantity = ({ quantity, inc, dec, theme }) => {
  return (
    <div className='flex overflow-hidden last:border-r last:rounded-tr-lg last:rounded-br-lg first:rounded-tl-lg first:rounded-bl-lg'>
      <span
        className={`flex border p-4 border-r-0 cursor-pointer hover:bg-indigo-500 hover:text-white transition-all ${
          theme === 'indigo' && 'bg-indigo-600 text-white'
        }`}
        onClick={dec}
      >
        <AiOutlineMinus />
      </span>
      <span className='flex items-center justify-center flex-1 font-medium border border-r-0'>
        {quantity}
      </span>
      <span
        className={`flex border p-4 border-r-0 cursor-pointer hover:bg-indigo-500 hover:text-white transition-all ${
          theme === 'indigo' && 'bg-indigo-600 text-white'
        }`}
        onClick={inc}
      >
        <AiOutlinePlus />
      </span>
    </div>
  );
};

export default Quantity;
