import './styles.css';

type ErrorProps = {
  error: string;
};

const Error = ({ error }: ErrorProps) => (
  <div className="Error">
    <h2>{error}</h2>
  </div>
);

export default Error;
