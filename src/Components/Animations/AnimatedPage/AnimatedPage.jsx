import { motion } from "framer-motion";

const AnimationPage = ({ children }) => {
	const animate = {
		show: {
			opacity: [0, 1],
			y: [60, 0],
			height: ["70vh", "20vh"],
		},
		hide: { opacity: [1, 0], y: [0, window.innerHeight] },
		transition: { duration: 1, ease: "easeInOut" },
	};

	return (
		<motion.div
			variants={animate}
			animate="show"
			exit="hide"
			transition={animate.transition}
		>
			{children}
		</motion.div>
	);
};

export default AnimationPage;
