/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import ClassProgress from "./ClassProgress";
import AddAssignment from "./AddAssignment";

const MyClassDetails = () => {
  const { id } = useParams();
  const [value, setValue] = useState(0);

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        className="font-poppins"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="CLASS PROGRESS" {...a11yProps(0)} />
            <Tab label="ADD ASSIGNMENT" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ClassProgress></ClassProgress>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AddAssignment></AddAssignment>
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default MyClassDetails;
