import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      <Image
        src="/notfound.jpg"
        width={500}
        height={500}
        alt="404"
        className="rounded-md"
      />
      <h1 className="text-4xl font-bold">Page is Under Construction</h1>
      <p className="text-lg">Developer is busy feeding his cat!!!</p>
    </div>
  );
};

export default NotFound;
