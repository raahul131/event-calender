import { subDays } from "date-fns";
import EventCalender from "./components/EventCalender";

const App = () => {
  return (
    <div>
      <EventCalender
        events={[
          { date: subDays(new Date(), 6), title: "Post video" },
          { date: subDays(new Date(), 1), title: "Edit video" },
          { date: subDays(new Date(), 3), title: "Code" },
        ]}
      />
    </div>
  );
};

export default App;
