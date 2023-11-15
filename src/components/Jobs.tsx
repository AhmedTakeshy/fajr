"use client";
import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";

export default function Jobs() {
const small1 = "/imgs/pic1-small.jpg";

  return (
      <motion.section variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
          className='container flex flex-col items-start justify-center my-8' id='services'>
            <h1 className='my-6 text-4xl font-bold'>خدماتنا</h1>
          </motion.section>
  )
}
