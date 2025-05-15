import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';

export const navigationMenu = [
  {
    title: "Home",
    icon: HomeOutlinedIcon,
    path: "/home",
  },
  {
    title: "Explore",
    icon: SearchOutlinedIcon,
    path: "/explore",
  },
  {
    title: "Notifications",
    icon: NotificationsOutlinedIcon,
    path: "/notifications",
  },
  {
    title: "Messages",
    icon: EmailOutlinedIcon,
    path: "/messages",
  },
  {
    title: "Lists",
    icon: ListAltIcon,
    path: "/lists",
  },
  {
    title: "Communities",
    icon: PeopleOutlinedIcon,
    path: "/communities",
  },
  {
    title: "Verified",
    icon: FlashOnOutlinedIcon,
    path: "/verified",
  },
  {
    title: "Profile",
    icon: Person2OutlinedIcon,
    path: "/profile",
  },
  {
    title: "More",
    icon: PendingOutlinedIcon,
    path: "/pending",
  },
];
