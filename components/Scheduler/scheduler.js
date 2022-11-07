import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  AppointmentTooltip,
  Toolbar,
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';

export default function EventScheduler({
  input
}) {

  const Appointment = ({
    children, style, ...restProps
  }) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: '#FFC107',
        borderRadius: '8px',
        fontFamily: 'AppleSDGothicNeoM',
      }}
    >
      {children}
    </Appointments.Appointment>
  );
  
  return(
      <Paper>
        <Scheduler
          data={input}
          height={660}
        >
          <ViewState
            // TODO : Today 날짜 
            defaultCurrentDate="2022-11-07"
            defaultCurrentViewName="Week"
          />

          <DayView
            startDayHour={0}
            endDayHour={23}
            cellDuration={60}
          />
          <WeekView
            startDayHour={0}
            endDayHour={23}
            cellDuration={60}
          />

          <Toolbar />
          <ViewSwitcher />
          <Appointments>
            appointmentComponent={Appointment}
          </Appointments>
          <AppointmentTooltip
            showCloseButton
          />
        </Scheduler>
      </Paper>
    )
}
