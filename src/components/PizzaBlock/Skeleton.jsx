import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
	className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
 
  >
    <circle cx="134" cy="136" r="125" /> 
    <rect x="-4" y="278" rx="10" ry="10" width="280" height="24" /> 
    <rect x="-2" y="319" rx="10" ry="10" width="280" height="88" /> 
    <rect x="5" y="427" rx="10" ry="10" width="95" height="30" /> 
    <rect x="125" y="427" rx="24" ry="24" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton
