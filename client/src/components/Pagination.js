import { Link } from 'react-router-dom';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';

const Pagination = ({ page, count, perPage, path, theme }) => {
  const pages = Math.ceil(count / perPage);
  let startPos = page;
  const diff = pages - page;

  if (diff <= 3) {
    startPos = pages - 3;
  }

  let endPos = startPos + 3;

  if (startPos <= 0) {
    startPos = 1;
  }

  const paginationLinks = () => {
    const allLinks = [];

    for (let i = startPos; i <= endPos; i++) {
      allLinks.push(
        <li className='pagination-li' key={i}>
          <Link
            className={`${
              theme === 'light' ? 'pagination-link-light' : 'pagination-link'
            } ${i === page ? 'bg-indigo-500 text-white' : ''}`}
            to={`${path}/${i}`}
          >
            {i}
          </Link>
        </li>
      );
    }

    return allLinks;
  };

  const next = () => {
    if (page < pages) {
      return (
        <li className='pagination-li'>
          <Link
            className={`${
              theme === 'light' ? 'pagination-link-light' : 'pagination-link'
            }`}
            to={`${path}/${page + 1}`}
          >
            <BsChevronDoubleRight className='text-xl' />
          </Link>
        </li>
      );
    }
  };

  const prev = () => {
    if (page > 1) {
      return (
        <li className='pagination-li'>
          <Link
            className={`${
              theme === 'light' ? 'pagination-link-light' : 'pagination-link'
            }`}
            to={`${path}/${page - 1}`}
          >
            <BsChevronDoubleLeft className='text-xl' />
          </Link>
        </li>
      );
    }
  };

  return count > perPage ? (
    <ul className='flex items-center mt-2'>
      {prev()}
      {paginationLinks()}
      {next()}
    </ul>
  ) : null;
};

export default Pagination;
