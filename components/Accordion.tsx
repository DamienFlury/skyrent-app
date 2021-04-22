import { motion, Variants } from "framer-motion";
import { PropsWithChildren } from "react";

type Props = {
  open: boolean;
};

const variants: Variants = {
  open: {
    height: "auto",
  },
  closed: {
    height: 0,
  },
};

const Accordion = ({ open, children }: PropsWithChildren<Props>) => (
  <motion.div
    variants={variants}
    initial="closed"
    animate={open ? "open" : "closed"}
    className="overflow-hidden"
  >
    {children}
  </motion.div>
);

export default Accordion;
