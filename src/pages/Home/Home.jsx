import { Link } from "react-router-dom";
import eLearningVectorImage from "../../assets/eLearningVector.png";
import { buttonVariants } from "@/components/ui/button";
import { PersonIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/ModeToggle";

const Home = () => {
  return (
    <>
      <div className="absolute top-2 right-1">
        <ModeToggle />
      </div>
      <div className="w-screen h-screen flex justify-center items-center gap-3">
        <div className="w-1/3">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            ePathshala
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Empowering Personalized and Adaptive Teaching for Holistic Student
            Learning Advancement
          </p>
          <div className="flex gap-4 mt-4">
            <Link to="register" className={buttonVariants({ variant: "" })}>
              <PersonIcon className="mr-2 h-4 w-4" />
              Create new account
            </Link>
            <Link to="login" className={buttonVariants({ variant: "outline" })}>
              Login
            </Link>
          </div>
        </div>
        <div className="w-1/4">
          <img alt="eLearning Vector Image" src={eLearningVectorImage} />
        </div>
      </div>
    </>
  );
};

export default Home;
