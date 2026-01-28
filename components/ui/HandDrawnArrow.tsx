import { motion, SVGMotionProps } from "framer-motion";

interface HandDrawnArrowProps extends SVGMotionProps<SVGSVGElement> {
    rotation?: number;
    color?: string;
    type?: "default" | "curved-down";
    width?: number | string;
    height?: number | string;
}

const HandDrawnArrow = ({
    rotation = 0,
    color = "currentColor",
    type = "default",
    width = 30,
    height = 30,
    className = "",
    ...props
}: HandDrawnArrowProps) => {

    const paths = {
        default: "M20,5 Q25,20 20,35 M12,28 L20,35 L28,28",
        "curved-down": "M10,10 Q50,10 80,60 M60,50 L80,60 L90,40"
    };

    const viewBoxes = {
        default: "0 0 40 40",
        "curved-down": "0 0 100 100"
    };

    return (
        <motion.svg
            width={width}
            height={height}
            viewBox={viewBoxes[type] || viewBoxes.default}
            style={{ rotate: rotation }}
            className={`pointer-events-none ${className}`}
            {...props}
        >
            <motion.path
                d={paths[type]}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            />
        </motion.svg>
    );
};

export default HandDrawnArrow;
