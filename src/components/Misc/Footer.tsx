import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default function Footer(): JSX.Element {
  return (
    <Typography
      className="footer"
      variant="body2"
      color="textSecondary"
      align="center"
    >
      made by&nbsp;
      <Link color="primary" href="https://allistergrange.com">
        Allister Grange
      </Link>
    </Typography>
  );
}
