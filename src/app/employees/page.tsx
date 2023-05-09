import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="emploee-root">
      <button>
        <Link href="/employees/get">Get All</Link>
      </button>
      <button>
        <Link href="/employees/get/{id}">Get By Id</Link>
      </button>
      <button>
        <Link href="/employees/post">Post</Link>
      </button>
      <button>
        <Link href="/employees/patch">Patch</Link>
      </button>
      <button>
        <Link href="/employees/delete">Delete</Link>
      </button>
    </div>
  );
};

export default page;
