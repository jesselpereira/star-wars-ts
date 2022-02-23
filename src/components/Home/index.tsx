import React from 'react';
import Error from '../Error';
import Loader from '../Loader';
import Table from '../Table';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

export default function Home() {
  return <Persons />;
}

async function fetchPersons(page = 1) {
  const { data } = await axios.get(
    'https://swapi.dev/api/people/?page=' + page,
  );
  return data;
}

function Persons() {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);

  const { status, data, error, isPreviousData } = useQuery(
    ['pages', page],
    () => fetchPersons(page),
    { keepPreviousData: true, staleTime: 5000 },
  );

  React.useEffect(() => {
    if (data?.next) {
      queryClient.prefetchQuery(['pages', page + 1], () =>
        fetchPersons(page + 1),
      );
    }
  }, [data, page, queryClient]);

  return status === 'loading' ? (
    <Loader />
  ) : status === 'error' ? (
    <Error error={`${error}`} />
  ) : (
    <>
      <div className="Table">
        <div className="Table-body">
          <Table data={data} />
        </div>
        <div className="Table-footer">
          <button
            className="lg-button"
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Página anterior
          </button>{' '}
          <button
            className="lg-button"
            onClick={() => {
              setPage((old) => (data?.next ? old + 1 : old));
            }}
            disabled={isPreviousData || !data?.next}
          >
            Próxima página
          </button>
          <br />
          <br />
          <h4>Página {page}</h4>
        </div>
      </div>
    </>
  );
}
