export default function ScrollAnimation(offy, ony, duration) {
	return ({
    offscreen: {
      y: {offy},
      opacity: 0,
    },
    onscreen: ({duration = {duration}} = {}) =>  ({
      y: {ony},
      opacity: 1,
      transition: {
      type: "spring",
      duration,
      }
    })
  })
}
