import React,{useState} from 'react'
import { Badge, Calendar, Card, Alert, Input, Button, DatePicker, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';

const defaultEvents = {
  "2026-02-05": ["Kashmir Solidarity Day 🇵🇰"],
  "2026-03-23": ["Pakistan Day 🇵🇰"],
  "2026-08-14": ["Independence Day 🇵🇰"],
  "2026-09-06": ["Defence Day 🇵🇰"],
  "2026-11-09": ["Iqbal Day"],
  "2026-12-25": ["Quaid-e-Azam Day 🎂"],
};

const EventCalender = () => {
  const [value, setValue] = useState(dayjs());
  const [selectedValue, setSelectedValue] = useState(dayjs());
  const [events, setEvents] = useState(defaultEvents);

  const [eventText, setEventText] = useState("");
  const [eventDate, setEventDate] = useState(null);

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const dateCellRender = (current) => {
    const dateKey = current.format("YYYY-MM-DD");
    const dayEvents = events[dateKey] || [];

    return (
      <ul className="events">
        {dayEvents.map((event, index) => (
          <li key={index}>
            <Badge status="success" text={event} />
          </li>
        ))}
      </ul>
    );
  };

  const handleAddEvent = () => {
    if (!eventText || !eventDate) return;

    const key = eventDate.format("YYYY-MM-DD");

    setEvents(prev => ({
      ...prev,
      [key]: prev[key] ? [...prev[key], eventText] : [eventText],
    }));

    setEventText("");
    setEventDate(null);
  };
  return (
    <Card>
      <div className="flex justify-center md:justify-between flex-wrap">
        <h2 className="text-2xl font-semibold">Event Calendar</h2>
        <Space className="mb-4 flex flex-wrap justify-between items-center">
      <DatePicker
        value={eventDate}
        onChange={setEventDate}
        placeholder="Select date"
      />
      <Input
        value={eventText}
        onChange={e => setEventText(e.target.value)}
        placeholder="Enter event name"
      />
      <Button type="primary" onClick={handleAddEvent} className="!bg-[#39444b] !text-white">
      <PlusOutlined /> Add Event
      </Button>
    </Space>
      </div>
    <Alert
      className="mb-4"
      title={`Selected Date: ${selectedValue.format("YYYY-MM-DD")}`}
      type="info"
    />
   
    <Calendar
      value={value}
      onSelect={onSelect}
      cellRender={(current, info) =>
        info.type === "date" ? dateCellRender(current) : info.originNode
      }
      headerRender={({ value, onChange }) => {
        const current = value.clone();
    
        return (
          <div className="flex justify-between items-center mb-3 mt-3">
            <Button onClick={() => onChange(current.subtract(1, "month"))}>
              ◀
            </Button>
    
            <span className="font-semibold text-lg">
              {current.format("MMMM YYYY")}
            </span>
    
            <Button onClick={() => onChange(current.add(1, "month"))}>
              ▶
            </Button>
          </div>
        );
      }}
    />
  </Card>
  )
}

export default EventCalender