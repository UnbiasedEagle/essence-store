import Circle from './skeleton/Circle';
import Skeleton from './skeleton/Skeleton';
import Text from './skeleton/Text';
import Thumbnail from './skeleton/Thumbnail';

const ProductLoader = () => {
  return (
    <Skeleton>
      <div className='flex flex-wrap'>
        <div className='order-2 w-full p-5 md:order-1 md:w-6/12'>
          <div className='flex flex-wrap -mx-1'>
            <div className='w-full p-1 sm:w-6/12'>
              <Thumbnail height='300px' />
            </div>
            <div className='w-full p-1 sm:w-6/12'>
              <Thumbnail height='300px' />
            </div>
          </div>
        </div>
        <div className='order-1 w-full p-5 md:order-2 md:w-6/12'>
          <Text />
          <Text mt='12px' />
          <div className='flex mt-3 -mx-2'>
            <div className='m-2'>
              <Circle />
            </div>
            <div className='m-2'>
              <Circle />
            </div>
            <div className='m-2'>
              <Circle />
            </div>
            <div className='m-2'>
              <Circle />
            </div>
          </div>
        </div>
      </div>
    </Skeleton>
  );
};

export default ProductLoader;
