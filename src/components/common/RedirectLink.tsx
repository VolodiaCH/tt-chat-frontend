import React from "react";
import { Link } from "react-router-dom";

interface RedirectLinkProps {
  text?: string;
  href: string;
  linkText: string;
}

const RedirectLink: React.FC<RedirectLinkProps> = ({
  text,
  linkText,
  href,
}) => {
  return (
    <p className="mt-4 text-center text-sm">
      {text ?? ""}
      <Link to={href} className="text-blue-600 hover:underline">
        {linkText}
      </Link>
    </p>
  );
};

export default RedirectLink;
