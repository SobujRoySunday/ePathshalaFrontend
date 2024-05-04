// System imports
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Custom imports
import eLearningVector from "../../assets/elearning-vector.png";
import { Button, Input, Loader, Login, Register } from "../../components";
import { Container } from "../../layouts";
import { authService, utilsService } from "../../services";
import { login, logout } from "../../store/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // States to maintain login and register box's display
  const [loginBox, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  // state to maintain loading animation's display
  const [loading, setLoading] = useState(false);

  // state to hold the email for newsletter subsciption
  const [email, setEmail] = useState("");

  // Function to subscribe to newsletter
  const subscribe = (e) => {
    // preventing reloading of the page
    e.preventDefault();

    // starting the loading animation
    setLoading(true);

    // Subscribing using utilsService
    utilsService
      .subscribeToNewsLetter({ email })
      .then((response) => {
        // Showing toast alert depending on the response content
        if (response === null) {
          toast.error("Something went wrong while subscribing to newsletter");
        } else if (response === 409) {
          toast.error("You have already subscribed to our newsletter");
          // clear email input field
          setEmail("");
        } else if (response === 500) {
          toast.error("Server error occured while subscribing to newsletter");
        } else {
          toast.success("You're now subscribed to our newsletter");
          // clear email input field
          setEmail("");
        }
      })
      .finally(() => {
        // finally stopping the loading animation
        setLoading(false);
      });
  };

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((response) => {
        if (response) {
          dispatch(login(response));
          navigate(`/dashboard/${response.userRole.toLowerCase()}`);
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch, navigate]);

  return loading ? (
    <Loader />
  ) : (
    <Container>
      {/* Header/navigation */}
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

          {/* newsletter form */}
          <form className="flex flex-col gap-5" onSubmit={subscribe}>
            <div className="flex flex-col gap-1">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

      {/* Login and Signup and Loader Boxes[conditionally rendered] */}
      {loginBox ? (
        <Login setLogin={setLogin} setRegister={setRegister} />
      ) : null}
      {register ? (
        <Register setRegister={setRegister} setLogin={setLogin} />
      ) : null}
    </Container>
  );
};

export default Home;
