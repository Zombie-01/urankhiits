import React, {
	useEffect,
	useRef,
	useState,
} from "react";
import { motion, useInView, useScroll } from "framer-motion";
import Image from "next/image";

type ICardProps = {
    title: string;
	imgUrl: string;
    video?: boolean;
	isLast?: boolean;
};

export const Card = ({ title, imgUrl, video }: ICardProps) => {
		const verticalMargin = 10;
		const container = useRef(null)

		const [maxScrollY, setMaxSrollY] = useState(Infinity)
		const [dynamicStyles, setDynamicStyles] = useState({
			scale: 1,
			filter: 0,
		})

		const { scrollY } = useScroll({
			target: container
		})
		const isInView = useInView(container, {
			margin: `0px 0px -${100 - verticalMargin}% 0px`,
			once: true
		})

		scrollY.on("change", (scrollY) => {
			let animationValue = 1;
			if(scrollY  > maxScrollY){
				animationValue = Math.max(0, 1 - (scrollY - maxScrollY)/10000)
			}

			setDynamicStyles({
				scale: animationValue,
				filter: (1 - animationValue)*100,
			})
		})

		useEffect(() => {
			if(isInView)
				setMaxSrollY(scrollY.get())
		},[isInView])
		
		return (
			<motion.section 
				ref={container}
				style={{
					top:`${verticalMargin}vh`,
					height: `${100-2 * verticalMargin}vh`,
					scale: dynamicStyles.scale,
					filter: `blur(${dynamicStyles.filter}px)`
				}}
				transition={{ duration: 0.5, delay: 0.25}}

				className="sticky h-[80vh] w-[90vw] overflow-hidden rounded-xl bg-inherit transition">
					{/* Card content */}
					<div className="relative h-full" >
						{/* Image */}
							<Image
								src={imgUrl}
								alt={title}
								fill
								className="object-cover h-full w-full"
								sizes="90vw"
							/>
						
						{/* Footer */}
						<div className="absolute  -bottom-12 left-16 right-16  bg-opacity-75  px-8 flex justify-between items-center">
							<span id="badge" className="ml px-3 py-1 bg-neutral-500 rounded-2xl text-sm">2024</span>
							<h1 className={`${video ? "text-black" : "text-white"} font-caps text-[10rem] pb-16`}>{title} </h1>
							<span id="badge" className="px-3 py-1 bg-neutral-500 rounded-2xl text-sm">{video ? 'Video' : 'Photo' }</span>
						</div>
					</div>
			</motion.section>
		);
	}

export default Card;
