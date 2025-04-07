import React from "react";
import RedirectLink from "../../common/RedirectLink";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-4xl font-bold mt-4">404 - Page Not Found</h1>
      <RedirectLink
        text="The page you are looking for doesn’t exist. "
        href="/"
        linkText="Go to the main page"
      />
    </div>
  );
};

export default NotFound;
