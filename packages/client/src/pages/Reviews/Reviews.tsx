import { Button, Icon, Row, Table, Typography } from "antd";
import { loader } from "graphql.macro";
import React from "react";

import Layout from "../../components/Layout";
import ReviewModal from "../../components/Reviews/ReviewModal";
import ReviewsContext from "../../contexts/Reviews";
import {
  CreateReviewMutation,
  ReviewsEmployeesQuery,
  ReviewsQuery,
} from "../../generated/graphql";
import useLocalStorage from "../../hooks/useLocalStorage";
import useManualQueryWithAuth from "../../hooks/useManualQueryWithAuth";
import useMutationWithAuth from "../../hooks/useMutationWithAuth";
import useNotification from "../../hooks/useNotification";
import useStateContext from "../../hooks/useStateContext";

type Review = ReviewsQuery["reviews"][number];

const fetchReviewsQuery = loader("./Reviews.graphql").loc!.source.body;
const fetchReviewsEmployeesQuery = loader("./ReviewsEmployees.graphql").loc!
  .source.body;
const createReviewMutation = loader("./CreateReview.graphql").loc!.source.body;
const updateReviewMutation = loader("./UpdateReview.graphql").loc!.source.body;

interface Props {
  id: number;
  type: "about" | "written-by";
}

const Reviews: React.FC<Props> = ({ id, type }) => {
  const [
    fetchReviewsEmployees,
    reviewsEmployeesFetched,
  ] = useManualQueryWithAuth<ReviewsEmployeesQuery>(fetchReviewsEmployeesQuery);
  const [fetchReviews, reviewsFetched] = useManualQueryWithAuth<ReviewsQuery>(
    fetchReviewsQuery,
    {
      variables: { id, kind: type === "about" ? "ABOUT" : "WRITTEN_BY" },
    },
  );
  const [createReview, reviewCreated] = useMutationWithAuth<
    CreateReviewMutation
  >(createReviewMutation);
  const [updateReview, reviewUpdated] = useMutationWithAuth<
    CreateReviewMutation
  >(updateReviewMutation);
  const notify = useNotification();
  const { dispatch, state } = useStateContext(ReviewsContext);
  const { storageValue: storageRoleValue } = useLocalStorage("role");

  // Init reviews and employees reviews fetch
  React.useEffect(() => {
    fetchReviews();

    if (storageRoleValue === "admin") {
      fetchReviewsEmployees();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, type]);

  // Init review fetch error
  React.useEffect(() => {
    if (reviewsFetched.error || reviewsEmployeesFetched.error) {
      notify("error", "An error occured");
    }
  }, [reviewsFetched.error, reviewsEmployeesFetched.error, notify]);

  // Init  employees fetch success
  React.useEffect(() => {
    if (!reviewsEmployeesFetched.data || reviewsEmployeesFetched.loading) {
      return;
    }

    dispatch({
      payload: reviewsEmployeesFetched.data.employees,
      type: "setEmployees",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewsEmployeesFetched.data, reviewsEmployeesFetched.loading]);

  // Handle the error and success on review creation
  React.useEffect(() => {
    if (reviewCreated.error) {
      return notify("error", "An error occured");
    }

    if (reviewCreated.data && !reviewCreated.loading) {
      notify("success", "Review created successfully");
      dispatch({ type: "closeReviewModal" });
      fetchReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewCreated.error, reviewCreated.loading, reviewCreated.data]);

  // Handle the error and success on review update
  React.useEffect(() => {
    if (reviewUpdated.error) {
      return notify("error", "An error occured");
    }

    if (reviewUpdated.data && !reviewUpdated.loading) {
      notify("success", "Review updated successfully");
      dispatch({ type: "closeReviewModal" });
      fetchReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewUpdated.error, reviewUpdated.loading, reviewUpdated.data]);

  const submitReview = React.useCallback(() => {
    if (!state.reviewModal) {
      return notify("error", "An error occured");
    }

    switch (state.reviewModal.mode) {
      case "create": {
        createReview({
          variables: {
            content: state.reviewModal.form.content,
            targetId: state.reviewModal.form.targetId,
          },
        });

        return;
      }

      case "edit": {
        if (!state.reviewModal.reviewId) {
          notify("error", "An error occured");

          return;
        }

        updateReview({
          variables: {
            content: state.reviewModal.form.content,
            id: state.reviewModal.reviewId,
          },
        });

        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.reviewModal]);

  return (
    <Layout>
      <ReviewModal onSubmit={submitReview} />
      <Row type="flex" justify="space-between">
        {/* TODO: Display more information in the title */}
        <Typography.Title>Reviews</Typography.Title>
        {storageRoleValue === "employee" ? null : (
          <Button
            onClick={() =>
              dispatch({ type: "openReviewModal", payload: { mode: "create" } })
            }
            type="primary"
            size="large"
          >
            Create Review
          </Button>
        )}
      </Row>
      <Table<Review>
        dataSource={
          reviewsFetched.data
            ? reviewsFetched.data.reviews.map(review => ({
                ...review,
                key: review.id.toString(),
              }))
            : []
        }
        loading={reviewsFetched.loading}
      >
        <Table.Column title="ID" dataIndex="id" key="id" />
        <Table.Column title="Content" dataIndex="content" key="content" />
        <Table.Column<Review>
          title="Written by"
          render={(_, review) =>
            `${review.writer.lastName} ${review.writer.firstName}`
          }
        />
        <Table.Column<Review>
          title="About"
          render={(_, review) =>
            `${review.target.lastName} ${review.target.firstName}`
          }
        />
        {storageRoleValue === "employee" ? null : (
          <Table.Column<Review>
            dataIndex="id"
            key="actions"
            render={(_, review) => (
              <Icon
                type="edit"
                onClick={() => {
                  dispatch({
                    payload: {
                      init: review,
                      mode: "edit",
                      reviewId: review.id,
                    },
                    type: "openReviewModal",
                  });
                }}
              />
            )}
          />
        )}
      </Table>
    </Layout>
  );
};

export default Reviews;
