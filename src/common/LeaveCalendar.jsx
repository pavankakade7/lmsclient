import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Calendar, CircleUser, Home, Users, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardLayout from "./DashboardLayout";
const localizer = momentLocalizer(moment);
const leaveRecords = [
  { start: new Date(2024, 4, 5), end: new Date(2024, 4, 5), title: "Vacation" },
  {
    start: new Date(2024, 4, 15),
    end: new Date(2024, 4, 15),
    title: "Sick leave",
  },
  {
    start: new Date(2024, 4, 20),
    end: new Date(2024, 4, 20),
    title: "Personal leave",
  },
];
const LeaveCalendar = () => {
  const [holidays, setHolidays] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(
          "https://holidays.abstractapi.com/v1/",
          {
            params: {
              api_key: "95cacefb584d4513a5f1d365ad0d5606",
              country: "IN",
              year: 2024,
            },
          }
        );
        const formattedHolidays = response.data.map((holiday) => ({
          start: new Date(holiday.date),
          end: new Date(holiday.date),
          title: holiday.name,
        }));
        setHolidays(formattedHolidays);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchHolidays();
  }, []);

  const allEvents = [...leaveRecords, ...holidays];

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <DashboardLayout>

          <div className="flex-1 p-4">
            <Card className="w-full h-full">
              <CardContent className="h-full">
                <BigCalendar
                  localizer={localizer}
                  events={allEvents}
                  startAccessor="start"
                  endAccessor="end"
                  defaultView="month"
                  views={["month", "week", "day"]}
                  style={{ height: "100%", width: "100%" }}
                  eventPropGetter={(event) => ({
                    style: {
                      backgroundColor: event.title.includes("leave")
                        ? "#f0ad4e" // Leave events
                        : "#5bc0de", // Holiday events
                    },
                  })}
                  onSelectEvent={(event) =>
                    console.log("Selected event:", event)
                  }
                  onNavigate={(date) => console.log("Navigated to:", date)}
                  formats={{
                    dayFormat: (date) => moment(date).format("D"),
                    monthHeaderFormat: (date) =>
                      moment(date).format("MMMM YYYY"),
                  }}
                />
              </CardContent>
            </Card>
          </div>
       

    </DashboardLayout>
  );
};

export default LeaveCalendar;
