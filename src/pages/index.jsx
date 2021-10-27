import axios from "axios";
import Box from "@mui/material/Box";
import VideoCard from "../components/Video/VideoCard";


import Grid from "@mui/material/Grid";
export default function Index({ videos }) {
  return (
    <Box sx={{px:{xs:0,sm:1,md:2},py:2}}>
      <Grid container spacing={2}>
        {videos.map((video) => (
          <Grid key={video.id} item xs={12} sm={6} md={4}>
            <VideoCard video={video} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export async function getServerSideProps() {
  try {
    const res = await axios.get("/videos");
    return {
      props: {
        videos: res.data,
      },
    };
  } catch (error) {
    return {
      notFound:true
    }
  }
}
