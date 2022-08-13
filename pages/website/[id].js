import { useEffect, useContext } from 'react';
import { userContext } from '../../context/userContext';
import { useRouter } from 'next/router';
import Loading from '../../components/loading/Loading';
const WebsiteInfo = () => {
  const router = useRouter();
  const userCtx = useContext(userContext);
  const { setGetWebsiteData } = userCtx;
  const { id } = router.query;
  console.log('id', id);

  useEffect(() => {
    if (id) setGetWebsiteData(id);
  }, [id]);

  return <div>{!!id ? <h1>web Info</h1> : <Loading />}</div>;
};
export default WebsiteInfo;
