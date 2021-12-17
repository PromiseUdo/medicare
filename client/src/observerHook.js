import React from 'react'
 const OnScreenObserver =  (ref) => {
const [isInterceting, setIsInterceting] = React.useState(false);
const options = {
    threshold: 0.5
}

const observer = new IntersectionObserver(
    ([entry]) => setIsInterceting(entry.isIntersecting), options
)

React.useEffect(() => {
    observer.observe(ref.current)
    return () => {
        observer.disconnect()
    }
}, [])
return isInterceting

}
export default OnScreenObserver