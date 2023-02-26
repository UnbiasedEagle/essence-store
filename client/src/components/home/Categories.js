import { useFetchAllCategoriesQuery } from '../../store/services/categoryService';
import { Link } from 'react-router-dom';
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Skeleton from './skeleton/Skeleton';
import Thumbnail from './skeleton/Thumbnail';

let i = 1;

const Categories = () => {
  const { data, isFetching } = useFetchAllCategoriesQuery();
  return isFetching ? (
    <div className='flex flex-wrap mb-10 -mx-4'>
      {[1, 2, 3, 4, 5, 6].map((item) => {
        return (
          <div
            key={item}
            className='w-6/12 p-4 sm:w-4/12 md:w-3/12 lg:w-[20%] xl:w-2/12'
          >
            <Skeleton>
              <Thumbnail height='150px' />
            </Skeleton>
          </div>
        );
      })}
    </div>
  ) : (
    data?.categories.length > 0 && (
      <Swiper
        modules={[Virtual]}
        spaceBetween={20}
        slidesPerView={3}
        virtual
        className='w-full h-[150px] mb-10'
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1080: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 6,
          },
        }}
      >
        {data.categories.map((category, index) => {
          if (i >= 5) {
            i = 1;
          } else {
            i++;
          }
          return (
            <SwiperSlide
              className='relative w-full overflow-hidden rounded-lg'
              key={index}
              virtualIndex={index}
            >
              <div className='w-full h-[150px] rounded-lg overflow-hidden'>
                <img
                  src={`./images/slider/${i}.jpg`}
                  className='object-cover w-full h-full'
                  alt=''
                />
              </div>
              <div className='absolute inset-0 flex items-center justify-center w-full h-full p-4 bg-black/50'>
                <Link
                  to={`/category-products/${category.name}`}
                  className='text-base font-medium text-white capitalize'
                >
                  {category.name}
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    )
  );
};

export default Categories;
