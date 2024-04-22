import { useState } from "react";

import { Container } from "../../layouts";
import { Button, Input, Login, Register } from "../../components";
import eLearningVector from "../../assets/elearning-vector.png";

const Home = () => {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  return (
    <Container>
      {/* Header */}
      <header>
        <nav className="flex justify-between items-center py-3">
          <h1 className="text-2xl font-semibold">ePathshala</h1>
          <ul className="flex gap-3">
            <li>
              <Button onClick={() => setLogin(true)}>Login</Button>
            </li>
            <li>
              <Button onClick={() => setRegister(true)} btnType="outline">
                Start for free
              </Button>
            </li>
          </ul>
        </nav>
        <hr />
      </header>

      {/* Hero section with illustration and newsletter form */}
      <section className="grid grid-cols-2 p-10">
        <div className="p-10">
          <img src={eLearningVector} alt="eLearning illustration image" />
        </div>
        <div className="flex flex-col gap-5 self-center p-3">
          <h2 className="text-5xl font-semibold">
            Learn anything and everything, everywhere
          </h2>
          <p className="text-sm font-semibold">
            Empowering{" "}
            <span className="text-blue-400">Personalized and Adaptive</span>{" "}
            Teaching for better learning
          </p>
          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <Input
                type="email"
                placeholder="Enter your email address"
                required
              />
              <p>Get awesome offers and latest news!</p>
            </div>
            <Button>Subscribe to newsletter</Button>
          </form>
        </div>
      </section>

      {/* Footer section with all the links */}
      <footer>
        <hr />
        <div className="flex justify-between items-center py-10">
          <p>&copy; ePathshala Pvt Ltd</p>
          <p>
            Developed by{" "}
            <a
              className="underline hover:no-underline"
              href="https://github.com/SobujRoySunday"
              target="_blank"
            >
              Sorbopriyo Roy
            </a>
          </p>
        </div>
      </footer>

      {/* Login and Signup Boxes[conditionally rendered] */}
      {login ? <Login setLogin={setLogin} setRegister={setRegister} /> : null}
      {register ? (
        <Register setRegister={setRegister} setLogin={setLogin} />
      ) : null}
    </Container>
  );
};

export default Home;
