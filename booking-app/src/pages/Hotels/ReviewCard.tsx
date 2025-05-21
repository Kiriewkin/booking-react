import React from "react";
import { Card, Rate } from "antd";

import { Review } from "../../types/hotels";

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <Card style={{ margin: "0 8px" }}>
      <h4>{review.firstName} {review.lastName}</h4>
      <Rate disabled defaultValue={review.rating} />
      <p><i>{new Date(review.date).toLocaleDateString()}</i></p>
      <p>{review.comment}</p>
    </Card>
  );
};

export default ReviewCard;
