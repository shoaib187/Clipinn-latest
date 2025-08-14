import AttendanceHistory from '../../app/screens/attendance/attendanceHistory/attendanceHistory';
import AttendanceHomePage from '../../app/screens/attendance/attendanceHomePage/attendanceHomePage';
import MarkByLocation from '../../app/screens/attendance/markByLocation/markByLocation';
import MarkWithQrCode from '../../app/screens/attendance/markWithQrCode/markWithQrCode';
import Home from '../../app/screens/home/homeMainPage/home';
import TaskDetails from '../../app/screens/tasks/taskDetails/taskDetails';
import TaskHomePage from '../../app/screens/tasks/taskHomePage/taskHomePage';

export const screens = {
  // Home screens
  Home,
  // Attendance stack
  AttendanceHomePage,
  AttendanceHistory,
  MarkWithQrCode,
  MarkByLocation,

  // task screens
  TaskHomePage,
  TaskDetails,
};
