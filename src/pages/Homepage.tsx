import Header from "../components/Header";
import Graph from "../components/Graph";
import MoodForm from "../components/MoodForm";

const Homepage: React.FC = () => {
  return (
    <>
      <Header></Header>
      <Graph></Graph>
      <MoodForm></MoodForm>
    </>
  );
};

export default Homepage;
