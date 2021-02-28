import { lazy, Suspense, useState } from "react";
import { PrivateRoute, PublicRoute } from "./hooks";
import { Login, Register, Bookmarked, Contact, Home } from "./pages";
import { Preloader } from "./components";
import { AnimatePresence } from "framer-motion";
import { Switch, useLocation } from "react-router-dom";

const Blog = lazy(() => import("./pages/Blog/Blog"));
const ConfirmBlog = lazy(() => import("./pages/ConfirmBlog/ConfirmBlog"));
const Promote = lazy(() => import("./pages/Promote/Promote"));
const AddBlog = lazy(() => import("./pages/AddBlog/AddBlog"));
const EditorDashboard = lazy(() =>
  import("./pages/EditorDashboard/EditorDashboard")
);
const AdminDashboard = lazy(() =>
  import("./pages/AdminDashboard/AdminDashboard")
);

const Router = () => {
  let location = useLocation();
  const [random] = useState(Math.floor(Math.random() * 8));

  return (
    <Suspense fallback={<Preloader />}>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          {/* PublicRoutes */}
          <PublicRoute key="route 0" path="/" exact component={Home} />
          <PublicRoute
            key="route 1"
            path="/contact"
            exact
            component={Contact}
          />
          <PublicRoute key="route 2" path="/blog/:id" component={Blog} />
          <PublicRoute
            key="route 3"
            path="/category/:category"
            exact
            component={Home}
          />

          {/* RestrictedRoutes */}
          <PublicRoute
            key="route 4"
            path="/register"
            restricted
            component={Register}
          />
          <PublicRoute
            key="route 5"
            path="/login"
            restricted
            component={Login}
          />

          {/* PrivateRoutes */}
          <PrivateRoute
            key="route 6"
            path="/bookmarked"
            roles={["reader", "editor", "admin", "super-admin"]}
            component={Bookmarked}
          />
          <PrivateRoute
            key="route 7"
            path="/editor"
            exact
            roles={["editor", "admin", "super-admin"]}
            component={EditorDashboard}
            random={random}
          />
          <PrivateRoute
            key="route 8"
            path="/editor/add"
            roles={["editor", "admin", "super-admin"]}
            component={AddBlog}
          />
          <PrivateRoute
            key="route 9"
            path="/editor/:id"
            roles={["editor", "admin", "super-admin"]}
            component={Blog}
          />
          <PrivateRoute
            key="route 10"
            path="/admin"
            exact
            roles={["admin", "super-admin"]}
            component={AdminDashboard}
          />
          <PrivateRoute
            key="route 11"
            path="/admin/promote"
            roles={["super-admin"]}
            component={Promote}
          />
          <PrivateRoute
            key="route 12"
            path="/admin/:id"
            roles={["admin", "super-admin"]}
            component={ConfirmBlog}
          />
        </Switch>
      </AnimatePresence>
    </Suspense>
  );
};

export default Router;
