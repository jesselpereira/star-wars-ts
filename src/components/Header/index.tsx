import './styles.scss';

function Container(props: { className: string }) {
  return (
    <div className={props.className}>
      <div className="rnavbar-brand">
        <img
          alt="Star Wars - API Consumer"
          src="../../../logo128.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        Star Wars - API Consumer
      </div>
      <div className="rjustify-content-end rnavbar-collapse rcollapse">
        <div className="rnavbar-text">
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

const NewHeader = () => (
  <div className="rnavbar rnavbar-expand rnavbar-dark rbg-dark">
    <Container className="rcontainer" />
  </div>
);

export default NewHeader;
