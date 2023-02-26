import { Link, useParams } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import Nav from '../../components/home/Nav';
import { useGetProductQuery } from '../../store/services/productService';
import ProductLoader from '../../components/home/ProductLoader';
import DetailCard from '../../components/home/DetailCard';

const Product = () => {
  const { id } = useParams();

  const { data, isFetching } = useGetProductQuery(id);

  return (
    <>
      <Nav />
      <div className='mt-24 custom-container'>
        {isFetching ? (
          <ProductLoader />
        ) : (
          <>
            <ul className='flex items-center'>
              <li className='text-gray-600 capitalize'>
                <Link to='/'>home</Link>
              </li>
              <FiChevronRight className='block mx-2' />
              <li className='text-gray-600 capitalize'>
                <Link to={`/category-products/${data?.category}`}>
                  {data?.category}
                </Link>
              </li>
              <FiChevronRight className='block mx-2' />
              <li className='text-gray-600 capitalize'>
                <Link to={`/product/${data?._id}`}>{data?.title}</Link>
              </li>
            </ul>
            {data && <DetailCard product={data} />}
          </>
        )}
      </div>
    </>
  );
};

export default Product;
