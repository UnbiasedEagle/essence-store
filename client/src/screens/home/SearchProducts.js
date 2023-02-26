import { useParams } from 'react-router-dom';
import Header from '../../components/home/Header';
import Nav from '../../components/home/Nav';
import ProductCard from '../../components/home/ProductCard';
import Pagination from '../../components/Pagination';
import ProductSkeleton from '../../components/home/ProductSkeleton';
import Alert from '../../components/Alert';
import { MdErrorOutline } from 'react-icons/md';
import { useSearchProductsQuery } from '../../store/services/homeProductsService';

const SearchProducts = () => {
  const { keyword, page = 1 } = useParams();
  const { data, isFetching } = useSearchProductsQuery({
    keyword,
    page: parseInt(page),
  });

  return (
    <>
      <Nav />
      <div className='mt-[70px]'>
        <Header>#{keyword}</Header>
      </div>
      <div className='my-10 custom-container'>
        {isFetching ? (
          <ProductSkeleton />
        ) : data.count > 0 ? (
          <>
            <p className='text-base font-medium text-gray-700'>
              {data.count} product{data.count > 1 ? 's' : ''} found for #
              {keyword} keyword
            </p>
            <div className='flex flex-wrap -mx-5'>
              {data.products.map((product) => {
                return <ProductCard prod={product} key={product._id} />;
              })}
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path={`category-products/${keyword}`}
              theme='light'
            />
          </>
        ) : (
          <Alert className='text-red-700 bg-red-100 border-red-700'>
            <MdErrorOutline className='mr-1' />{' '}
            <span className='text-base'>
              No products found for #{keyword} keyword
            </span>
          </Alert>
        )}
      </div>
    </>
  );
};

export default SearchProducts;
