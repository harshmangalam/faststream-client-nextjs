import  Typography  from '@mui/material/Typography';
import  Link  from '../Link';



export default function Copyright() {
    return (
        function Copyright(props) {
            return (
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                {...props}
              >
                {"Copyright © "}
                <Link color="inherit" href="/">
                  FastStream
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
              </Typography>
            );
          }
    )
}
