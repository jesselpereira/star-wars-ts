import './styles.scss';

function Container(props: { className: string }) {
  return (
    <div className={props.className}>
      <div className="navbar-brand">
        <img
          alt="Star Wars - API Consumer"
          src="../../../logo128.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        Star Wars - API Consumer
      </div>
      <div className="justify-content-end navbar-collapse collapse">
        <div className="navbar-text">
          See on{' '}
          <a
            href="https://github.com/jesselpereira/star-wars-ts"
            target="_blank"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export const Header = () => (
  <div className="navbar navbar-expand navbar-dark rbg-dark">
    <Container className="container" />
  </div>
);

export default Header;
