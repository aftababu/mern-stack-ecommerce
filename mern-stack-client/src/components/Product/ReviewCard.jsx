import { Rating } from "@mui/material";

const ReviewCard = ({ review }) => {
  const options = {
    size: "normal",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="reviewCard">
      <img src={`/images/Profile.png`} alt="user" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
