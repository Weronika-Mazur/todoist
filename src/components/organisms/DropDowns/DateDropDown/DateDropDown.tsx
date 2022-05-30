import disableScroll from "disable-scroll";
import { useEffect } from "react";

import "./dark.css";
import * as S from "./styles";

interface DateDropDownProps {
  selectedDate?: Date;
  setDate: (newDate?: Date) => void;
}

const DateDropDown = ({ selectedDate, setDate }: DateDropDownProps) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const getDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
    });

  const handleSetDate = ([newDate]: Date[]) => {
    setDate(newDate);
  };

  const handleToday = () => {
    setDate(new Date());
  };

  const handleTomorrow = () => {
    setDate(tomorrow);
  };

  const handleNone = () => {
    setDate();
  };

  useEffect(() => {
    disableScroll.on();
    return () => {
      disableScroll.off();
    };
  }, []);

  return (
    <>
      <S.ListItem onClick={handleNone}>
        <div className="flex">
          <S.TaskNoneIcon />
          <S.ListItemText> No date </S.ListItemText>
        </div>
      </S.ListItem>
      <S.ListItem onClick={handleToday}>
        <div className="flex">
          <S.TaskTodayIcon />
          <S.ListItemText> Today </S.ListItemText>
        </div>
        <S.ListItemDate>{getDate(new Date())}</S.ListItemDate>
      </S.ListItem>
      <S.ListItem onClick={handleTomorrow}>
        <div className="flex">
          <S.TaskTomorrowIcon />
          <S.ListItemText>Tomorrow</S.ListItemText>
        </div>
        <S.ListItemDate>{getDate(tomorrow)}</S.ListItemDate>
      </S.ListItem>
      <S.ListCalendar>
        <S.Calendar
          value={selectedDate}
          onChange={handleSetDate}
          options={{
            inline: true,
            monthSelectorType: "static",
          }}
        />
      </S.ListCalendar>
    </>
  );
};

export default DateDropDown;
