import { useState, useEffect } from "react";
import "../index.css";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";

const Graph: React.FC = () => {
  const [moodArr, setMoodArr] = useState<Array<any>>([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await axios.get("http://localhost:3000/moods", {
          params: {
            user_id: userId
          }
        });
        JSON.parse(JSON.stringify(response.data));
        setMoodArr(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchMoods();
  }, []);

  function getMoodCounts(moodArr: Array<any>) {
    const happyCount = moodArr.filter((arr) => arr.mood === "1").length;
    const sadCount = moodArr.filter((arr) => arr.mood === "2").length;
    const angryCount = moodArr.filter((arr) => arr.mood === "3").length;
    const excitedCount = moodArr.filter((arr) => arr.mood === "4").length;
    const chillCount = moodArr.filter((arr) => arr.mood === "5").length;

    return [happyCount, sadCount, angryCount, excitedCount, chillCount];
  }

  const values = getMoodCounts(moodArr);

  const categories = ["Happy", "Sad", "Angry", "Excited", "Chill"];

  const colors: Record<string, string> = {
    Happy: "#FFB020",
    Sad: "#60A5FA",
    Angry: "#F87171",
    Excited: "#A78BFA",
    Chill: "#34D399",
  };

  const series = categories.map((label, i) => ({
    label,
    data: categories.map((_, idx) => (idx === i ? values[i] : 0)),
    color: colors[label],
  }));

  return (
    <div className="container">
      <h2 style={{ margin: "0 0 12px 0" }}>Your moods this month</h2>
      <BarChart
        xAxis={[{ data: categories }]}
        yAxis={[{ position: "none" }]}
        series={series}
        height={300}
      />
    </div>
  );
};

export default Graph;
