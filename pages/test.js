import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Toolbar,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

export default function SchedulerContainer() {
  const SCHEDULER_STATE_CHANGE_ACTION = 'SCHEDULER_STATE_CHANGE';

  const createSchedulerAction = (partialStateName, partialStateValue) => ({
    type: SCHEDULER_STATE_CHANGE_ACTION,
    payload: {
      partialStateName,
      partialStateValue,
    },
  });

  const mapDispatchToProps = (dispatch) => ({
    onCurrentDateChange: (currentDate) =>
      dispatch(createSchedulerAction('currentDate', currentDate)),
  });

  const currentDate = '2022-10-27';
  const schedulerData = [
    {
      id: 1,
      startDate: '2022-10-27T23:00',
      endDate: '2022-10-27T23:50',
      title: 'Event 1',
    },
    {
      id: 2,
      startDate: '2022-10-27T22:00',
      endDate: '2022-10-27T22:50',
      title: 'Event 2',
    },
  ];
  return (
    <Paper>
      <Scheduler data={schedulerData}>
        <ViewState currentDate={currentDate} />
        <Toolbar />

        <DayView startDayHour={0} endDayHour={24} />
      </Scheduler>
    </Paper>
  );
}
