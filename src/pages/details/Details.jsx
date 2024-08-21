import { useParams } from 'react-router-dom';
import DetailsBanner from './detailsBanner/DetailsBanner';
import useFetch from '../../hooks/useFetch';
import Cast from './cast/Cast';
import Videos from './videos/Videos';
import Similar from './carousel/Similar';
{/* Recommendations Not Working from API */}
import Recommendation from './carousel/Recommendation';

const Details = () => {
  const {mediaType, id} = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading:creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);

  return (
    <div className='detailsPage'>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading} />
      <Videos data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id}/>
       {/* Recommendations Not Working from API */}
      {/* <Recommendation mediaType={mediaType} id={id}/> */}
    </div>
  )
}

export default Details
