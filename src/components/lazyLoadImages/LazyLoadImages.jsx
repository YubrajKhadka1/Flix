import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ImgLazyLoad = ({src, className}) => {
  return (
    <LazyLoadImage
        className={className || ""}
        src={src || ""}
        alt=''
        effect='blur' />
  )
}

export default ImgLazyLoad