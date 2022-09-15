import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const repo = () => {
  const router = useRouter();
  const { id }: any = router.query;
  const repo: string = id && id.length == 2 ? `${id[0]}/${id[1]}` : id;

  const [contents, setContents] = useState([]);
  useEffect(() => {
    if (repo && repo.length > 0) {
      fetch(`https://api.github.com/repos/${repo}/contents/`)
        .then((res) => res.json())
        .then((res) => {
          setContents(res ? res : []);
        });
    }
  }, [repo]);

  return (
    <div>
      {contents && contents.map((content: any) => <h1>{content.name}</h1>)}
    </div>
  );
};

export default repo;
