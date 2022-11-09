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
import { getTodayDateShort } from '@utils/functions';

export default function EventScheduler({ input }) {
  const Appointment = ({ children, style, ...restProps }) => (
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

  return (
    <Paper>
      <Scheduler data={input} height={520}>
        <ViewState
          defaultCurrentDate={getTodayDateShort()}
          defaultCurrentViewName="Week"
        />

        <DayView startDayHour={0} endDayHour={23} cellDuration={60} />
        <WeekView startDayHour={0} endDayHour={23} cellDuration={60} />

        <Toolbar />
        <ViewSwitcher />
        <Appointments>appointmentComponent={Appointment}</Appointments>
        <AppointmentTooltip showCloseButton />
      </Scheduler>
    </Paper>
  );
}
