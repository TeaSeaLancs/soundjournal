import Typography from "@material-ui/core/Typography";

export { TrackArea } from "../tracks";

export const h1 = (props) => <Typography variant="h1" gutterBottom {...props} />;
export const h2 = (props) => <Typography variant="h2" gutterBottom {...props} />;
export const h3 = (props) => <Typography variant="h3" gutterBottom {...props} />;
export const h4 = (props) => <Typography variant="h4" gutterBottom paragraph {...props} />;
export const h5 = (props) => <Typography variant="h5" gutterBottom {...props} />;
export const h6 = (props) => <Typography variant="h6" gutterBottom {...props} />;

export const p = (props) => <Typography variant="body1" paragraph {...props} />;
