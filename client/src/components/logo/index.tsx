import { Link } from "react-router-dom";

const Logo = (props: { url?: string }) => {
  const { url = "/" } = props;
  return (
    <div className="flex items-center justify-center sm:justify-start">
      <Link to={url}>
        <h1>Team Project Management App</h1>
      </Link>
    </div>
  );
};

export default Logo;
