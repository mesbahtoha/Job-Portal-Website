import { motion } from "motion/react"
import team1 from '../../assets/theme/team1.jpg'
import team2 from '../../assets/theme/team2.jpg'

const Banner = () => {
    return (
        <div className="hero bg-base-200 min-h-96">
            <div className="hero-content flex-col lg:flex-row-reverse lg:ml-20">
                <div className="flex-1 hidden lg:block">
                    <motion.img
                    animate={{
                        y: [0, 80, 0],
                        transition: {duration: 10, repeat: Infinity}
                    }}
                    src={team1}
                    className="max-w-sm rounded-t-[40px] rounded-br-[40px] shadow-2xl border-s-8 border-b-8 border-blue-800"
                />
                    <motion.img
                    animate={{
                        x: [100, 150, 100],
                        transition: {duration: 10, repeat: Infinity}
                    }}
                    src={team2}
                    className="w-[310px] rounded-t-[40px] rounded-br-[40px] shadow-2xl border-s-8 border-b-8 border-blue-800"
                />
                </div>
                <div className="flex-1">
                    {/* <motion.h1
                        animate={{
                            rotate: 360,
                            x: 200,
                            y: 200,
                            // y: -200, (reverse)
                            transition: { duration: 3 }
                        }}
                        className="text-5xl font-bold">Latest Jobs For You!
                    </motion.h1> */}
                    <motion.h1
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { duration: 4 } }}
                        className="text-5xl font-bold">Remote <motion.span
                            animate={{
                                color: ['#ff5733', '#33ff33', '#8a33ff'],
                                transition: { duration: 2, repeat: Infinity }
                            }}
                        >Jobs</motion.span> For You!
                    </motion.h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-secondary font-bold">Hot Jobs 🔥</button>
                </div>
            </div>
        </div>
    )
}

export default Banner;