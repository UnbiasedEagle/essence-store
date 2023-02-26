import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { useRandomCategoriesQuery } from '../../store/services/categoryService';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';

const Slider = () => {
  const { data, isFetching } = useRandomCategoriesQuery();

  return isFetching ? (
    <div className='flex items-center justify-center custom-container h-[70vh]'>
      <Spinner />
    </div>
  ) : (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className='mySwiper'
    >
      {data?.categories.length > 0 &&
        data.categories.map((category, index) => {
          return (
            <SwiperSlide key={category._id} className='relative slide'>
              <div className={`slide-img`}>
                <img
                  src={`./images/slider/${index + 1}.jpg`}
                  className='absolute inset-0'
                  alt='slider'
                />
              </div>
              <div className='absolute inset-0 w-full h-full bg-black/50'>
                <div className='custom-container h-[70vh] flex flex-col items-center justify-center'>
                  <h1 className='text-xl font-medium text-white capitalize'>
                    {category.name}
                  </h1>
                  <div className='mt-10'>
                    <Link
                      to={`/category-products/${category.name}`}
                      className='text-sm btn btn-indigo'
                    >
                      browse collection
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default Slider;
