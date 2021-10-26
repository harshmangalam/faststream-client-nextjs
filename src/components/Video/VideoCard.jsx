import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

import Link from "next/link"

export default function VideoCard({ video }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="194"
        image="https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h6">{video.title}</Typography>
        <Typography
          variant="caption"
          gutterBottom
          sx={{ color: "text.secondary" }}
        ></Typography>
        <Chip label={`views ${video.views}`} />
      </CardContent>
      <CardActions>
          <Link href={`/videos/${video.id}`} passHref>
          <Button variant="contained" color="primary" fullWidth>
            Watch
          </Button>
          </Link>
      </CardActions>
    </Card>
  );
}
