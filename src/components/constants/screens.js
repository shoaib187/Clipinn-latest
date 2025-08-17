import AttendanceHistory from '../../app/screens/attendance/attendanceHistory/attendanceHistory';
import AttendanceHomePage from '../../app/screens/attendance/attendanceHomePage/attendanceHomePage';
import MarkByLocation from '../../app/screens/attendance/markByLocation/markByLocation';
import MarkWithQrCode from '../../app/screens/attendance/markWithQrCode/markWithQrCode';
import ChatHomePage from '../../app/screens/chats/chatHomePage/chatHomePage';
import ChatInbox from '../../app/screens/chats/chatInbox/chatInbox';
import NewChat from '../../app/screens/chats/newChat/newChat';
import Home from '../../app/screens/home/homeMainPage/home';
import CreateProject from '../../app/screens/projects/createProject/createProject';
import ProjectDetails from '../../app/screens/projects/projectDetails/projectDetails';
import ProjectHomePage from '../../app/screens/projects/projectHomePage/projectHomePage';

export const screens = {
  // Home screens
  Home,
  // Attendance stack
  AttendanceHomePage,
  AttendanceHistory,
  MarkWithQrCode,
  MarkByLocation,

  // task screens
  ProjectHomePage,
  ProjectDetails,
  CreateProject,
  // Chat screens
  ChatHomePage,
  ChatInbox,
  NewChat,
};
