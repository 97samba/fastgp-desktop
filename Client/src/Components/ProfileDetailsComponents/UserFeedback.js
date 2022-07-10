import { Avatar, Link, Skeleton, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import COLORS from "../../colors";

export const UserFeedbackSkeleton = () => {
  return (
    <Stack>
      <Skeleton />
    </Stack>
  );
};

const UserFeedback = ({ data }) => {
  let stars = [];
  function getStars() {
    let mark = data.mark;
    for (let i = 0; i < 5; i++) {
      if (mark - i >= 1) {
        stars.push(<IoIosStar color="goldenrod" size={18} />);
      } else {
        if (mark - i > 0) {
          stars.push(<IoIosStarHalf color="goldenrod" size={18} />);
        } else {
          stars.push(<IoIosStarOutline color="goldenrod" size={18} />);
        }
      }
    }
    return (
      <Stack direction="row" my={0.2}>
        {stars.map((star) => star)}
      </Stack>
    );
  }
  return (
    <Stack direction="row" flex={1} color={COLORS.black} spacing={2}>
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Avatar src={data?.photoURL} sx={{ width: 50, height: 50 }}>
          SN
        </Avatar>
      </div>
      <Stack flex={6}>
        <Stack direction="row" justifyContent="space-between">
          <Link underline="hover" href={"/profilDetails/" + data.owner + "/myProfile"}>
            <Typography>{data.clientFirstName}</Typography>
          </Link>
          <Typography variant="body2">{moment(data.createdAt).fromNow()}</Typography>
        </Stack>
        {getStars()}
        <Typography>{data?.feedback}</Typography>
      </Stack>
    </Stack>
  );
};

export default UserFeedback;
