import { NavLink, Outlet } from "react-router-dom";
import "./dashboard.css";
import useRole from "../CustomHooks/useRole";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Drawer from "@material-ui/core/Drawer";
import VideoSettingsRoundedIcon from "@mui/icons-material/VideoSettingsRounded";
import AddToQueueRoundedIcon from "@mui/icons-material/AddToQueueRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import RequestPageRoundedIcon from "@mui/icons-material/RequestPageRounded";
import Typography from "@material-ui/core/Typography";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useState } from "react";
import { Logout } from "@mui/icons-material";
import useAuth from "../CustomHooks/useAuth";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#1957E0",
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#F2F2F2",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.black,
    padding: theme.spacing(3),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const { logOut } = useAuth();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const { role: userRole, isRoleLoading } = useRole();
  const role = userRole;
  const [open, setOpen] = useState(false);
  if (isRoleLoading) {
    return (
      <div className="flex h-[70vh] justify-center items-center">
        <div className="h-20 w-20 md:w-24 md:h-24 border-[6px] md:border-[8px] border-dashed rounded-full animate-spin border-primary-1"></div>
      </div>
    );
  }

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  return (
    <div className={`${classes.root} font-poppins`}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            className={classes.menuButton}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <div className="text-xl uppercase gap-2 flex items-center px-5 py-2 text-center font-semibold">
              <img
                className="w-10"
                src="https://i.ibb.co/cyns15p/images-removebg-preview-1.png"
                alt=""
              />
              <h1>Dashboard</h1>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={`${classes.drawer}`}
        variant={isMdUp ? "permanent" : "temporary"}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List className="space-y-3">
          {role === "admin" ? (
            <>
              <ListItem>
                <span className="dashboard-item ">
                  <NavLink
                    className="px-4 py-2 pb-[8px] text-xl uppercase w-full font-semibold "
                    to="/dashboard/teacher_requests"
                  >
                    <RequestPageRoundedIcon
                      style={{ paddingBottom: "4px" }}
                    ></RequestPageRoundedIcon>{" "}
                    Teacher Requests
                  </NavLink>
                </span>
              </ListItem>
              <ListItem>
                <span className="dashboard-item ">
                  <NavLink
                    className="px-4 py-2 pb-[8px] text-xl uppercase w-full font-semibold "
                    to="/dashboard/users"
                  >
                    <GroupsRoundedIcon
                      style={{ paddingBottom: "4px" }}
                    ></GroupsRoundedIcon>{" "}
                    Users
                  </NavLink>
                </span>
              </ListItem>
              <ListItem>
                <span className="dashboard-item ">
                  <NavLink
                    className="px-4 py-2 pb-[8px] text-xl w-full font-semibold "
                    to="/dashboard/all_classes"
                  >
                    <VideoSettingsRoundedIcon
                      style={{ paddingBottom: "4px" }}
                    ></VideoSettingsRoundedIcon>{" "}
                    ALL CLASSES
                  </NavLink>
                </span>
              </ListItem>
            </>
          ) : role === "teacher" ? (
            <>
              <ListItem>
                <span className="dashboard-item ">
                  <NavLink
                    className="px-4 py-2 text-xl uppercase w-full font-semibold "
                    to="/dashboard/add_class"
                  >
                    <AddToQueueRoundedIcon></AddToQueueRoundedIcon> Add Class
                  </NavLink>
                </span>
              </ListItem>
              <ListItem>
                <span className="dashboard-item ">
                  <NavLink
                    className="px-4 py-2  text-xl uppercase w-full font-semibold "
                    to="/dashboard/my_class"
                  >
                    <SchoolRoundedIcon></SchoolRoundedIcon> My Class
                  </NavLink>
                </span>
              </ListItem>
            </>
          ) : (
            <ListItem>
              <span className="dashboard-item ">
                <NavLink
                  className="px-4 py-2 pb-[8px] text-xl uppercase w-full font-semibold "
                  to="/dashboard/my_enroll_class"
                >
                  <OndemandVideoRoundedIcon
                    style={{ paddingBottom: "4px" }}
                  ></OndemandVideoRoundedIcon>{" "}
                  My Enroll Class
                </NavLink>
              </span>{" "}
            </ListItem>
          )}
          <ListItem>
            {" "}
            <span className="dashboard-item ">
              <NavLink
                className="px-4 py-2 pb-[8px]  rounded-none text-xl uppercase w-full font-semibold "
                to="/dashboard/profile"
              >
                <AccountCircleRoundedIcon
                  style={{ paddingBottom: "4px" }}
                ></AccountCircleRoundedIcon>{" "}
                My Profile
              </NavLink>
            </span>{" "}
          </ListItem>
        </List>

        <Divider />
        <List className="space-y-4">
          <ListItem className="mt-5">
            <span className=" ">
              <NavLink
                className="flex items-center gap-1  text-xl uppercase w-full font-semibold "
                to="/"
              >
                <HomeRoundedIcon></HomeRoundedIcon> Home
              </NavLink>
            </span>
          </ListItem>
          <ListItem onClick={handleLogout}>
            <span className="cursor-pointer flex items-center gap-1  text-xl uppercase w-full font-semibold ">
              <Logout></Logout> Logout
            </span>
          </ListItem>
        </List>
      </Drawer>
      <main
        className={`${classes.content} mt-12 md:mt-16 font-poppins overflow-x-auto`}
      >
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Dashboard;
