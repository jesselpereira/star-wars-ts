/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Loader from '../Loader';
import Table from '../Table';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

async function fetchPersons(page = 1) {
  const { data } = await axios.get(
    'https://swapi.dev/api/people/?page=' + page,
  );
  return data;
}

function Home() {
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

  return status === 'loading' || error ? (
    <Loader />
  ) : (
    <TableComponent
      data={data}
      page={page}
      setPage={setPage}
      isPreviousData={isPreviousData}
    />
  );
}

const TableComponent = (props: {
  data: any;
  page: number;
  setPage: any;
  isPreviousData: boolean;
}) => (
  <div className="Table">
    <div className="Table-body">
      <Table data={props.data} />
    </div>
    <div className="Table-footer">
      <button
        className="lg-button"
        onClick={() => props.setPage((old: number) => Math.max(old - 1, 1))}
        disabled={props.page === 1}
      >
        Página anterior
      </button>{' '}
      <button
        className="lg-button"
        onClick={() => {
          props.setPage((old: number) => (props.data?.next ? old + 1 : old));
        }}
        disabled={props.isPreviousData || !props.data?.next}
      >
        Próxima página
      </button>
      <br />
      <br />
      <h4>Página {props.page}</h4>
    </div>
  </div>
);

export default Home;
