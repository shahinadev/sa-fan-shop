import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import PaymentIcon from "@mui/icons-material/Payment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import useAuth from "./../../hooks/useAuth";
import DashboardHome from "./DashboardHome/DashboardHome";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import MakeAdmin from "./MakeAdmin/MakeAdmin";
import AddProduct from "./AddProduct/AddProduct";
import AdminRoute from "./AdminRoute/AdminRoute";
import ManageOrders from "./ManageOrders/ManageOrders";
import Pay from "./../pages/Pay/Pay";
import MyReviews from "./MyReviews/MyReviews";
import ManageProducts from "./ManageProducts/ManageProducts";
import Review from "./../pages/Review/Review";

const drawerWidth = 200;
const Dashboard = (props) => {
  const { path, url } = useRouteMatch();
  const { user, logOut, isAdmin } = useAuth();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="container-fluid p-0">
      <Toolbar />
      <Divider />
      <List>
        <Link to="/">
          <ListItem button>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Back to Home" />
          </ListItem>
        </Link>
        <Link to={`${url}`}>
          <ListItem button>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        {isAdmin ? (
          <>
            <Link to={`${url}/manageOrders`}>
              <ListItem button>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Manage All Orders" />
              </ListItem>
            </Link>
            <Link to={`${url}/manageProducts`}>
              <ListItem button>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Manage All Products" />
              </ListItem>
            </Link>
            <Link to={`${url}/addProduct`}>
              <ListItem button>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Product" />
              </ListItem>
            </Link>
            <Link to={`${url}/makeAdmin`}>
              <ListItem button>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Make Admin" />
              </ListItem>
            </Link>
          </>
        ) : (
          <>
            <Link to={`${url}/myOrders`}>
              <ListItem button>
                <ListItemIcon>
                  <AddShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="My Orders" />
              </ListItem>
            </Link>
            <Link to={`${url}/myReviews`}>
              <ListItem button>
                <ListItemIcon>
                  <ReviewsIcon />
                </ListItemIcon>
                <ListItemText primary="My Reviews" />
              </ListItem>
            </Link>
            <Link to={`${url}/review`}>
              <ListItem button>
                <ListItemIcon>
                  <ReviewsIcon />
                </ListItemIcon>
                <ListItemText primary="Review" />
              </ListItem>
            </Link>
            <Link to={`${url}/pay`}>
              <ListItem button>
                <ListItemIcon>
                  <PaymentIcon />
                </ListItemIcon>
                <ListItemText primary="Pay" />
              </ListItem>
            </Link>
          </>
        )}
        <Divider />
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            SA Fan Shop Dashboard
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ marginRight: 3 }}>
              {user.displayName}
            </Typography>
            <button className="btn btn-danger" onClick={logOut}>
              <ExitToAppIcon />
            </button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        className="container"
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Switch>
          <Route exact path={path}>
            <DashboardHome />
          </Route>
          <AdminRoute path={`${path}/makeAdmin`}>
            <MakeAdmin />
          </AdminRoute>
          <AdminRoute path={`${path}/addProduct`}>
            <AddProduct />
          </AdminRoute>
          <AdminRoute path={`${path}/manageOrders`}>
            <ManageOrders />
          </AdminRoute>
          <AdminRoute path={`${path}/manageProducts`}>
            <ManageProducts />
          </AdminRoute>
          <Route path={`${path}/myOrders`}>
            <DashboardHome />
          </Route>
          <Route path={`${path}/pay`}>
            <Pay />
          </Route>
          <Route path={`${path}/myReviews`}>
            <MyReviews />
          </Route>
          <Route path={`${path}/review`}>
            <Review />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
};

export default Dashboard;
