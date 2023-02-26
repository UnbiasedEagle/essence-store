import { useParams } from 'react-router-dom';
import { useGetProductsFromCategoryQuery } from '../../store/services/homeProductsService';
import Header from '../../components/home/Header';
import Nav from '../../components/home/Nav';
import Skeleton from '../../components/home/skeleton/Skeleton';
import Text from '../../components/home/skeleton/Text';
import Thumbnail from '../../components/home/skeleton/Thumbnail';

import Alert from '../../components/Alert';
import { MdErrorOutline } from 'react-icons/md';
import ProductCard from '../../components/home/ProductCard';
import Pagination from '../../components/Pagination';

const CategoryProducts = () => {
  const { categoryName, page = 1 } = useParams();

  const { data, isFetching } = useGetProductsFromCategoryQuery({
    name: categoryName,
    page: Number(page),
  });

  return (
    <>
      <Nav />
      <div className='mt-[70px]'>
        <Header>#{categoryName}</Header>
      </div>
      <div className='my-10 custom-container'>
        {isFetching ? (
          <div className='flex flex-wrap mb-10 -mx-4'>
            {[1, 2, 3, 4].map((item) => {
              return (
                <div
                  key={item}
                  className='w-6/12 p-4 sm:w-4/12 md:w-3/12 lg:w-4/12 xl:w-3/12'
                >
                  <Skeleton>
                    <Thumbnail height='320px' />
                    <Text mt='10px' />
                    <Text mt='10px' />
                  </Skeleton>
                </div>
              );
            })}
          </div>
        ) : data.count > 0 ? (
          <>
            <p className='text-base font-medium text-gray-700'>
              {data.count} product{data.count > 1 ? 's' : ''} found in{' '}
              {categoryName} category
            </p>
            <div className='flex flex-wrap -mx-5'>
              {data.products.map((prod) => {
                return <ProductCard key={prod._id} prod={prod} />;
              })}
            </div>
            <Pagination
              theme='light'
              path={`/category-products/${categoryName}`}
              page={Number(page)}
              perPage={data.perPage}
              count={data.count}
            />
          </>
        ) : (
          <Alert className='text-red-700 bg-red-100 border-red-700'>
            <MdErrorOutline className='mr-1' />{' '}
            <span className='text-base'>
              No products found for {categoryName} category
            </span>
          </Alert>
        )}
      </div>
    </>
  );
};

export default CategoryProducts;
