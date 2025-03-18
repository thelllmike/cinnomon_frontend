import { motion } from "framer-motion";

const Header = () => {
    return (
        <motion.div
            className="flex justify-between items-center mb-6"
            initial={{ opacity: 0, y: -20 }} // Start from above the screen and hidden
            animate={{ opacity: 1, y: 0 }} // Fade in and slide to normal position
            transition={{ duration: 0.5 }} // 0.5 second animation duration
        >
            <div>
                <div className="flex items-center w-70">
                    {/* <img src="./cinna-logo.png" alt="" /> */}
                </div>
            </div>
        </motion.div>
    );
};

export default Header;
