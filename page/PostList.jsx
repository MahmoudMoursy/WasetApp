import React from "react";
import { Card, CardContent, Typography, Avatar, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PostList = ({ posts }) => {
  const navigate = useNavigate();

  return (
    <>
      {posts.map((post) => (
        <Card
          key={post.id}
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            mb: 2,
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": { boxShadow: 6 },
          }}
          onClick={() => navigate(`/post/${post.id}`, { state: { post } })}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="bold">{post.text}</Typography>
            <Box display="flex" alignItems="center" mt={2}>
              <Avatar src={post.userImage} />
              <Typography variant="body2" sx={{ ml: 2, color: "gray" }}>{post.user}</Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default PostList;
