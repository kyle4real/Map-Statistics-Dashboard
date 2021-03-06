import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

const Title = (props) => {
    return (
        <Typography component="h2" variant="h6" color="primary">
            {props.children}
        </Typography>
    );
};

Title.propTypes = {
    children: PropTypes.node,
};

export default Title;
