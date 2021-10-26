import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function VideoDetail({ video }) {
  return (
    <Card sx={{ borderRadius: 0 }}>
      <CardMedia
        component="video"
        src={`${process.env.NEXT_PUBLIC_BASEURL}/videos/${video.id}/stream`}
        controls
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {video.title}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 14 }}>
          {video.views} views {bull} {video.created_at}
        </Typography>

       

        <CardHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          title={video.user.name}
          
        />
        <Typography variant="body2">
          {video.description}
        </Typography>
       
        
      </CardContent>
    </Card>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const res = await axios.get(`/videos/${params.videoId}`);

    return {
      props: {
        video: res.data,
      },
    };
  } catch (error) {}
}
