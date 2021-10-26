import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Link from "next/link";
import HomeOutlineIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlineIcon from "@mui/icons-material/ExploreOutlined";
export default function SidebarMenu() {
  return (
    <List>
      {generalItems.map((item) => (
        <Link key={item.name} href={item.href} passHref>
          <ListItem button>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
}

const generalItems = [
  { name: "Home", href: "/", icon: <HomeOutlineIcon /> },
  { name: "Explore", href: "/", icon: <ExploreOutlineIcon /> },
];
