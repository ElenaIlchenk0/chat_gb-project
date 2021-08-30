import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({
  component: Component,
  authenticated,
  render,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (render && authenticated) {
          return render();
        }
        if (authenticated) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }}
    />
  );
}
